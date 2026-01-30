import meImage from '../../../assets/images/me.jpg';
import { ScrollReveal } from '../ScrollReveal';
import { motion } from 'motion/react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="min-h-[88vh] px-6"
    >
      <div className="max-w-4xl mx-auto w-full">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary flex items-center gap-3">
            <span>/</span>
            <span>about me</span>
            <span className="flex-1 h-px bg-neutral"></span>
          </h2>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Text Content */}
          <ScrollReveal delay={0.2}>
            <div className="space-y-4 text-secondary leading-relaxed text-sm md:text-base">
              <p>
                I am currently studying Computer Science at ITM Colombia for 3
                years and there are other 2 years waiting for me to graduate D:
              </p>
              <p className="mb-2">Some technologies i have been working with:</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {['React.js', 'Vue.js', 'Typescript', 'Javascript', 'Node.js', 'Python'].map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-accent-primary">▸</span>
                    <span>{tech}</span>
                  </motion.div>
                ))}
              </div>
              <p className="mt-4">
                Still learning from all of them. Outside studying, love seeing new
                tech gadgets, watching anime and playing videogames
              </p>
            </div>
          </ScrollReveal>

          {/* Photo */}
          <ScrollReveal delay={0.4}>
            <div className="flex justify-center md:justify-end">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-[280px] aspect-square rounded-lg overflow-hidden"
              >
                <img
                  src={meImage}
                  alt="Johann Restrepo"
                  className="w-full h-full object-cover scale-[1.2]"
                />
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};