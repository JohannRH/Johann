type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  previewUrl?: string;
  githubUrl?: string;
};

const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'RubrITM',
    description:
      'Developed a complete rubric management platform for university instructors to create, grade, and distribute assessments. Led frontend architecture while implementing backend REST APIs, enabling collaborative workflows, automated email distribution, and multi-subject group management.',
    technologies: ['Vue.js', 'Nuxt', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/BreyMene/Rubricas-ITM',
  },
  {
    id: 'proj-2',
    title: 'HF Finance',
    description:
      'Building a financial health evaluation tool for entrepreneurs featuring AI-driven questionnaires across 7+ business themes. Integrated Gemini AI API to automate analysis and deliver actionable insights through intelligent data processing.',
    technologies: ['React', 'Java', 'Supabase', 'Gemini AI'],
    githubUrl: 'https://github.com/Proyecto-Haroldo',
  },
];

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="min-h-[88vh] px-6"
    >
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary flex items-center gap-3">
          <span>/</span>
          <span>projects</span>
          <span className="flex-1 h-px bg-neutral"></span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-tertiary rounded-md p-5 transition-colors flex flex-col h-full"
            >
              <h3 className="text-lg font-semibold text-primary mb-2">
                {project.title}
              </h3>
              <p className="text-secondary mb-4 leading-relaxed text-sm grow">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-hover text-secondary text-xs rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                {project.previewUrl && (
                  <a
                    href={project.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-primary hover:text-accent-secondary text-sm font-medium transition-colors"
                  >
                    Preview →
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-primary text-sm font-medium transition-colors"
                  >
                    GitHub →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
