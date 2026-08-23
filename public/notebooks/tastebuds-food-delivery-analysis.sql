-- =============================================================================
-- TasteBuds — Food Delivery Analytics (PostgreSQL)
--
-- Twenty business questions answered against a four-table food-delivery schema:
-- couriers, customers, restaurants, and orders (420 orders, Jan–Jun 2025).
--
-- Every query here has a 1:1 pandas counterpart in
-- `tastebuds-food-delivery-analysis.ipynb`; the notebook re-runs these same
-- statements through DuckDB and asserts both engines return identical values.
--
-- Conventions used throughout
--   * "Revenue" / GMV always means delivered orders only (status = 'delivered').
--     Cancelled orders carry an order_total but never became money.
--   * "City" always means the CUSTOMER's city — the demand side. Courier city
--     and restaurant city are different columns and give different splits.
--   * Ratings and delivery_minutes are NULL for every cancelled order, so
--     averages are taken over delivered rows only.
-- =============================================================================


-- =============================================================================
-- Schema
-- =============================================================================

DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS couriers;

CREATE TABLE couriers (
    courier_id  INTEGER PRIMARY KEY,
    name        VARCHAR(50) NOT NULL,
    city        VARCHAR(30) NOT NULL,
    vehicle     VARCHAR(20) NOT NULL
);

CREATE TABLE customers (
    customer_id INTEGER PRIMARY KEY,
    name        VARCHAR(50) NOT NULL,
    city        VARCHAR(30) NOT NULL,
    signup_date DATE        NOT NULL
);

CREATE TABLE restaurants (
    restaurant_id INTEGER PRIMARY KEY,
    name          VARCHAR(50) NOT NULL,
    cuisine       VARCHAR(30) NOT NULL,
    city          VARCHAR(30) NOT NULL,
    rating        NUMERIC(2,1)
);

CREATE TABLE orders (
    order_id         INTEGER PRIMARY KEY,
    customer_id      INTEGER       NOT NULL REFERENCES customers (customer_id),
    restaurant_id    INTEGER       NOT NULL REFERENCES restaurants (restaurant_id),
    courier_id       INTEGER       NOT NULL REFERENCES couriers (courier_id),
    order_date       DATE          NOT NULL,
    order_total      NUMERIC(10,2) NOT NULL,
    status           VARCHAR(15)   NOT NULL,   -- 'delivered' | 'cancelled'
    delivery_minutes NUMERIC(5,1),             -- NULL for cancelled orders
    rating           NUMERIC(2,1)              -- NULL for cancelled orders
);

-- Load (in psql use \copy so the paths resolve on the client side)
-- \copy couriers    FROM 'couriers.csv'    WITH (FORMAT csv, HEADER true);
-- \copy customers   FROM 'customers.csv'   WITH (FORMAT csv, HEADER true);
-- \copy restaurants FROM 'restaurants.csv' WITH (FORMAT csv, HEADER true);
-- \copy orders      FROM 'orders.csv'      WITH (FORMAT csv, HEADER true);


-- =============================================================================
-- 1 — Revenue & order health
-- =============================================================================

-- Q1 — Total revenue (GMV) from delivered orders.
SELECT ROUND(SUM(order_total), 2) AS gmv
FROM orders
WHERE status = 'delivered';


-- Q2 — How many orders in total, and how many were delivered?
-- FILTER keeps all three counts in a single pass over the table.
SELECT COUNT(*)                                     AS total_orders,
       COUNT(*) FILTER (WHERE status = 'delivered') AS delivered_orders,
       COUNT(*) FILTER (WHERE status = 'cancelled') AS cancelled_orders
FROM orders;


-- Q3 — Average order value (AOV) of delivered orders.
SELECT ROUND(AVG(order_total), 2) AS aov
FROM orders
WHERE status = 'delivered';


-- Q4 — Delivered revenue by restaurant cuisine, highest first.
SELECT r.cuisine,
       COUNT(*)                     AS orders,
       ROUND(SUM(o.order_total), 2) AS revenue,
       ROUND(AVG(o.order_total), 2) AS avg_order_value
FROM orders o
JOIN restaurants r USING (restaurant_id)
WHERE o.status = 'delivered'
GROUP BY r.cuisine
ORDER BY revenue DESC;


-- Q5 — Which five restaurants generated the most delivered revenue?
-- Grouped by the key, not the name, so two restaurants sharing a name never merge.
SELECT r.name,
       r.cuisine,
       COUNT(*)                     AS orders,
       ROUND(SUM(o.order_total), 2) AS revenue
FROM orders o
JOIN restaurants r USING (restaurant_id)
WHERE o.status = 'delivered'
GROUP BY r.restaurant_id, r.name, r.cuisine
ORDER BY revenue DESC
LIMIT 5;


