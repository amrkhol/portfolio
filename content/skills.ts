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
    skills: ['Apache Airflow', 'Apache Spark', 'ETL / ELT', 'Data Modeling'],
  },
  {
    name: 'Cloud & Infrastructure',
    skills: ['GCP BigQuery', 'Docker'],
  },
  {
    name: 'Databases',
    skills: ['PostgreSQL', 'MySQL', 'Snowflake', 'BigQuery', 'Supabase'],
  },
  {
    name: 'Visualization',
    skills: ['Tableau', 'Power BI', 'D3.js', 'Recharts', 'Matplotlib'],
  },
  {
    name: 'ML & Analytics',
    skills: ['scikit-learn', 'pandas', 'NumPy', 'Prophet', 'A/B Testing', 'Statistics'],
  },
  {
    name: 'Tools & Frameworks',
    skills: ['Git', 'Jupyter'],
  },
];
