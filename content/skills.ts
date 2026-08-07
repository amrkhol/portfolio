export type SkillCategory = {
  name: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    skills: ['Python', 'SQL', 'R', 'VBA', 'Bash'],
  },
  {
    name: 'Data Engineering',
    skills: ['Apache Airflow', 'dbt', 'ETL / ELT', 'Data Modeling', 'Apache Spark'],
  },
  {
    name: 'Cloud & Infrastructure',
    skills: ['Docker', 'GCP BigQuery', 'Git'],
  },
  {
    name: 'Databases',
    skills: ['SQL Server', 'PostgreSQL', 'MySQL', 'Snowflake', 'BigQuery', 'Supabase', 'MS Access'],
  },
  {
    name: 'Business Intelligence',
    skills: ['Power BI', 'Tableau', 'OBIEE', 'DAX', 'Excel', 'D3.js', 'Recharts', 'Matplotlib'],
  },
  {
    name: 'ML & Analytics',
    skills: [
      'scikit-learn',
      'pandas',
      'NumPy',
      'Forecasting',
      'Prophet',
      'A/B Testing',
      'Statistics',
    ],
  },
  {
    name: 'Domain & Governance',
    skills: [
      'F&A rate modeling',
      'Financial analysis',
      'Data quality & reconciliation',
      'Federal compliance reporting',
    ],
  },
  {
    name: 'Ways of working',
    skills: ['Business analysis', 'Stakeholder management', 'Mentoring', 'Jira', 'Asana', 'Jupyter'],
  },
];
