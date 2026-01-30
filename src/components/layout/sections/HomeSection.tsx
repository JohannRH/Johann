import { HiOutlineMail } from 'react-icons/hi';
import React, { lazy, Suspense } from 'react';
import { motion } from 'motion/react';
const SheepScene = lazy(() => import('../../scene/SheepScene'));

export const HomeSection: React.FC = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-3 md:gap-11 items-center">
        <div className="flex justify-center md:justify-end">
          <div className="w-full h-64 md:h-96 relative">
            <div className="absolute inset-0">
              <Suspense fallback={<div className="w-full h-full bg-secondary" />}>
                <SheepScene />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Text Content - Staggered animation */}
        <div className="space-y-6 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary"
          >
            Hi, I'm{' '}
            <span className="text-accent-primary">Johann</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg text-secondary leading-relaxed"
          >
            I am a software developer based in Colombia. Fascinated by exploring
            new things.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="pt-4"
          >
            <a
              href="mailto:johannrestrepoh@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-2.5 hover-bg-hover text-accent-primary border border-accent-primary font-medium rounded transition-colors text-sm"
            >
              <HiOutlineMail className="w-4 h-4" />
              Say hi!
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};