import React from 'react';
import { Property, ActivePage } from '../types';
import { SignatureText } from '../components/SignatureText';
import { PropertyCard } from '../components/PropertyCard';
import { ArrowRight, ChevronDown, Compass, Building2, MessageSquare, ShieldCheck, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface HomePageProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onNavigate: (page: ActivePage) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  properties,
  onSelectProperty,
  onNavigate,
}) => {
  const featuredProperties = properties.filter((p) => p.featured).slice(0, 3);

  const categories = [
    {
      title: 'APARTMENTS FOR SALE',
      description: 'Luxury 1BHK, 2 Bed & 3 Bed executive apartments with verified LDA approvals.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      action: () => onNavigate('apartments'),
    },
    {
      title: 'APARTMENTS FOR RENT',
      description: 'Fully furnished and unfurnished high-yield residences across Johar Town & Canal Road.',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      action: () => onNavigate('rentals'),
    },
    {
      title: 'FLATS FOR SALE',
      description: 'Brand new residential units and family apartments ready for custom interior styling.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      action: () => onNavigate('apartments'),
    },
    {
      title: 'COMMERCIAL PROPERTY',
      description: 'Prime retail shops, corporate office floors, factories, and commercial land plots.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      action: () => onNavigate('commercial'),
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* 1. CINEMATIC HERO SECTION (80vh desktop) */}
      <section
        id="hero-section"
        className="relative min-h-[82vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#252525]"
      >
        {/* Cinematic Backdrop Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Lahore Luxury Architecture"
            className="w-full h-full object-cover object-center brightness-60 scale-102 transition-transform duration-1000"
          />
          {/* Subtle gradient vignette to guarantee readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#252525] via-[#252525]/50 to-[#252525]/75" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-7">
          {/* Animated Signature phrase */}
          <div className="flex justify-center">
            <SignatureText
              text="PROPERTY • SALES • RENTALS • INVESTMENT"
              variant="gold"
              size="sm"
            />
          </div>

          {/* Main Headline with high contrast */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-[1.12]"
          >
            Find The Right Property In Lahore
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-[#F5F7F8]/85 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Explore apartments, flats, commercial properties, and investment opportunities with 360 Real Estate &amp; Builder&apos;s.
          </motion.p>

          {/* Clean Primary & Secondary CTA actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              id="hero-explore-btn"
              onClick={() => onNavigate('properties')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#4A748C] hover:bg-[#37576B] text-white text-xs font-bold uppercase tracking-widest rounded-xs transition-all shadow-md cursor-pointer"
            >
              Explore Properties
            </button>

            <button
              id="hero-learn-more-btn"
              onClick={() => onNavigate('about')}
              className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-widest rounded-xs backdrop-blur-xs transition-all cursor-pointer"
            >
              Learn More
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/50 text-[10px] tracking-widest uppercase">
          <span className="mb-1">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* 2. PROPERTY CATEGORY SECTION */}
      <section id="categories-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <SignatureText text="FIND YOUR PLACE" variant="slate" size="sm" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] uppercase tracking-tight">
              Explore Property
            </h2>
            <p className="text-sm text-[#667085] max-w-lg">
              Discover residential and commercial property opportunities across Lahore.
            </p>
          </div>
        </div>

        {/* 4 Image-Led Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              id={`category-card-${idx}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative bg-white border border-[#252525]/10 rounded-sm overflow-hidden flex flex-col justify-between luxury-card"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-[#252525]/5">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#252525] mb-2 group-hover:text-[#4A748C] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#667085] leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>

                <button
                  onClick={cat.action}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#4A748C] hover:text-[#252525] transition-colors pt-2 group-hover:translate-x-1 duration-200 cursor-pointer"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES (3-Column Layout) */}
      <section id="featured-properties-section" className="bg-white py-16 sm:py-20 border-y border-[#252525]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <SignatureText text="PROPERTY WITH PURPOSE" variant="slate" size="sm" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] uppercase tracking-tight">
                Featured Property Opportunities
              </h2>
              <p className="text-sm text-[#667085] max-w-lg">
                Curated residential apartments, executive suites, and prime commercial developments.
              </p>
            </div>

            <button
              onClick={() => onNavigate('properties')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#4A748C] hover:text-[#252525] transition-colors cursor-pointer"
            >
              <span>View All Properties</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((prop, idx) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onSelect={onSelectProperty}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. MUHAMMAD YOUNUS SECTION */}
      <section id="contact-profile-section" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#252525]/10 p-8 sm:p-12 rounded-sm relative overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4A748C]/10 text-[#4A748C] rounded-xs text-[11px] font-bold uppercase tracking-widest">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Property Contact</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#252525] tracking-tight uppercase">
                Muhammad Younus
              </h2>

              <p className="text-sm sm:text-base text-[#667085] leading-relaxed max-w-xl">
                Property sales, rental and real-estate enquiries in Lahore. Direct consultation for Moon Heights, The Springs, Aman Plaza, Victoria Livings, and industrial properties.
              </p>

              <div className="pt-2">
                <button
                  id="younus-contact-btn"
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#4A748C] hover:bg-[#37576B] text-white text-xs font-bold uppercase tracking-widest rounded-xs transition-colors cursor-pointer"
                >
                  <span>Contact</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-center md:justify-end">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-[#F5F7F8] bg-[#4A748C]/10 flex flex-col items-center justify-center p-4 text-center shadow-inner">
                <span className="text-2xl font-black text-[#4A748C] tracking-tighter font-sans">
                  360
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#252525] mt-1">
                  Lahore Realty
                </span>
                <span className="text-[9px] text-[#667085] mt-0.5">
                  Johar Town Phase 2
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY 360 SECTION (4-Column Layout) */}
      <section id="why-360-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <SignatureText text="SMART PROPERTY MOVES" variant="slate" size="sm" className="mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] uppercase tracking-tight">
            Why 360 Real Estate
          </h2>
          <p className="text-xs text-[#667085]">
            Built on transparent market intelligence, verified project approvals, and client-first representation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 border border-[#252525]/10 rounded-sm space-y-3">
            <Compass className="w-5 h-5 text-[#4A748C]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#252525]">
              Local Property Knowledge
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Deep, nuanced mastery of Johar Town, Canal Road, Etihad Town, and Thokar Niaz Baig commercial zones.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#252525]/10 rounded-sm space-y-3">
            <Building2 className="w-5 h-5 text-[#4A748C]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#252525]">
              Residential &amp; Commercial
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Comprehensive portfolio ranging from 1BHK executive flats to heavy industrial warehouse facilities.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#252525]/10 rounded-sm space-y-3">
            <MessageSquare className="w-5 h-5 text-[#4A748C]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#252525]">
              Clear Communication
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Transparent documentation, direct pricing clarity, and genuine title verification before transactions.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#252525]/10 rounded-sm space-y-3">
            <ShieldCheck className="w-5 h-5 text-[#4A748C]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#252525]">
              Property-Focused Service
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Tailored client advocacy whether securing a high-yield rental tenant or acquiring prime development land.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FINAL HOME CTA (Full-Width Slate Blue Section) */}
      <section id="final-cta-section" className="bg-[#4A748C] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <SignatureText text="YOUR NEXT ADDRESS" variant="white" size="sm" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight">
            Ready to explore your options?
          </h2>

          <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto leading-relaxed">
            Discover property opportunities in Lahore with 360 Real Estate &amp; Builder&apos;s.
          </p>

          <div className="pt-2">
            <button
              id="final-cta-view-properties-btn"
              onClick={() => onNavigate('properties')}
              className="px-8 py-3.5 bg-white hover:bg-[#F5F7F8] text-[#252525] text-xs font-bold uppercase tracking-widest rounded-xs transition-colors shadow-lg cursor-pointer"
            >
              View Properties
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