-- Q6 — What share of all orders were cancelled?
-- Cancellation is a count-based rate: 1 in N orders never completes.
SELECT COUNT(*) FILTER (WHERE status = 'cancelled') AS cancelled_orders,
       COUNT(*)                                     AS total_orders,
       ROUND(100.0 * COUNT(*) FILTER (WHERE status = 'cancelled')
             / COUNT(*), 2)                         AS cancelled_pct
FROM orders;


-- Q7 — Each city's delivered revenue as a share of the total.
-- SUM(SUM(...)) OVER () is the grand total alongside each group — no self-join needed.
SELECT c.city,
       COUNT(*)                     AS orders,
       ROUND(SUM(o.order_total), 2) AS revenue,
       ROUND(100.0 * SUM(o.order_total)
             / SUM(SUM(o.order_total)) OVER (), 1) AS pct_of_revenue
FROM orders o
JOIN customers c USING (customer_id)
WHERE o.status = 'delivered'
GROUP BY c.city
ORDER BY revenue DESC;


-- =============================================================================
-- 2 — Customer base & retention
-- =============================================================================

-- Q8 — Active customers (>= 1 delivered order) and revenue per active customer.
SELECT COUNT(DISTINCT customer_id)                              AS active_customers,
       ROUND(SUM(order_total), 2)                               AS revenue,
       ROUND(SUM(order_total) / COUNT(DISTINCT customer_id), 2) AS arpu
FROM orders
WHERE status = 'delivered';


-- Q9 — What share of active customers placed more than one delivered order?
WITH per_customer AS (
    SELECT customer_id, COUNT(*) AS delivered_orders
    FROM orders
    WHERE status = 'delivered'
    GROUP BY customer_id
)
SELECT COUNT(*)                                    AS active_customers,
       COUNT(*) FILTER (WHERE delivered_orders > 1) AS repeat_customers,
       ROUND(100.0 * COUNT(*) FILTER (WHERE delivered_orders > 1)
             / COUNT(*), 1)                        AS repeat_pct
FROM per_customer;


-- Q10 — How many registered customers have never had an order delivered?
SELECT COUNT(*) AS never_ordered
FROM customers c
WHERE NOT EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.customer_id = c.customer_id
      AND o.status = 'delivered'
);


-- =============================================================================
-- 3 — Time series & window functions
-- =============================================================================

-- Q11 — Delivered revenue per month, with the month-over-month change.
WITH monthly AS (
    SELECT DATE_TRUNC('month', order_date) AS month,
           SUM(order_total)                AS revenue
    FROM orders
    WHERE status = 'delivered'
    GROUP BY 1
)
SELECT month,
       ROUND(revenue, 2)                                      AS revenue,
       ROUND(LAG(revenue) OVER (ORDER BY month), 2)           AS prev_month,
       ROUND(revenue - LAG(revenue) OVER (ORDER BY month), 2) AS mom_change,
       ROUND(100.0 * (revenue - LAG(revenue) OVER (ORDER BY month))
             / LAG(revenue) OVER (ORDER BY month), 2)         AS mom_pct
FROM monthly
ORDER BY month;


-- Q12 — Cumulative (running-total) delivered revenue by month.
WITH monthly AS (
    SELECT DATE_TRUNC('month', order_date) AS month,
           SUM(order_total)                AS revenue
    FROM orders
    WHERE status = 'delivered'
    GROUP BY 1
)
SELECT month,
       ROUND(revenue, 2) AS revenue,
       ROUND(SUM(revenue) OVER (ORDER BY month
                                ROWS BETWEEN UNBOUNDED PRECEDING
                                         AND CURRENT ROW), 2) AS cumulative_revenue
FROM monthly
ORDER BY month;


-- =============================================================================
-- 4 — Service quality
-- =============================================================================

-- Q13 — Average delivery time (minutes) by city, delivered orders only.
SELECT c.city,
       COUNT(*)                          AS deliveries,
       ROUND(AVG(o.delivery_minutes), 2) AS avg_delivery_minutes,
       MAX(o.delivery_minutes)           AS slowest_delivery
FROM orders o
JOIN customers c USING (customer_id)
WHERE o.status = 'delivered'
GROUP BY c.city
ORDER BY avg_delivery_minutes;


-- Q14 — Average customer rating by cuisine (rated orders only).
-- This is the rating customers left on ORDERS, not the restaurant's own listed rating.
SELECT r.cuisine,
       COUNT(o.rating)         AS rated_orders,
       ROUND(AVG(o.rating), 2) AS avg_rating
FROM orders o
JOIN restaurants r USING (restaurant_id)
WHERE o.status = 'delivered'
  AND o.rating IS NOT NULL
