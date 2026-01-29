import React from 'react';
import { Navbar } from './Navbar';
import { HomeSection } from './sections/HomeSection';
import { AboutSection } from './sections/AboutSection';
import { ExperiencesSection } from './sections/ExperiencesSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { Footer } from './Footer';

const NAV_SECTIONS = ['Home', 'About', 'Experiences', 'Projects'];

export const PortfolioShell: React.FC = () => {
  return (
    <main className="relative z-10 min-h-screen bg-secondary text-primary">
      <Navbar sections={NAV_SECTIONS} />
      <HomeSection />
      <AboutSection />
      <ExperiencesSection />
      <ProjectsSection />
      <Footer />
    </main>
  );
};

