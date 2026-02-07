import { useCallback } from 'react';
import { MdEmail  } from 'react-icons/md';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'motion/react';

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
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-10 bg-secondary"
    >
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-center md:justify-between">
        {/* Navigation Links - hidden on mobile */}
        <div className="hidden md:flex items-center gap-6 md:gap-8">
          {sections.map((section, index) => {
            const id = section.toLowerCase().replace(/\s+/g, '-');
            return (
              <motion.a
                key={section}
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.1 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-muted hover-text-primary transition-colors text-sm font-medium tracking-wide"
              >
                {section}
              </motion.a>
            );
          })}
        </div>

        {/* Contact Icons */}
        <div className="flex items-center gap-3 md:gap-4">
          {[
            { href: "mailto:johannrestrepoh@gmail.com", icon: MdEmail, label: "Email" },
            { href: "https://github.com/JohannRH", icon: FaGithub, label: "GitHub" },
            { href: "https://www.linkedin.com/in/johannrestrepo", icon: FaLinkedin, label: "LinkedIn" }
          ].map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? "_blank" : undefined}
              rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
              aria-label={item.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.5 + index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="text-muted hover-text-primary transition-colors flex items-center justify-center"
            >
              <item.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};