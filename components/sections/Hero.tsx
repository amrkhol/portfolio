import { siteConfig } from '@/content/meta';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-16 relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-40 dark:opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, #8080800d 1px, transparent 1px), linear-gradient(to bottom, #8080800d 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-950" aria-hidden="true" />

      <div className="relative text-center max-w-3xl">
        <p className="text-emerald-600 dark:text-emerald-400 font-mono text-sm font-medium mb-4 tracking-wide">
          Hi, I&apos;m
        </p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          {siteConfig.name}
        </h1>
        <p className="text-xl sm:text-2xl font-medium text-gray-600 dark:text-gray-300 mb-6">
          {siteConfig.title}
        </p>
        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
          {siteConfig.tagline}
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="/#projects"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            View my work
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-sm font-medium rounded-lg transition-colors"
          >
            GitHub
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-sm font-medium rounded-lg transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.resume}
            className="px-5 py-2.5 border border-gray-300 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors"
          >
            Resume ↓
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400 dark:text-gray-600 animate-bounce" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
