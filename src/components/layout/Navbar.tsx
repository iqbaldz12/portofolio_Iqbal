import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
          ? 'bg-theme-bg/90 backdrop-blur-xl border-b border-theme-cardBorder shadow-lg shadow-theme-purple/5'
          : 'bg-transparent'
          } py-4 px-6 md:px-12 flex justify-between items-center`}
      >
        <motion.a
          href="#home"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-wider"
        >
          <span className="gradient-text">&lt;</span>
          <span className="text-white">Iqbal</span>
          <span className="gradient-text"> /&gt;</span>
        </motion.a>

        {/* Desktop Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex space-x-8 text-sm font-medium text-theme-muted"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative hover:text-white transition-colors duration-300 group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </motion.div>

        {/* Desktop CTA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:block"
        >
          <a
            href="#contact"
            className="px-6 py-2.5 bg-gradient-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-theme-purple/25"
          >
            Hire Me
          </a>
        </motion.div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden text-white p-2 z-50"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-theme-bg/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8"
          >
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setIsMobileOpen(false)}
                className="text-2xl font-semibold text-theme-muted hover:text-white transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={() => setIsMobileOpen(false)}
              className="px-8 py-3 bg-gradient-primary text-white rounded-lg font-semibold"
            >
              Hire Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
