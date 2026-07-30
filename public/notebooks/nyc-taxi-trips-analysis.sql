-- ============================================================================
-- NYC Yellow Taxi Trip Analysis — SQL (PostgreSQL)
-- Source: NYC TLC Yellow Taxi trip records, January 2015 (sampled).
--
-- Each question below mirrors the matching cell in nyc-taxi-trips-analysis.ipynb.
-- Every result was reconciled 1:1 with the pandas notebook on the same data.
-- ============================================================================

CREATE TABLE trips (
    VendorID              SMALLINT,
    tpep_pickup_datetime  TIMESTAMP,
    tpep_dropoff_datetime TIMESTAMP,
    passenger_count       SMALLINT,
    trip_distance         NUMERIC(8,2),
    pickup_longitude      DOUBLE PRECISION,
    pickup_latitude       DOUBLE PRECISION,
    RateCodeID            SMALLINT,
    store_and_fwd_flag    CHAR(1),
    dropoff_longitude     DOUBLE PRECISION,
    dropoff_latitude      DOUBLE PRECISION,
    payment_type          SMALLINT,
    fare_amount           NUMERIC(8,2),
    extra                 NUMERIC(8,2),
    mta_tax               NUMERIC(8,2),
    tip_amount            NUMERIC(8,2),
    tolls_amount          NUMERIC(8,2),
    improvement_surcharge NUMERIC(8,2),
    total_amount          NUMERIC(8,2)
);


-- ============================================================================
-- 1 · FILTERING & SORTING
-- ============================================================================

-- Q1 — Trips with more than one passenger, over 1.5 miles, costing more than $4.
SELECT count(*) AS trip_count
FROM trips
WHERE passenger_count > 1
  AND trip_distance   > 1.5
  AND total_amount    > 4;

-- Q2 — Total number of trips.
SELECT count(VendorID) AS trip_count
FROM trips;

-- Q3 — Trips with more than 3 passengers.
SELECT count(VendorID) AS trip_count
FROM trips
WHERE passenger_count > 3;

-- Q4 — Ten longest trips by distance.
SELECT trip_distance, tpep_pickup_datetime, total_amount
FROM trips
ORDER BY trip_distance DESC
LIMIT 10;


-- ============================================================================
-- 2 · AGGREGATION & GROUPING
-- ============================================================================

-- Q5 — Trip count per payment type.
SELECT payment_type, count(payment_type) AS trip_count
FROM trips
GROUP BY payment_type
ORDER BY payment_type;

-- Q6 — Max, min and average fare.
SELECT
    max(fare_amount) AS max_fare,
    min(fare_amount) AS min_fare,
    avg(fare_amount) AS avg_fare
FROM trips;

-- Q7 — Average tip per payment type.
SELECT payment_type, avg(tip_amount) AS avg_tip
FROM trips
GROUP BY payment_type
ORDER BY payment_type;

-- Q8 — Trip count and total revenue per payment type.
SELECT
    payment_type,
    count(VendorID)   AS trip_count,
    sum(total_amount) AS total_revenue
FROM trips
GROUP BY payment_type
ORDER BY payment_type;


-- ============================================================================
-- 3 · TIME-BASED ANALYSIS
-- ============================================================================

-- Q9 — Average trip duration.
SELECT avg(tpep_dropoff_datetime - tpep_pickup_datetime) AS avg_duration
FROM trips;

-- Q10 — Trip count by pickup hour.
SELECT
    extract(HOUR FROM tpep_pickup_datetime) AS pickup_hour,
    count(*) AS trip_count
FROM trips
GROUP BY extract(HOUR FROM tpep_pickup_datetime)
ORDER BY pickup_hour;

-- Q11 — Average trip distance by day of month.
SELECT
    extract(DAY FROM tpep_pickup_datetime) AS pickup_day,
    avg(trip_distance) AS avg_distance
FROM trips
GROUP BY extract(DAY FROM tpep_pickup_datetime)
ORDER BY avg_distance DESC;

-- Q12 — Average tip by day of month.
SELECT
    extract(DAY FROM tpep_pickup_datetime) AS pickup_day,
    avg(tip_amount) AS avg_tip
FROM trips
GROUP BY extract(DAY FROM tpep_pickup_datetime)
ORDER BY avg_tip DESC;


-- ============================================================================
-- 4 · WINDOW FUNCTIONS
-- ============================================================================

-- Q13 — Trips in each pickup hour, attached to every row.
SELECT
    tpep_pickup_datetime,
    extract(HOUR FROM tpep_pickup_datetime) AS pickup_hour,
    count(*) OVER (
        PARTITION BY extract(HOUR FROM tpep_pickup_datetime)
    ) AS trips_in_hour
FROM trips;

-- Q14 — Rank payment types by total revenue.
SELECT
    payment_type,
    sum(total_amount) AS total_revenue,
    rank() OVER (ORDER BY sum(total_amount) DESC) AS revenue_rank
FROM trips
GROUP BY payment_type
ORDER BY revenue_rank;

-- Q15 — Running revenue within each passenger-count group, highest fare first.
-- The final running value per group equals that group's total (Q16).
SELECT
    passenger_count,
    total_amount,
    sum(total_amount) OVER (
        PARTITION BY passenger_count
        ORDER BY total_amount DESC
    ) AS running_revenue
FROM trips;

-- Q16 — Total revenue per passenger-count group.
SELECT
    passenger_count,
    total_amount,
    sum(total_amount) OVER (
        PARTITION BY passenger_count
    ) AS total_per_passenger
FROM trips;


-- ============================================================================
-- 5 · CTEs & CASE SEGMENTATION
-- ============================================================================

-- Q17 — Card trips over $1 that tipped more than $3.
WITH card_trips AS (
    SELECT *
    FROM trips
    WHERE total_amount > 1
      AND payment_type = 1
)
SELECT count(*) AS trip_count
FROM card_trips
WHERE tip_amount > 3;

-- Q18 — Average tip-to-fare ratio by passenger count (fares > 0).
WITH ratios AS (
    SELECT
        passenger_count,
        tip_amount / fare_amount AS tip_ratio
    FROM trips
    WHERE fare_amount > 0
)
SELECT
    passenger_count,
    round(avg(tip_ratio), 2) AS avg_tip_ratio
FROM ratios
GROUP BY passenger_count
ORDER BY passenger_count;

-- Q19 — Trip count, average fare and average tip by distance band.
-- Bands: [0,2], (2,5], (5,10], (10,inf). The cascade keeps 0-mile trips in
-- the first band, matching the notebook's pd.cut(include_lowest=True).
WITH banded AS (
    SELECT
        CASE
            WHEN trip_distance <= 2  THEN '1: 0-2 mi'
            WHEN trip_distance <= 5  THEN '2: 2-5 mi'
            WHEN trip_distance <= 10 THEN '3: 5-10 mi'
            ELSE '4: 10+ mi'
        END AS band,
        *
    FROM trips
)
SELECT
    band,
    count(VendorID)            AS trip_count,
    round(avg(fare_amount), 2) AS avg_fare,
    round(avg(tip_amount), 2)  AS avg_tip
FROM banded
GROUP BY band
ORDER BY band;

-- Q20 — Car-pool trips (2+ passengers) whose pickup longitude is west of its
-- latitude value (pickup_longitude - pickup_latitude < 0).
WITH labelled AS (
    SELECT
        CASE WHEN passenger_count > 1 THEN 'car-pool' ELSE 'individual' END AS category,
        *
    FROM trips
)
SELECT count(*) AS trip_count
FROM labelled
WHERE category = 'car-pool'
  AND (pickup_longitude - pickup_latitude) < 0;
