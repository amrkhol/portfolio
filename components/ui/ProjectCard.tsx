import Link from 'next/link';
import TechTag from './TechTag';
import type { Project } from '@/content/projects';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-emerald-500/50 dark:hover:border-emerald-500/40 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/5">
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.slice(0, 4).map((tag) => (
          <TechTag key={tag} name={tag} />
        ))}
        {project.tags.length > 4 && (
          <span className="px-2 py-0.5 text-xs text-gray-400 dark:text-gray-500">
            +{project.tags.length - 4}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Link
          href={`/projects/${project.slug}`}
          className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          Case study →
        </Link>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            GitHub
          </a>
        )}
        {project.notebook && (
          <a
            href={project.notebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            Notebook
          </a>
        )}
        {project.report && (
          <a
            href={project.report}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            Report
          </a>
        )}
        {project.demo && project.demo !== '#' && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            Demo
          </a>
        )}
      </div>
    </div>
  );
}
