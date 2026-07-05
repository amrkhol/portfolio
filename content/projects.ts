export type Project = {
  slug: string;
  title: string;
  description: string;
  problem: string;
  approach: string;
  results: string[];
  tags: string[];
  github?: string;
  demo?: string;
  notebook?: string;
  report?: string;
  architectureDiagram?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'network-portfolio-optimization',
    title: 'Network Stock Portfolio Optimization',
    description:
      'Graph-theory approach to S&P 500 portfolio construction — MST-filtered correlation networks identify central vs peripheral stocks, with both portfolios evaluated against the S&P 500 benchmark through the full 2025 calendar year.',
    problem:
      'Traditional mean-variance optimisation requires estimating a large covariance matrix and breaks down under market stress. The goal was to use network topology — specifically Minimum Spanning Tree (MST) filtering of pairwise return correlations — to identify structurally central stocks (market bellwethers) and peripheral stocks (natural diversifiers) without relying on expected-return estimates.',
    approach:
      'Scraped current S&P 500 components from Wikipedia and downloaded 10 years of daily adjusted-close prices (2015–2024) via yfinance. Computed pairwise log-return correlations year-by-year and cumulatively. Converted correlation matrices to distance matrices (d = √(2×(1−ρ))) and applied Kruskal\'s MST algorithm to extract the backbone graph. Computed degree, closeness, betweenness, and eigenvector centrality for each node. Selected top-15 central and top-15 peripheral stocks by average centrality / average distance. Evaluated equal-weight portfolios against S&P 500 (^GSPC) through the full 2025 calendar year, reporting annualised return, volatility, and Sharpe ratio.',
    results: [
      'MST reduces ~500×500 fully connected network to 499 edges while preserving the market\'s backbone correlation structure',
      'Year-by-year shortest path analysis reveals network compression in crisis years (2020 COVID, 2022 rate hikes) — stocks move in lock-step under macro shocks',
      'Central portfolio tracks the S&P 500 closely — high systematic exposure with limited diversification benefit',
      'Peripheral portfolio decouples from broad market swings — lower beta and genuine diversification value for risk-aware allocations',
      'Full 2025 backtested evaluation with annualised return, volatility, and Sharpe ratio (rf = 5%) for both portfolios vs benchmark',
    ],
    tags: ['Python', 'NetworkX', 'yfinance', 'Graph Theory', 'MST', 'pandas', 'NumPy', 'Seaborn', 'Jupyter'],
    notebook: '/notebooks/network-portfolio-optimization.ipynb',
    github: 'https://github.com/amrelkholy',
  },
  {
    slug: 'foodhub-eda',
    title: 'FoodHub Order Analysis',
    description:
      'Exploratory data analysis of 1,898 NYC food delivery orders — answering 17 business questions on cuisine demand, delivery times, restaurant ratings, and revenue to guide operational decisions.',
    problem:
      'FoodHub, a New York food aggregator, needed to understand demand patterns across its restaurant network. Key unknowns: which cuisines and restaurants drive the most orders and revenue, how delivery times vary by day, which restaurants deserve promotional offers, and why ~40% of orders go unrated.',
    approach:
      'Performed structured EDA across all order dimensions. Cleaned the dataset (1,898 rows, 9 columns) and handled "Not given" ratings. Answered 17 targeted business questions using pandas aggregations, value counts, and conditional logic — covering cuisine volume, cost distribution, delivery time analysis, and a custom revenue calculation applying FoodHub\'s 15%/25% commission tiers.',
    results: [
      'American is the top cuisine by volume; Spanish, Thai, and Indian cuisines lead on average customer rating',
      '4 restaurants qualify for the promotional offer (>50 ratings, avg >4): Shake Shack, The Meatball Shop, Blue Ribbon Sushi, Blue Ribbon Fried Chicken',
      'Net platform revenue across all orders: $37,481 after applying 25% commission on orders >$20 and 15% on orders >$5',
      '10.5% of orders exceed 60 minutes total (prep + delivery) — a key SLA threshold',
      'Weekend delivery is 6 minutes faster on average (22.5 min) than weekday delivery (28.3 min), suggesting weekend staffing efficiency',
      'Recommended: incentivise rating submission to close the ~40% unrated gap; add weekend delivery capacity; audit American cuisine quality to match its high volume with higher ratings',
    ],
    tags: ['Python', 'pandas', 'Seaborn', 'Matplotlib', 'EDA', 'Statistics', 'Jupyter'],
    notebook: '/notebooks/foodhub-eda.html',
    github: 'https://github.com/amrelkholy',
  },
  {
    slug: 'clustering-comparison',
    title: 'Clustering Algorithms Comparison',
    description:
      'Side-by-side comparison of four unsupervised clustering algorithms — KMeans, Gaussian Mixture, Agglomerative, and DBSCAN — applied to 2D data to evaluate cluster shape sensitivity and noise handling.',
    problem:
      'Choosing the right clustering algorithm is non-trivial: different methods make different assumptions about cluster shape, size, and density. The goal was to run KMeans, Gaussian Mixture Models, Agglomerative Clustering, and DBSCAN on the same dataset and visually compare how each partitions the space.',
    approach:
      'Prepared a 2D dataset and applied all four algorithms with consistent settings (n_clusters=2 where applicable). Produced a single side-by-side subplot grid using Matplotlib so cluster boundaries and noise handling can be compared at a glance. DBSCAN labels of -1 (noise) are surfaced as a distinct color to highlight its outlier-rejection capability.',
    results: [
      'KMeans and Agglomerative produce clean spherical partitions but are sensitive to outliers',
      'Gaussian Mixture captures elliptical cluster shapes through probabilistic soft assignments',
      'DBSCAN is the only algorithm that explicitly rejects noise points (label = -1), making it robust to outliers',
      'Visual grid makes algorithm trade-offs immediately apparent without numerical metrics',
    ],
    tags: ['Python', 'scikit-learn', 'KMeans', 'DBSCAN', 'Gaussian Mixture', 'Agglomerative', 'Seaborn', 'Jupyter'],
    notebook: '/notebooks/clustering-comparison.ipynb',
    github: 'https://github.com/amrelkholy',
  },
  {
    slug: 'pca-tsne-analysis',
    title: 'PCA & t-SNE Dimensionality Reduction',
    description:
      'Dimensionality reduction study on Education and Air Pollution datasets — PCA cut 17 features to 4 components retaining 70% variance; t-SNE revealed 4 distinct pollution clusters invisible to PCA.',
    problem:
      'High-dimensional tabular datasets are hard to interpret and visualize. The goal was to apply unsupervised dimensionality reduction to two real-world datasets — US college admissions data (777 rows, 17 features) and an air pollution dataset (403 rows, 25 features) — to surface latent structure and determine whether meaningful groupings exist.',
    approach:
      'Cleaned and standardised both datasets (outlier correction, median imputation for nulls, one-hot encoding for the weather categorical). Applied full PCA to identify how many components are needed to explain at least 70% of variance, then interpreted each principal component by loading magnitude. Ran t-SNE at perplexity values 10–45 to check for cluster stability. For the Air Pollution dataset, used axis-based rules to assign the four t-SNE clusters and validated them with per-variable boxplots.',
    results: [
      'Education: 4 PCs out of 17 explain ≥ 70% variance — 76% dimensionality reduction',
      'PC1 captures college prestige; PC2 enrolment scale; PC3 cost-of-living; PC4 faculty credentials',
      'Air Pollution: 5 PCs explain ≥ 70% variance across 25 features',
      't-SNE (perplexity = 35) reveals 4 stable clusters: hot-humid low-pollution, medium-urban, high-Ozone developed areas, and hydrocarbon-heavy industrial zones',
      'Education t-SNE shows no underlying clusters — confirms the data lacks a natural grouping structure',
    ],
    tags: ['Python', 'PCA', 't-SNE', 'scikit-learn', 'pandas', 'Seaborn', 'Jupyter'],
    notebook: '/notebooks/pca-tsne-analysis.ipynb',
    github: 'https://github.com/amrelkholy',
  },
  {
    slug: 'spotify-music-recommendation',
    title: 'Spotify Music Recommendation System',
    description:
      'End-to-end recommendation engine built on 117K+ Spotify listening interactions — four algorithms benchmarked from popularity-based to collaborative filtering, with User-User CF delivering the best F1 of 0.505 and Recall of 0.641.',
    problem:
      'Streaming platforms generate massive implicit feedback (play counts) but lack explicit user preferences. The challenge was to build and evaluate multiple recommendation strategies on a sparse user-song interaction matrix — 3,155 users, 563 songs, and only 117,876 observed interactions out of 1.8M possible pairs.',
    approach:
      'Cleaned and encoded the Million Song Dataset, capping extreme play counts and encoding user/song IDs numerically. Built four models using the Surprise library: a rank-based popularity baseline, User-User KNN (cosine → pearson_baseline via GridSearchCV), Item-Item KNN, and CoClustering. Evaluated each on Precision@30, Recall@30, F1@30, and RMSE on an 80/20 train-test split. Added a corrected-ratings re-ranker that penalises songs with low interaction counts to surface high-confidence recommendations.',
    results: [
      'User-User CF (optimized, pearson_baseline, k=40): RMSE=1.037, Precision=0.416, Recall=0.641, F1=0.505 — best overall model',
      'Item-Item CF (optimized, pearson_baseline, k=30): RMSE=1.012, Precision=0.403, Recall=0.583, F1=0.477',
      'CoClustering baseline: RMSE=1.034, F1=0.457 — good fallback for cold-start users',
      'Rank-based model surfaces verifiable popular songs (Coldplay, Kings of Leon, Daft Punk) as a non-personalised baseline',
      'Corrected-ratings re-ranker blends predicted play count with interaction count to prevent low-frequency songs from dominating recommendations',
    ],
    tags: ['Python', 'Surprise', 'KNN', 'Collaborative Filtering', 'GridSearchCV', 'pandas', 'Seaborn', 'Jupyter'],
    notebook: '/notebooks/music-recommendation-milestone.html',
    report: '/notebooks/music-recommendation-capstone.pdf',
    github: 'https://github.com/amrelkholy',
  },
  {
    slug: 'amazon-product-recommendation',
    title: 'Amazon Product Recommendation System',
    description:
      'User-user collaborative filtering on 62K Amazon product ratings — tuned KNN model achieves 86.9% F1, 89.3% Recall, and RMSE of 0.953 after GridSearchCV hyperparameter optimisation.',
    problem:
      'Amazon\'s product catalogue is vast — users cannot discover relevant items without personalised signals. The goal was to build a recommendation system from raw star ratings, handle the sparsity of real-world rating matrices, and identify the similarity measure and neighbourhood size that maximise ranking quality.',
    approach:
      'Filtered the dataset to 62K interactions by removing products with fewer than 10 ratings to reduce noise. Encoded user and product IDs for Surprise. Built a rank-based popularity baseline first, then a User-User KNNBasic model with cosine similarity. Ran 3-fold GridSearchCV over k ∈ {30, 40, 50}, min_k ∈ {3, 6, 9}, and similarity measures (MSD, cosine) to find optimal hyperparameters. Evaluated on Precision@10, Recall@10, F1@10, and RMSE.',
    results: [
      'Baseline User-User CF: RMSE=1.001, Precision=0.855, Recall=0.858, F1=0.856',
      'Optimized model (MSD, k=50, min_k=6): RMSE=0.953, Precision=0.847, Recall=0.893, F1=0.869',
      'Recall improved by 4 percentage points after tuning — more relevant products surface in top-10 recommendations',
      'Rank-based baseline correctly identifies top products with 50+ and 100+ ratings for cold-start users',
    ],
    tags: ['Python', 'Surprise', 'KNN', 'Collaborative Filtering', 'GridSearchCV', 'pandas', 'Jupyter'],
    notebook: '/notebooks/music-recommendation-elective.html',
    github: 'https://github.com/amrelkholy',
  },
  {
    slug: 'covid-xray-classification',
    title: 'COVID-19 Chest X-Ray Classification',
    description:
      'Deep-learning image classifier that distinguishes COVID-19, viral pneumonia, and healthy chest X-rays — three CNN architectures benchmarked, with VGG16 transfer learning reaching 88.5% test accuracy.',
    problem:
      'Radiologists need fast, scalable support in triaging chest X-rays during a pandemic. The goal was to build a Convolutional Neural Network that classifies an X-ray into one of three classes — COVID-19, Viral Pneumonia, or Normal — while handling a small, mildly imbalanced dataset where misclassifying a COVID case as healthy is the most costly error.',
    approach:
      'Worked with 251 grayscale X-ray images (128×128×3) stored as NumPy arrays, resized to 64×64 to cut compute, normalized pixels to [0,1], and one-hot encoded labels with a stratified 90/10 train-test split. Built and compared three models: (1) a baseline CNN, (2) a regularized CNN with data augmentation, BatchNormalization, and ReduceLROnPlateau learning-rate scheduling, and (3) VGG16 transfer learning with a frozen ImageNet backbone and a custom dense classification head. Evaluated each with accuracy curves and confusion matrices, focusing on COVID recall.',
    results: [
      'Baseline CNN stalled at ~46% test accuracy — unable to separate the three classes',
      'Augmented CNN with BatchNorm reached ~88% train accuracy but generalized poorly on the held-out set',
      'VGG16 transfer-learning model was the best performer at 88.5% test accuracy with the fewest misclassifications',
      'Confusion-matrix analysis confirmed the transfer model rarely confuses COVID with the other classes — the safety-critical objective',
      'Demonstrates transfer learning\'s advantage over from-scratch CNNs on small medical-imaging datasets',
    ],
    tags: ['Python', 'TensorFlow', 'Keras', 'CNN', 'VGG16', 'Transfer Learning', 'Data Augmentation', 'OpenCV', 'Jupyter'],
    notebook: '/notebooks/covid-xray-classification.ipynb',
    github: 'https://github.com/amrelkholy',
  },
  {
    slug: 'bigmart-sales-prediction',
    title: 'BigMart Sales Prediction',
    description:
      'Interpretable linear-regression model predicting retail item sales across 1,559 products and 10 outlets — full EDA, relationship-based missing-value imputation, and assumption-driven feature selection lifting R² from 0.56 to 0.72.',
    problem:
      'BigMart wanted to predict Item_Outlet_Sales to guide inventory and understand which product and store attributes drive revenue. The dataset (8,523 train / 5,681 test rows) had ~17% missing Item_Weight and ~28% missing Outlet_Size, plus inconsistent categorical labels — requiring careful cleaning before a statistically sound, interpretable model could be built.',
    approach:
      'Ran univariate and bivariate EDA to profile every feature, fixed inconsistent Item_Fat_Content labels, and imputed missing values using discovered relationships (uniform-distribution imputation for Item_Weight; Outlet_Type/Location patterns for Outlet_Size) rather than naive means. Engineered an Outlet_Age feature, one-hot encoded categoricals with reference levels, and MinMax-scaled numerics. Built an OLS model in statsmodels, then iteratively removed features by VIF (multicollinearity) and p-value significance. Verified all four linear-regression assumptions and applied a log transform to the target to fix non-linearity and heteroscedasticity.',
    results: [
      'Relationship-based imputation preserved feature distributions while eliminating all missing values',
      'VIF + p-value feature selection reduced the model to five significant predictors with no multicollinearity (all VIF < 5)',
      'Log-transforming the target raised R² from 0.56 to 0.720 and satisfied linearity and homoscedasticity assumptions',
      'Cross-validated R² of 0.718 (MSE 0.290) confirms a well-generalized, "just right" fit — no over/underfitting',
      'Item_MRP and Outlet_Type (Supermarket Type 3) emerged as the dominant sales drivers, yielding actionable merchandising recommendations',
    ],
    tags: ['Python', 'statsmodels', 'Linear Regression', 'EDA', 'Feature Engineering', 'VIF', 'scikit-learn', 'pandas', 'Seaborn', 'Jupyter'],
    notebook: '/notebooks/bigmart-sales-prediction.ipynb',
    github: 'https://github.com/amrelkholy',
  },
];
