import { projects } from '@/content/projects';
import ProjectCard from '@/components/ui/ProjectCard';

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-emerald-600 dark:text-emerald-400 font-mono text-sm font-medium mb-3">
          Work
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Projects
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-12 max-w-xl leading-relaxed">
          Analyses, pipelines, and tools — all driven by real data problems. Click any card
          for the full case study.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
