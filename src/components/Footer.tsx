import React from 'react';
import { ActivePage } from '../types';
import { AGENCY_INFO } from '../data/properties';
import { Logo } from './Logo';
import { Facebook, Instagram, Linkedin, MapPin, Phone, User } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: ActivePage) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#252525] text-[#F5F7F8] pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <Logo className="h-10" variant="light" />
            <p className="text-xs text-[#667085] leading-relaxed max-w-sm pt-2">
              Lahore-based commercial and residential real-estate agency specializing in apartments, flats, commercial property, sales, rentals, and investment opportunities.
            </p>
            <div className="flex items-start gap-2 text-xs text-[#667085] pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#4A748C] shrink-0 mt-0.5" />
              <span>Zam Zam Mall, Block H-3, Johar Town Phase 2, Lahore, Pakistan</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#B89B5E] mb-5">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {[
                { id: 'home', label: 'Home' },
                { id: 'properties', label: 'Properties' },
                { id: 'apartments', label: 'Apartments' },
                { id: 'commercial', label: 'Commercial' },
                { id: 'rentals', label: 'Rentals' },
                { id: 'about', label: 'About & Gallery' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    id={`footer-nav-${item.id}`}
                    onClick={() => handleNav(item.id as ActivePage)}
                    className="text-xs text-[#667085] hover:text-white transition-colors duration-200 uppercase tracking-wider font-medium text-left focus:outline-hidden"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#B89B5E] mb-5">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-[#667085]">
                <User className="w-3.5 h-3.5 text-[#4A748C]" />
                <span className="text-[#F5F7F8] font-medium">{AGENCY_INFO.head}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#667085]">
                <Phone className="w-3.5 h-3.5 text-[#4A748C]" />
                <a
                  href={`tel:${AGENCY_INFO.phoneRaw}`}
                  className="hover:text-white transition-colors tracking-wide"
                >
                  {AGENCY_INFO.phoneDisplay}
                </a>
              </div>
              <p className="text-[11px] text-[#667085] leading-normal pt-1">
                Property enquiries, site visits, and consultation appointments during office hours.
              </p>
            </div>
          </div>

          {/* Column 4: Social */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#B89B5E] mb-5">
              Social
            </h4>
            <p className="text-xs text-[#667085] leading-relaxed mb-4">
              Stay connected with verified Lahore real estate updates.
            </p>
            {/* Clean horizontal row with only Facebook, Instagram, LinkedIn */}
            <div id="footer-social-icons" className="flex items-center gap-3">
              <a
                href={AGENCY_INFO.socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="360 Real Estate Facebook"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#667085] hover:text-white hover:border-[#4A748C] hover:bg-[#4A748C]/20 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={AGENCY_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="360 Real Estate Instagram"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#667085] hover:text-white hover:border-[#4A748C] hover:bg-[#4A748C]/20 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={AGENCY_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="360 Real Estate LinkedIn"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#667085] hover:text-white hover:border-[#4A748C] hover:bg-[#4A748C]/20 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom divider & copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#667085]">
          <p>© 2026 360 Real Estate &amp; Builder&apos;s. All Rights Reserved.</p>
          <p className="text-[11px] tracking-wider uppercase text-[#667085]">
            Commercial &amp; Residential Real Estate • Lahore
          </p>
        </div>
      </div>
    </footer>
  );
};
