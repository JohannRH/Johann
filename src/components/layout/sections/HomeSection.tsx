import { HiOutlineMail } from 'react-icons/hi';
import React, { lazy, Suspense } from 'react';
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
              <Suspense fallback={null}>
                <SheepScene />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
            Hi, I'm{' '}
            <span className="text-accent-primary">Johann</span>
          </h1>
          <p className="text-base md:text-lg text-secondary leading-relaxed">
            I am a software developer based in Colombia. Fascinated by exploring
            new things.
          </p>
          <div className="pt-4">
            <a
              href="mailto:your.email@example.com"
              className="inline-flex items-center gap-2 px-6 py-2.5 hover-bg-hover text-accent-primary border border-accent-primary font-medium rounded transition-colors text-sm"
            >
              <HiOutlineMail className="w-4 h-4" />
              Say hi!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};