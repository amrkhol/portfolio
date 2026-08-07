import { experience } from '@/content/experience';
import { siteConfig } from '@/content/meta';

const VISIBLE_HIGHLIGHTS = 3;

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-emerald-600 dark:text-emerald-400 font-mono text-sm font-medium mb-3">
          Experience
        </p>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Where I&apos;ve worked
          </h2>
          <a
            href={siteConfig.resume}
            className="text-sm px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:border-emerald-500 dark:hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            Full resume ↓
          </a>
        </div>

        <ol className="relative border-l border-gray-200 dark:border-gray-800 ml-2 space-y-10">
          {experience.map((role) => {
            const shown = role.highlights.slice(0, VISIBLE_HIGHLIGHTS);
            const rest = role.highlights.slice(VISIBLE_HIGHLIGHTS);

            return (
              <li key={`${role.company}-${role.title}`} className="ml-6 sm:ml-8">
                <span
                  className="absolute -left-[5px] mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-gray-950"
                  aria-hidden="true"
                />

                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {role.title}
                  </h3>
                  <span className="font-mono text-xs text-gray-500 dark:text-gray-500 shrink-0">
                    {role.period}
                  </span>
                </div>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {role.company}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">{role.location}</p>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
                  {role.summary}
                </p>

                <ul className="mt-4 space-y-2">
                  {shown.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-2.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                    >
                      <span className="text-emerald-500 shrink-0 mt-0.5">→</span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                {rest.length > 0 && (
                  <details className="group mt-3">
                    <summary className="cursor-pointer list-none text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                      <span className="group-open:hidden">Show {rest.length} more ↓</span>
                      <span className="hidden group-open:inline">Show less ↑</span>
                    </summary>
                    <ul className="mt-3 space-y-2">
                      {rest.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex gap-2.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                        >
                          <span className="text-emerald-500 shrink-0 mt-0.5">→</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  {role.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
