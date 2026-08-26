import React, { useState, useMemo } from 'react';
import { Property } from '../types';
import { SignatureText } from '../components/SignatureText';
import { PropertyCard } from '../components/PropertyCard';
import { Key } from 'lucide-react';

interface RentalsPageProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
}

export const RentalsPage: React.FC<RentalsPageProps> = ({
  properties,
  onSelectProperty,
}) => {
  const [rentalTab, setRentalTab] = useState<'all' | '1BHK' | '2BED' | '3BED' | 'FURNISHED' | 'UNFURNISHED' | 'COMMERCIAL'>('all');

  const rentalListings = useMemo(() => {
    return properties.filter((p) => {
      // Must be rent purpose
      if (p.purpose !== 'rent') return false;

      if (rentalTab === '1BHK') return p.bedrooms === 1;
      if (rentalTab === '2BED') return p.bedrooms === 2;
      if (rentalTab === '3BED') return p.bedrooms === 3;
      if (rentalTab === 'FURNISHED') return p.furnishing === 'Furnished';
      if (rentalTab === 'UNFURNISHED') return p.furnishing === 'Unfurnished';
      if (rentalTab === 'COMMERCIAL') return ['Shop', 'Office', 'Factory', 'Building'].includes(p.type);

      return true;
    });
  }, [properties, rentalTab]);

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Page Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-6">
        <SignatureText text="FIND YOUR NEXT SPACE" variant="slate" size="sm" className="mx-auto" />
        <h1 className="text-3xl sm:text-4xl font-extrabold uppercase text-[#252525] tracking-tight">
          Property For Rent In Lahore
        </h1>
        <p className="text-sm text-[#667085]">
          Explore furnished and unfurnished residential flats and prime commercial rental opportunities across Johar Town, Canal Road, and surrounding prime sectors.
        </p>
      </div>

      {/* Rental Benefits Bar */}
      <div className="bg-white border border-[#252525]/10 p-6 rounded-sm grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-[#4A748C]/10 text-[#4A748C] rounded-xs shrink-0">
            <Key className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold uppercase text-[#252525] mb-1">
              Move-In Ready
            </h4>
            <p className="text-[#667085] leading-relaxed">
              Curated fully furnished 1BHK and 2 Bed flats with continuous generator backup.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-[#4A748C]/10 text-[#4A748C] rounded-xs shrink-0">
            <Key className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold uppercase text-[#252525] mb-1">
              Transparent Tenancy
            </h4>
            <p className="text-[#667085] leading-relaxed">
              Standardized legal lease contracts, clear maintenance terms, and direct owner coordination.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-[#4A748C]/10 text-[#4A748C] rounded-xs shrink-0">
            <Key className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold uppercase text-[#252525] mb-1">
              Commercial Leases
            </h4>
            <p className="text-[#667085] leading-relaxed">
              Retail shops in Zam Zam Mall and corporate office suites ready for immediate operations.
            </p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {[
          { id: 'all', label: 'All Rentals' },
          { id: '1BHK', label: '1BHK' },
          { id: '2BED', label: '2 Bed' },
          { id: '3BED', label: '3 Bed' },
          { id: 'FURNISHED', label: 'Furnished' },
          { id: 'UNFURNISHED', label: 'Unfurnished' },
          { id: 'COMMERCIAL', label: 'Commercial' },
        ].map((tab) => {
          const isActive = rentalTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setRentalTab(tab.id as any)}
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

      {/* Rental Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-[#667085]">
          <span>
            Displaying <strong className="text-[#252525]">{rentalListings.length}</strong> rental spaces
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rentalListings.map((prop, idx) => (
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
