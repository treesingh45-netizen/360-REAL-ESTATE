import React, { useState, useEffect } from 'react';
import { ActivePage } from '../types';
import { AGENCY_INFO } from '../data/properties';
import { Logo } from './Logo';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: ActivePage; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'properties', label: 'Properties' },
    { id: 'apartments', label: 'Apartments' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'rentals', label: 'Rentals' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: ActivePage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs py-3 border-b border-[#252525]/5'
          : 'bg-white/80 backdrop-blur-xs py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left group focus:outline-hidden"
          >
            <Logo className="h-9 sm:h-11" variant="dark" />
          </button>

          {/* Desktop Navigation */}
          <nav id="desktop-navigation" className="hidden lg:flex items-center space-x-7">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-200 relative py-1 focus:outline-hidden ${
                    isActive
                      ? 'text-[#4A748C]'
                      : 'text-[#252525] hover:text-[#4A748C]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4A748C]"
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right side contact (Subtle & minimal) */}
          <div className="hidden lg:flex items-center space-x-5">
            <a
              id="header-phone-link"
              href={`tel:${AGENCY_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 text-xs font-medium text-[#667085] hover:text-[#252525] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#4A748C]" />
              <span className="tracking-wider">{AGENCY_INFO.phoneDisplay}</span>
            </a>

            <button
              id="header-contact-btn"
              onClick={() => handleNavClick('contact')}
              className="px-4 py-2 border border-[#4A748C] text-[#4A748C] hover:bg-[#4A748C] hover:text-white transition-all text-xs font-semibold tracking-widest uppercase rounded-sm cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#252525] hover:text-[#4A748C] focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-b border-[#252525]/10 shadow-lg overflow-hidden"
          >
            <div className="px-6 py-5 space-y-3">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left py-2 text-sm font-semibold uppercase tracking-wider transition-colors ${
                      isActive ? 'text-[#4A748C]' : 'text-[#252525] hover:text-[#4A748C]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              <div className="pt-4 border-t border-[#252525]/10 flex flex-col gap-3">
                <a
                  id="mobile-phone-link"
                  href={`tel:${AGENCY_INFO.phoneRaw}`}
                  className="flex items-center gap-2 text-sm text-[#667085] font-medium"
                >
                  <Phone className="w-4 h-4 text-[#4A748C]" />
                  <span>{AGENCY_INFO.phoneDisplay}</span>
                </a>
                <button
                  id="mobile-contact-action-btn"
                  onClick={() => handleNavClick('contact')}
                  className="w-full text-center py-2.5 bg-[#4A748C] text-white text-xs font-semibold tracking-widest uppercase rounded-sm"
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
