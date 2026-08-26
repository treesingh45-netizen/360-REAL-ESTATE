import React, { useState, useMemo } from 'react';
import { GalleryItem } from '../types';
import { GALLERY_ITEMS, AGENCY_INFO } from '../data/properties';
import { SignatureText } from '../components/SignatureText';
import { Lightbox } from '../components/Lightbox';
import { Facebook, Instagram, Linkedin, MapPin, Maximize2 } from 'lucide-react';
import { motion } from 'motion/react';

export const AboutGalleryPage: React.FC = () => {
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('ALL');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const filteredGallery = useMemo(() => {
    if (selectedGalleryCategory === 'ALL') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === selectedGalleryCategory);
  }, [selectedGalleryCategory]);

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      {/* 1. ABOUT 360 SECTION */}
      <section id="about-section" className="space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3 pt-6">
          <SignatureText text="ABOUT 360" variant="slate" size="sm" className="mx-auto" />
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase text-[#252525] tracking-tight">
            Real Estate With A Local Focus
          </h1>
          <p className="text-base sm:text-lg text-[#667085] leading-relaxed max-w-2xl mx-auto">
            360 Real Estate &amp; Builder&apos;s is a Lahore-based real-estate agency focused on residential, commercial, sales, rental, and investment property opportunities.
          </p>
        </div>

        {/* 3 Minimal Value Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Value 1: Clarity */}
          <div className="bg-white p-8 border border-[#252525]/10 rounded-sm relative group luxury-card">
            <div className="w-12 h-0.5 bg-[#4A748C] mb-6 group-hover:w-20 transition-all duration-300" />
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#252525] mb-3">
              Clarity
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              We eliminate ambiguity from property acquisitions. From clear title verifications and LDA permissions to transparent pricing without hidden brokerage friction.
            </p>
          </div>

          {/* Value 2: Property Knowledge */}
          <div className="bg-white p-8 border border-[#252525]/10 rounded-sm relative group luxury-card">
            <div className="w-12 h-0.5 bg-[#4A748C] mb-6 group-hover:w-20 transition-all duration-300" />
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#252525] mb-3">
              Property Knowledge
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Decades of hyper-local insight across Johar Town, Canal Road corridor, Etihad Town, and Thokar industrial sectors ensure our clients invest ahead of urbanization trends.
            </p>
          </div>

          {/* Value 3: Direct Communication */}
          <div className="bg-white p-8 border border-[#252525]/10 rounded-sm relative group luxury-card">
            <div className="w-12 h-0.5 bg-[#4A748C] mb-6 group-hover:w-20 transition-all duration-300" />
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#252525] mb-3">
              Direct Communication
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              You work directly with experienced property advisors. We respect your time with concise updates, factual market comparisons, and personalized property tours.
            </p>
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL MASONRY GALLERY */}
      <section id="gallery-section" className="space-y-10 pt-6 border-t border-[#252525]/10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <SignatureText text="SPACE TO GROW" variant="slate" size="sm" className="mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#252525] tracking-tight">
            Architectural &amp; Property Gallery
          </h2>
          <p className="text-xs text-[#667085]">
            Explore curated photography of residences, executive commercial towers, and Lahore cityscape developments.
          </p>
        </div>

        {/* Gallery Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {[
            { id: 'ALL', label: 'All Photos' },
            { id: 'APARTMENTS', label: 'Apartments' },
            { id: 'FLATS', label: 'Flats' },
            { id: 'COMMERCIAL', label: 'Commercial' },
            { id: 'INTERIORS', label: 'Interiors' },
            { id: 'PROJECTS', label: 'Projects' },
            { id: 'LAHORE', label: 'Lahore' },
          ].map((tab) => {
            const isActive = selectedGalleryCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedGalleryCategory(tab.id)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#4A748C] text-white shadow-xs'
                    : 'bg-white border border-[#252525]/10 text-[#252525] hover:border-[#4A748C]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (idx % 3) * 0.1 }}
              onClick={() => setActiveLightboxItem(item)}
              className="group relative bg-white border border-[#252525]/10 rounded-sm overflow-hidden cursor-pointer shadow-xs luxury-card aspect-4/3 sm:aspect-16/11"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
              />

              {/* Hover overlay with title & location */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#252525]/90 via-[#252525]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B89B5E] mb-1">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold tracking-tight mb-1">
                  {item.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-white/80">
                  <MapPin className="w-3 h-3 text-[#4A748C]" />
                  <span>{item.location}</span>
                </div>
                <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-xs rounded-full">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. SOCIAL MEDIA SECTION (Dedicated & Tasteful) */}
      <section id="social-media-section" className="bg-[#252525] text-white p-8 sm:p-12 rounded-sm shadow-md text-center space-y-6">
        <div className="max-w-xl mx-auto space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#B89B5E]">
            Stay Connected
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white">
            Follow 360 Real Estate &amp; Builder&apos;s
          </h2>
          <p className="text-xs text-[#667085] max-w-md mx-auto">
            Stay connected with property updates, architectural milestones, and new opportunities in Lahore.
          </p>
        </div>

        {/* 3 Verified Social Icons */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <a
            href={AGENCY_INFO.socials.facebook}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 px-5 py-2.5 bg-white/5 hover:bg-white/15 border border-white/10 rounded-xs text-xs font-semibold uppercase tracking-wider text-white transition-colors"
          >
            <Facebook className="w-4 h-4 text-[#4A748C]" />
            <span>Facebook</span>
          </a>

          <a
            href={AGENCY_INFO.socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 px-5 py-2.5 bg-white/5 hover:bg-white/15 border border-white/10 rounded-xs text-xs font-semibold uppercase tracking-wider text-white transition-colors"
          >
            <Instagram className="w-4 h-4 text-[#4A748C]" />
            <span>Instagram</span>
          </a>

          <a
            href={AGENCY_INFO.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 px-5 py-2.5 bg-white/5 hover:bg-white/15 border border-white/10 rounded-xs text-xs font-semibold uppercase tracking-wider text-white transition-colors"
          >
            <Linkedin className="w-4 h-4 text-[#4A748C]" />
            <span>LinkedIn</span>
          </a>
        </div>
      </section>

      {/* Fullscreen Lightbox */}
      <Lightbox
        item={activeLightboxItem}
        items={filteredGallery}
        onClose={() => setActiveLightboxItem(null)}
        onSelect={(item) => setActiveLightboxItem(item)}
      />
    </div>
  );
};
