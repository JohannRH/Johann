import { useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

type Experience = {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  details: string[];
};

const experiences: Experience[] = [
  {
    id: 'exp-1',
    title: 'Frontend Developer',
    company: 'EcoDrive (ITM University)',
    period: 'JUN 2025 - PRESENT',
    description: '',
    details: [
      'Built and launched administrative web platform managing 7+ system components and user workflows, enabling real-time tracking of CO₂ savings metrics and sustainability rewards across university ride-sharing community',
      'Led frontend development and contributed to backend API implementation in Go, delivering end-to-end features from React/TypeScript interfaces to PostgreSQL database integration and deployment on Kubernetes infrastructure',
    ],
  },
  {
    id: 'exp-2',
    title: 'Searching for new experiences',
    company: 'Open to Opportunities',
    period: 'Always',
    description: '',
    details: [
      'Looking for exciting opportunities to grow and contribute',
      'Ready to take on new challenges and learn from amazing teams',
    ],
  },
];

export const ExperiencesSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(experiences[0].id);
  const shouldReduceMotion = useReducedMotion();

  const selectedExperience = experiences.find((exp) => exp.id === selectedId);

  const handleSelect = useCallback((id: string) => {
    if (id === selectedId) return;
    setSelectedId(id);
  }, [selectedId]);

  return (
    <section
      id="experiences"
      className="min-h-[88vh] px-6"
    >
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary flex items-center gap-3">
          <span>/</span>
          <span>experience</span>
          <span className="flex-1 h-px bg-neutral"></span>
        </h2>
        <div className="grid md:grid-cols-[200px_1fr] gap-8">
          {/* Experience List */}
          <div className="space-y-2 relative">
            {experiences.map((exp) => (
              <button
                key={exp.id}
                onClick={() => handleSelect(exp.id)}
                className={`relative w-full text-left py-3 px-4 transition-all duration-300 text-sm ${
                  selectedId === exp.id
                    ? 'text-primary'
                    : 'text-muted hover-text-secondary'
                }`}
              >
                {/* Active indicator line */}
                {selectedId === exp.id && (
                  <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent-primary transition-all duration-300" />
                )}
                <span className="relative z-10">{exp.company.toUpperCase()}</span>
              </button>
            ))}
          </div>

          {/* Experience Details */}
          <div className="space-y-4 min-h-[240px] relative">
            <AnimatePresence mode="wait">
              {selectedExperience && (
                <motion.div
                  key={selectedExperience.id}
                  initial={
                    shouldReduceMotion
                      ? undefined
                      : { opacity: 0, y: 10 }
                  }
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : { opacity: 1, y: 0 }
                  }
                  exit={
                    shouldReduceMotion
                      ? undefined
                      : { opacity: 0, y: -10 }
                  }
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : {
                          duration: 0.3,
                          ease: [0.4, 0, 0.2, 1],
                        }
                  }
                >
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-1">
                      {selectedExperience.title}{' '}
                      <span className="text-accent-primary">@</span>{' '}
                      <span className="text-accent-primary">
                        {selectedExperience.company}
                      </span>
                    </h3>
                    <p className="text-secondary text-sm mb-4">
                      {selectedExperience.period.toUpperCase()}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {selectedExperience.details.map((detail, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-primary text-sm leading-relaxed"
                      >
                        <span className="text-accent-primary mt-1.5 shrink-0">
                          ▸
                        </span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
