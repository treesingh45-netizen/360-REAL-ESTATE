import React, { useState, useMemo } from 'react';
import { Property, PropertyType, PropertyPurpose } from '../types';
import { SignatureText } from '../components/SignatureText';
import { PropertyCard } from '../components/PropertyCard';
import { Filter, RotateCcw } from 'lucide-react';

interface PropertiesPageProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  properties,
  onSelectProperty,
}) => {
  const [purposeFilter, setPurposeFilter] = useState<'all' | PropertyPurpose>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | PropertyType>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [bedroomFilter, setBedroomFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        if (purposeFilter !== 'all' && p.purpose !== purposeFilter) return false;
        if (typeFilter !== 'all' && p.type !== typeFilter) return false;
        if (locationFilter !== 'all' && p.areaLocation !== locationFilter) return false;
        if (bedroomFilter !== 'all') {
          const bCount = parseInt(bedroomFilter, 10);
          if (bCount === 4) {
            if (!p.bedrooms || p.bedrooms < 4) return false;
          } else {
            if (p.bedrooms !== bCount) return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortOrder === 'price-asc') return a.numericPrice - b.numericPrice;
        if (sortOrder === 'price-desc') return b.numericPrice - a.numericPrice;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [properties, purposeFilter, typeFilter, locationFilter, bedroomFilter, sortOrder]);

  const handleReset = () => {
    setPurposeFilter('all');
    setTypeFilter('all');
    setLocationFilter('all');
    setBedroomFilter('all');
    setSortOrder('featured');
  };

  const hasActiveFilters =
    purposeFilter !== 'all' ||
    typeFilter !== 'all' ||
    locationFilter !== 'all' ||
    bedroomFilter !== 'all';

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Page Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-6">
        <SignatureText text="FIND • COMPARE • DISCOVER" variant="slate" size="sm" className="mx-auto" />
        <h1 className="text-3xl sm:text-4xl font-extrabold uppercase text-[#252525] tracking-tight">
          Property Listings
        </h1>
        <p className="text-sm text-[#667085]">
          Browse selected residential and commercial properties available for sale and rent in Lahore.
        </p>
      </div>

      {/* Filter Bar */}
      <section id="property-filter-panel" className="bg-white border border-[#252525]/10 p-5 sm:p-6 rounded-sm shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#252525]/10">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#4A748C]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#252525]">
              Filter Properties
            </span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#4A748C] hover:text-[#252525] uppercase tracking-wider transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
          {/* 1. Purpose */}
          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#667085] mb-1">
              Purpose
            </label>
            <select
              value={purposeFilter}
              onChange={(e) => setPurposeFilter(e.target.value as any)}
              className="w-full bg-[#F5F7F8] border border-[#252525]/10 px-3 py-2 text-xs font-medium text-[#252525] rounded-xs focus:outline-hidden focus:border-[#4A748C]"
            >
              <option value="all">All (Buy &amp; Rent)</option>
              <option value="sale">For Sale (Buy)</option>
              <option value="rent">For Rent</option>
            </select>
          </div>

          {/* 2. Property Type */}
          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#667085] mb-1">
              Property Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="w-full bg-[#F5F7F8] border border-[#252525]/10 px-3 py-2 text-xs font-medium text-[#252525] rounded-xs focus:outline-hidden focus:border-[#4A748C]"
            >
              <option value="all">All Property Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Flat">Flat</option>
              <option value="Shop">Shop / Retail</option>
              <option value="Office">Corporate Office</option>
              <option value="Factory">Factory / Industrial</option>
              <option value="Building">Commercial Building</option>
              <option value="Plot">Commercial Land / Plot</option>
            </select>
          </div>

          {/* 3. Location */}
          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#667085] mb-1">
              Location
            </label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full bg-[#F5F7F8] border border-[#252525]/10 px-3 py-2 text-xs font-medium text-[#252525] rounded-xs focus:outline-hidden focus:border-[#4A748C]"
            >
              <option value="all">All Locations</option>
              <option value="Johar Town">Johar Town</option>
              <option value="Canal Road">Canal Road</option>
              <option value="Etihad Town">Etihad Town</option>
              <option value="Thokar Niaz Baig">Thokar Niaz Baig</option>
              <option value="Other Lahore Locations">Other Lahore Locations</option>
            </select>
          </div>

          {/* 4. Bedrooms */}
          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#667085] mb-1">
              Bedrooms
            </label>
            <select
              value={bedroomFilter}
              onChange={(e) => setBedroomFilter(e.target.value)}
              className="w-full bg-[#F5F7F8] border border-[#252525]/10 px-3 py-2 text-xs font-medium text-[#252525] rounded-xs focus:outline-hidden focus:border-[#4A748C]"
            >
              <option value="all">Any Bedrooms</option>
              <option value="1">1 Bedroom (1BHK)</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
            </select>
          </div>

          {/* 5. Sort */}
          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#667085] mb-1">
              Sort By
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="w-full bg-[#F5F7F8] border border-[#252525]/10 px-3 py-2 text-xs font-medium text-[#252525] rounded-xs focus:outline-hidden focus:border-[#4A748C]"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#667085] px-1">
        <span>
          Showing <strong className="text-[#252525]">{filteredProperties.length}</strong> verified properties
        </span>
        {hasActiveFilters && (
          <span className="text-[11px] text-[#4A748C] font-semibold">
            Filtered View
          </span>
        )}
      </div>

      {/* Listing Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((prop, idx) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              onSelect={onSelectProperty}
              index={idx}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-[#252525]/10 rounded-sm space-y-3">
          <p className="text-sm font-bold text-[#252525]">
            No properties matched your exact filter criteria.
          </p>
          <p className="text-xs text-[#667085]">
            Try adjusting your location or type selection to browse available inventory.
          </p>
          <button
            onClick={handleReset}
            className="px-5 py-2 bg-[#4A748C] text-white text-xs font-bold uppercase tracking-widest rounded-xs"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
