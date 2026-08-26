import React, { useState, useMemo } from 'react';
import { Property } from '../types';
import { SignatureText } from '../components/SignatureText';
import { PropertyCard } from '../components/PropertyCard';
import { Building } from 'lucide-react';

interface ApartmentsPageProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
}

export const ApartmentsPage: React.FC<ApartmentsPageProps> = ({
  properties,
  onSelectProperty,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | '1BHK' | '2BED' | '3BED' | 'FURNISHED' | 'UNFURNISHED'>('all');

  const apartmentListings = useMemo(() => {
    return properties.filter((p) => {
      // Must be residential apartment or flat
      if (p.type !== 'Apartment' && p.type !== 'Flat') return false;

      if (activeCategory === '1BHK') return p.bedrooms === 1;
      if (activeCategory === '2BED') return p.bedrooms === 2;
      if (activeCategory === '3BED') return p.bedrooms === 3;
      if (activeCategory === 'FURNISHED') return p.furnishing === 'Furnished';
      if (activeCategory === 'UNFURNISHED') return p.furnishing === 'Unfurnished';

      return true;
    });
  }, [properties, activeCategory]);

  const verifiedLocations = [
    { name: 'Moon Heights', location: 'Block F, Johar Town Phase 1', units: '1BHK & 2BHK Luxury Units' },
    { name: 'The Springs Apartments Homes', location: 'Canal Road, Lahore', units: '2 Bed & 3 Bed Executive' },
    { name: 'Victoria Livings', location: 'Etihad Town Phase 1', units: '2 Bed & 3 Bed Penthouses' },
    { name: 'Zam Zam Mall', location: 'Block H-3, Johar Town Phase 2', units: 'Commercial & Executive Flats' },
  ];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-6">
        <SignatureText text="LIVE • INVEST • BELONG" variant="slate" size="sm" className="mx-auto" />
        <h1 className="text-3xl sm:text-4xl font-extrabold uppercase text-[#252525] tracking-tight">
          Apartments In Lahore
        </h1>
        <p className="text-sm text-[#667085]">
          Explore premium apartments and modern residential flats available for sale and rent across verified developments in Lahore.
        </p>
      </div>

      {/* Verified Developments Ribbon */}
      <section id="verified-developments-banner" className="bg-white border border-[#252525]/10 p-6 rounded-sm shadow-xs">
        <div className="flex items-center gap-2 mb-4 text-[#4A748C]">
          <Building className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#252525]">
            Featured Verified Developments
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {verifiedLocations.map((dev) => (
            <div
              key={dev.name}
              className="p-4 bg-[#F5F7F8] border border-[#252525]/5 rounded-xs space-y-1"
            >
              <h4 className="text-xs font-bold text-[#252525] uppercase tracking-wide">
                {dev.name}
              </h4>
              <p className="text-[11px] text-[#4A748C] font-medium">
                {dev.location}
              </p>
              <p className="text-[11px] text-[#667085]">
                {dev.units}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {[
          { id: 'all', label: 'All Apartments' },
          { id: '1BHK', label: '1BHK' },
          { id: '2BED', label: '2 Bed' },
          { id: '3BED', label: '3 Bed' },
          { id: 'FURNISHED', label: 'Furnished' },
          { id: 'UNFURNISHED', label: 'Unfurnished' },
        ].map((tab) => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-xs transition-all cursor-pointer ${
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

      {/* Apartment Listings Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-[#667085]">
          <span>
            Displaying <strong className="text-[#252525]">{apartmentListings.length}</strong> verified apartment residences
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apartmentListings.map((prop, idx) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              onSelect={onSelectProperty}
              index={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