GROUP BY r.cuisine
ORDER BY avg_rating DESC;


-- =============================================================================
-- 5 — Ranking & per-group comparisons
-- =============================================================================

-- Q15 — Which five customers spent the most on delivered orders?
-- Grouping by customer_id: 120 customers share only 103 distinct names, so
-- grouping by name alone silently merges different people into one row.
SELECT c.customer_id,
       c.name,
       c.city,
       COUNT(*)                     AS delivered_orders,
       ROUND(SUM(o.order_total), 2) AS spend
FROM orders o
JOIN customers c USING (customer_id)
WHERE o.status = 'delivered'
GROUP BY c.customer_id, c.name, c.city
ORDER BY spend DESC
LIMIT 5;


-- Q16 — Rank cities by delivered revenue (1 = highest), handling ties.
WITH city_revenue AS (
    SELECT c.city, SUM(o.order_total) AS revenue
    FROM orders o
    JOIN customers c USING (customer_id)
    WHERE o.status = 'delivered'
    GROUP BY c.city
)
SELECT RANK()       OVER (ORDER BY revenue DESC) AS revenue_rank,
       DENSE_RANK() OVER (ORDER BY revenue DESC) AS dense_rank,
       city,
       ROUND(revenue, 2) AS revenue
FROM city_revenue
ORDER BY revenue_rank;


-- Q17 — How many delivered orders are larger than that customer's own average?
-- PARTITION BY keeps every row while attaching its customer's AOV to it.
WITH flagged AS (
    SELECT order_id,
           customer_id,
           order_total,
           AVG(order_total) OVER (PARTITION BY customer_id) AS customer_aov
    FROM orders
    WHERE status = 'delivered'
)
SELECT COUNT(*) FILTER (WHERE order_total > customer_aov) AS above_own_aov,
       COUNT(*)                                           AS delivered_orders,
       ROUND(100.0 * COUNT(*) FILTER (WHERE order_total > customer_aov)
             / COUNT(*), 1)                               AS pct_above
FROM flagged;


-- Q18 — How many customers signed up in each month (cohort sizes)?
SELECT DATE_TRUNC('month', signup_date) AS signup_month,
       COUNT(*)                         AS customers
FROM customers
GROUP BY 1
ORDER BY signup_month;


-- Q19 — Deliveries and average rating per courier; who are the busiest?
SELECT co.name,
       co.city,
       co.vehicle,
       COUNT(*)                AS deliveries,
       ROUND(AVG(o.rating), 2) AS avg_rating
FROM orders o
JOIN couriers co USING (courier_id)
WHERE o.status = 'delivered'
GROUP BY co.courier_id, co.name, co.city, co.vehicle
ORDER BY deliveries DESC;


-- =============================================================================
-- 6 — Data-quality checks
-- =============================================================================

-- Q20 — Surface logically inconsistent rows. Every check should return 0.
SELECT 'cancelled order still has a delivery time or rating' AS issue,
       COUNT(*)                                              AS bad_rows
FROM orders
WHERE status = 'cancelled'
  AND (delivery_minutes IS NOT NULL OR rating IS NOT NULL)

UNION ALL
SELECT 'delivered order missing a rating', COUNT(*)
FROM orders
WHERE status = 'delivered' AND rating IS NULL

UNION ALL
SELECT 'delivered order missing a delivery time', COUNT(*)
FROM orders
WHERE status = 'delivered' AND delivery_minutes IS NULL

UNION ALL
SELECT 'order_total is not positive', COUNT(*)
FROM orders
WHERE order_total <= 0

UNION ALL
SELECT 'rating outside the 1-5 scale', COUNT(*)
FROM orders
WHERE rating IS NOT NULL AND (rating < 1 OR rating > 5)

UNION ALL
SELECT 'status outside the known vocabulary', COUNT(*)
FROM orders
WHERE status NOT IN ('delivered', 'cancelled')

UNION ALL
SELECT 'duplicate order_id', COUNT(*)
FROM (SELECT order_id FROM orders GROUP BY order_id HAVING COUNT(*) > 1) d

UNION ALL
SELECT 'order references a customer that does not exist', COUNT(*)
FROM orders o
WHERE NOT EXISTS (SELECT 1 FROM customers c WHERE c.customer_id = o.customer_id)

UNION ALL
SELECT 'order references a restaurant that does not exist', COUNT(*)
FROM orders o
WHERE NOT EXISTS (SELECT 1 FROM restaurants r WHERE r.restaurant_id = o.restaurant_id)

UNION ALL
SELECT 'order references a courier that does not exist', COUNT(*)
FROM orders o
WHERE NOT EXISTS (SELECT 1 FROM couriers co WHERE co.courier_id = o.courier_id)

ORDER BY bad_rows DESC, issue;
