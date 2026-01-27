import { useCallback } from 'react';
import { MdEmail  } from 'react-icons/md';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

type NavbarProps = {
  sections: string[];
};

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export const Navbar: React.FC<NavbarProps> = ({ sections }) => {
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      scrollToSection(id);
    },
    [],
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0c0a09]/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Navigation Links */}
        <div className="flex items-center gap-6 md:gap-8">
          {sections.map((section) => {
            const id = section.toLowerCase().replace(/\s+/g, '-');
            return (
              <a
                key={section}
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                className="text-slate-300 hover:text-slate-100 transition-colors text-sm font-medium tracking-wide"
              >
                {section}
              </a>
            );
          })}
        </div>

        {/* Contact Icons */}
        <div className="flex items-center gap-3 md:gap-4">
          <a
            href="mailto:johannrestrepoh@gmail.com"
            aria-label="Email"
            className="text-slate-400 hover:text-slate-100 transition-colors flex items-center justify-center"
          >
            <MdEmail className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/JohannRH"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-slate-400 hover:text-slate-100 transition-colors flex items-center justify-center"
          >
            <FaGithub className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/johannrestrepo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-slate-400 hover:text-slate-100 transition-colors flex items-center justify-center"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </nav>
  );
};
