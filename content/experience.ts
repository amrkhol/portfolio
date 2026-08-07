export type Role = {
  company: string;
  title: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
  tags: string[];
};

export const experience: Role[] = [
  {
    company: 'New York University',
    title: 'Senior Data Analyst',
    location: 'New York, NY · Costing & Analysis',
    period: '2022 — 2026',
    summary:
      "Owned the data infrastructure behind NYU's federally negotiated F&A overhead rate model and the reporting layer used by executive leadership, 1,000+ Principal Investigators, and federal agencies.",
    highlights: [
      'Built the data infrastructure for the university’s federally negotiated Facilities & Administrative (F&A) rate model — integrating financial, payroll, facilities, depreciation, and space data into a centralized SQL Server database with ETL pipelines, SQL transformations, and Python automation. Supported auditable annual submissions that maintained the 65% negotiated F&A rate.',
      'Architected a modern data platform on Python, Docker, Apache Airflow, SQL, dbt, and Git — normalized relational models, SQL data marts, and automated ELT pipelines powering enterprise analytics, self-service reporting, and regulatory submissions.',
      'Designed and ran a centralized SQL reporting hub of 200+ automated reports serving executive leadership, federal agencies (NASA, NSF, NIH, DoD), and global university ranking submissions.',
      'Built forecasting models and executive reporting in OBIEE and Tableau that helped leadership cut sponsor receivables from $18M to $3M.',
      'Delivered executive Power BI dashboards translating research spending into actionable insight — supporting a 30% increase in research expenditures over two years.',
      'Built a Power BI dashboard using advanced DAX to map research activity to individual rooms, enabling room-level cost-benefit analysis and contributing to a 30% improvement in research space utilization.',
      'Co-developed a Microsoft Access invoicing platform (VBA + SQL, integrated with the Enterprise Data Warehouse via OBIEE) that cut invoice processing from ~1 hour to 5 minutes for 20+ daily users.',
      'Served as Lead Business Analyst on two grant-management automation tools, integrating pre-award and post-award systems to align budgets with expenditures across the grant lifecycle.',
      'Established documentation, testing, and data governance standards — 20+ process documents defining business rules and KPI definitions.',
    ],
    tags: ['SQL Server', 'Python', 'Airflow', 'dbt', 'Docker', 'Power BI', 'Tableau', 'OBIEE', 'DAX'],
  },
  {
    company: 'Precision Pain & Spine Institute',
    title: 'Financial / Billing Analyst',
    location: 'New Jersey',
    period: '2020 — 2022',
    summary:
      'Ran revenue cycle analytics for a 10-physician multi-specialty group, pairing dashboards with hands-on variance and denial analysis.',
    highlights: [
      'Designed Power BI dashboards trending revenue, provider productivity, and case profitability across pain management, chiropractic, and physical therapy — partnering with leadership on KPI definitions.',
      'Resolved $17M in outstanding debit balances through systematic variance investigation and targeted collection strategies.',
      'Led appeals for 2,000+ insurance arbitration cases, reaching a 50% profitability rate via data-driven prioritization.',
      'Led a financial system implementation, reconciling $20M+ across 15,000+ transactions with full audit readiness.',
    ],
    tags: ['Power BI', 'Excel', 'SQL', 'Revenue cycle analytics'],
  },
  {
    company: 'Precision Pain & Spine Institute',
    title: 'Billing Specialist',
    location: 'New Jersey',
    period: '2018 — 2020',
    summary:
      'Optimized charge-capture and claim-submission workflows, building the Excel-based tracking systems the team ran on.',
    highlights: [
      'Captured $10M+ in revenue through charge-capture and claim-submission workflow optimization.',
      'Cut the insurance claim backlog by 20% in one year via Excel-based tracking and targeted denial resolution.',
      'Improved 60-day collection rates by 20% across all payers through a structured process-improvement roadmap.',
      'Improved revenue recognition accuracy by 25% through database optimization using advanced Excel.',
    ],
    tags: ['Excel', 'Process improvement', 'Denial analytics'],
  },
];
