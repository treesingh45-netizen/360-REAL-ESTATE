import React from 'react';
import { Property } from '../types';
import { motion } from 'motion/react';
import { ArrowRight, MapPin, Maximize2, Bed, Bath, Sparkles } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  index?: number;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  index = 0,
}) => {
  const isArchived = property.status.includes('ARCHIVED');
  const isRent = property.purpose === 'rent';

  return (
    <motion.article
      id={`property-card-${property.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group bg-white border border-[#252525]/10 rounded-sm overflow-hidden flex flex-col h-full luxury-card"
    >
      {/* Property Image Container */}
      <div className="relative aspect-16/10 overflow-hidden bg-[#252525]/5">
        <img
          src={property.images[0]}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Status Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span
            className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-xs backdrop-blur-md shadow-xs ${
              isArchived
                ? 'bg-[#252525]/90 text-[#F5F7F8] border border-white/20'
                : isRent
                ? 'bg-[#4A748C]/95 text-white'
                : 'bg-[#252525]/90 text-white'
            }`}
          >
            {isArchived
              ? 'ARCHIVED / VERIFY'
              : isRent
              ? 'FOR RENT'
              : 'FOR SALE'}
          </span>

          {property.categoryTag && (
            <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-1 bg-white/90 text-[#252525] backdrop-blur-xs">
              {property.categoryTag}
            </span>
          )}
        </div>

        {/* Subtle quick view overlay on hover */}
        <button
          onClick={() => onSelect(property)}
          className="absolute inset-0 bg-[#252525]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
          aria-label={`View details for ${property.title}`}
        >
          <span className="px-4 py-2 bg-white/95 text-[#252525] text-xs font-bold uppercase tracking-widest rounded-xs shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            View Details
          </span>
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
        <div>
          {/* Price */}
          <div className="mb-2">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-[#252525] tracking-tight">
                {property.price}
              </span>
              {property.pricePeriod && (
                <span className="text-xs text-[#667085] font-medium">
                  {property.pricePeriod}
                </span>
              )}
            </div>
            {property.priceNote && (
              <p className="text-[11px] text-[#667085] line-clamp-1">
                {property.priceNote}
              </p>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-[#252525] tracking-tight group-hover:text-[#4A748C] transition-colors line-clamp-1 mb-1.5">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-start gap-1.5 text-xs text-[#667085] mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#4A748C] shrink-0 mt-0.5" />
            <span className="line-clamp-1">{property.location}</span>
          </div>

          {/* Key Details / Specifications Bar */}
          <div className="grid grid-cols-2 gap-2 py-3 border-y border-[#252525]/10 text-xs text-[#667085] mb-4">
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-[#4A748C]" />
              <span className="truncate">{property.areaSize}</span>
            </div>

            {property.bedrooms !== undefined && property.bedrooms > 0 ? (
              <div className="flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-[#4A748C]" />
                <span>
                  {property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#4A748C]" />
                <span className="truncate">{property.type}</span>
              </div>
            )}

            {property.bathrooms !== undefined && property.bathrooms > 0 && (
              <div className="flex items-center gap-1.5">
                <Bath className="w-3.5 h-3.5 text-[#4A748C]" />
                <span>
                  {property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}
                </span>
              </div>
            )}

            {property.furnishing && property.furnishing !== 'N/A' && (
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-[#252525] font-medium truncate">
                  {property.furnishing}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Action: Simple Editorial Text Link */}
        <div className="pt-2">
          <button
            id={`btn-view-details-${property.id}`}
            onClick={() => onSelect(property)}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#4A748C] hover:text-[#252525] transition-colors group/btn cursor-pointer"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.article>
  );
};
