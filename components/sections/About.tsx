export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-emerald-600 dark:text-emerald-400 font-mono text-sm font-medium mb-3">
              About me
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Turning data into<br />decisions
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                I&apos;m a data scientist with 7+ years turning data into decisions —
                hands-on with SQL, Python, machine learning, Tableau, and Power BI across
                the full data workflow from raw data to insight.
              </p>
              <p>
                Most recently I spent four years as a Senior Data Analyst at NYU, where I built
                the data infrastructure behind the university&apos;s federally negotiated F&amp;A
                rate model and a reporting hub of 200+ automated reports used by executive
                leadership, 1,000+ Principal Investigators, and federal agencies including NASA,
                NSF, NIH, and the DoD.
              </p>
              <p>
                I care about the full data journey: from raw CSV to a model you can trust,
                from an ad-hoc question to a dashboard your whole team actually uses — built on
                pipelines that hold up to an audit.
              </p>
              <p>
                I&apos;m actively targeting data science roles where I can apply machine learning
                to real business problems, build clear dashboards and reporting, and help teams
                make decisions with data.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-xs font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
                Currently
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex gap-2">
                  <span className="text-emerald-500 shrink-0">→</span>
                  Building Vizzy — a data visualization SaaS
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500 shrink-0">→</span>
                  Sharpening SQL, Tableau &amp; Power BI dashboards
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500 shrink-0">→</span>
                  Open to data science roles
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-xs font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
                Target roles
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Data Scientist', 'Machine Learning Engineer', 'Data Analyst', 'Applied Scientist'].map(
                  (role) => (
                    <span
                      key={role}
                      className="px-3 py-1 text-sm bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-800"
                    >
                      {role}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-xs font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
                Education
              </h3>
              <ul className="space-y-4">
                {[
                  {
                    school: 'New York University',
                    degree: 'M.S. in Quantitative Management',
                    meta: 'New York, NY · 2026',
                    detail:
                      'Coursework: Machine Learning, Statistical Modeling, Predictive Analytics, Data Visualization, Optimization & Decision Analysis, Database Systems, Financial Analytics.',
                  },
                  {
                    school: 'Massachusetts Institute of Technology (MIT)',
                    degree: 'Applied AI & Data Science Program',
                    meta: '2026',
                    detail:
                      'Focus: Machine Learning, Deep Learning & Recommendation Systems — neural networks and predictive modeling in Python.',
                  },
                  {
                    school: 'Rutgers Business School',
                    degree: 'B.A. in Business Administration, Data Analytics Concentration',
                    meta: 'New Brunswick, NJ · 2021',
                  },
                ].map(({ school, degree, meta, detail }) => (
                  <li key={school} className="flex gap-3">
                    <span className="text-emerald-500 shrink-0 mt-0.5">✓</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{school}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{degree}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">{meta}</p>
                      {detail && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{detail}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { value: '7+', label: 'Years in data' },
                { value: '200+', label: 'Automated reports' },
                { value: '1,000+', label: 'Researchers served' },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-800"
                >
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {value}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
