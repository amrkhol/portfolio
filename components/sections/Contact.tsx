import { siteConfig } from '@/content/meta';

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-gray-50 dark:bg-gray-900/40">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-emerald-600 dark:text-emerald-400 font-mono text-sm font-medium mb-3">
            Get in touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Let&apos;s work together
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-lg">
            I&apos;m currently open to data science opportunities. Whether
            you have a role, a project, or just want to talk data — my inbox is open.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-center text-sm"
            >
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg transition-colors text-center text-sm"
            >
              LinkedIn
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg transition-colors text-center text-sm"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
