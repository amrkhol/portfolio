import { notFound } from 'next/navigation';
import { projects } from '@/content/projects';
import type { Metadata } from 'next';
import Link from 'next/link';
import TechTag from '@/components/ui/TechTag';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mb-10"
        >
          ← Back to projects
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {project.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <TechTag key={tag} name={tag} />
          ))}
        </div>

        <div className="flex gap-3 mb-12">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-sm font-medium rounded-lg transition-colors"
            >
              View on GitHub
            </a>
          )}
          {project.notebook && (
            <a
              href={project.notebook}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              View Notebook
            </a>
          )}
          {project.report && (
            <a
              href={project.report}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-sm font-medium rounded-lg transition-colors"
            >
              View Report
            </a>
          )}
          {project.demo && project.demo !== '#' && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Live Demo
            </a>
          )}
        </div>

        <div className="space-y-10">
          <section aria-labelledby="problem-heading">
            <h2 id="problem-heading" className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="text-emerald-500">01</span> Problem
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{project.problem}</p>
          </section>

          <section aria-labelledby="approach-heading">
            <h2 id="approach-heading" className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="text-emerald-500">02</span> Approach
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{project.approach}</p>
          </section>

          {project.architectureDiagram && (
            <section aria-labelledby="arch-heading">
              <h2 id="arch-heading" className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-emerald-500">03</span> Architecture
              </h2>
              <div className="bg-gray-100 dark:bg-gray-800/60 rounded-xl p-10 flex items-center justify-center text-gray-400 dark:text-gray-600 text-sm border border-dashed border-gray-300 dark:border-gray-700">
                [ Architecture diagram — add an image or Excalidraw embed here ]
              </div>
            </section>
          )}

          <section aria-labelledby="results-heading">
            <h2 id="results-heading" className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="text-emerald-500">{project.architectureDiagram ? '04' : '03'}</span> Results
            </h2>
            <ul className="space-y-3">
              {project.results.map((result, i) => (
                <li key={i} className="flex gap-3 text-gray-600 dark:text-gray-400">
                  <span className="text-emerald-500 shrink-0 mt-0.5">✓</span>
                  {result}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
