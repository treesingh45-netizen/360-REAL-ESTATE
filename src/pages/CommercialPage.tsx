import React, { useState, useMemo } from 'react';
import { Property } from '../types';
import { SignatureText } from '../components/SignatureText';
import { PropertyCard } from '../components/PropertyCard';
import { Factory, MapPin, Maximize2, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CommercialPageProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
}

export const CommercialPage: React.FC<CommercialPageProps> = ({
  properties,
  onSelectProperty,
}) => {
  const [commercialTab, setCommercialTab] = useState<'all' | 'OFFICES' | 'SHOPS' | 'FACTORIES' | 'BUILDINGS' | 'LAND'>('all');

  // Find the featured 5 Kanal factory
  const featuredFactory = properties.find((p) => p.id === 'prop-factory-thokar-5kanal');

  const commercialListings = useMemo(() => {
    return properties.filter((p) => {
      // Must be commercial type
      const isComm = ['Shop', 'Office', 'Factory', 'Building', 'Plot', 'Commercial'].includes(p.type);
      if (!isComm) return false;

      if (commercialTab === 'OFFICES') return p.type === 'Office';
      if (commercialTab === 'SHOPS') return p.type === 'Shop';
      if (commercialTab === 'FACTORIES') return p.type === 'Factory';
      if (commercialTab === 'BUILDINGS') return p.type === 'Building';
      if (commercialTab === 'LAND') return p.type === 'Plot';

      return true;
    });
  }, [properties, commercialTab]);

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Page Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-6">
        <SignatureText text="BUSINESS • SPACE • OPPORTUNITY" variant="slate" size="sm" className="mx-auto" />
        <h1 className="text-3xl sm:text-4xl font-extrabold uppercase text-[#252525] tracking-tight">
          Commercial Property In Lahore
        </h1>
        <p className="text-sm text-[#667085]">
          Prime commercial real estate portfolio including offices, retail shops, industrial factories, plaza buildings, and strategic commercial land.
        </p>
      </div>

      {/* COMMERCIAL FEATURE: 5 KANAL FACTORY SHOWCASE */}
      {featuredFactory && (
        <section
          id="featured-commercial-factory"
          className="bg-white border border-[#252525]/15 rounded-sm overflow-hidden shadow-md"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Image Showcase */}
            <div className="lg:col-span-7 relative aspect-16/10 lg:aspect-auto min-h-[340px] bg-[#252525]">
              <img
                src={featuredFactory.images[0]}
                alt="5 Kanal Factory Thokar Niaz Baig"
                className="w-full h-full object-cover brightness-90"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="bg-[#252525]/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-xs backdrop-blur-xs border border-white/20">
                  Featured Commercial
                </span>
                <span className="bg-amber-800/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-xs backdrop-blur-xs flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" />
                  ARCHIVED / VERIFY AVAILABILITY
                </span>
              </div>
            </div>

            {/* Right Information Specification Box */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4A748C]">
                    Industrial Property Showcase
                  </span>
                  <h3 className="text-2xl font-bold uppercase text-[#252525] tracking-tight mt-1">
                    Factory For Sale
                  </h3>
                  <div className="flex items-start gap-1.5 text-xs text-[#667085] mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#4A748C] shrink-0 mt-0.5" />
                    <span>Main Katar Bund Road, Thokar Niaz Baig, Lahore</span>
                  </div>
                </div>

                {/* Key Spec Grid */}
                <div className="grid grid-cols-2 gap-3 py-4 border-y border-[#252525]/10 text-xs">
                  <div>
                    <span className="text-[#667085] uppercase tracking-wider block text-[10px] font-semibold">
                      Land Area
                    </span>
                    <span className="font-bold text-[#252525] text-sm">5 Kanal</span>
                  </div>
                  <div>
                    <span className="text-[#667085] uppercase tracking-wider block text-[10px] font-semibold">
                      Road Width
                    </span>
                    <span className="font-bold text-[#252525] text-sm">70 Ft Road</span>
                  </div>
                  <div>
                    <span className="text-[#667085] uppercase tracking-wider block text-[10px] font-semibold">
                      Frontage
                    </span>
                    <span className="font-bold text-[#252525] text-sm">Approx. 100 Ft Front</span>
                  </div>
                  <div>
                    <span className="text-[#667085] uppercase tracking-wider block text-[10px] font-semibold">
                      Listed Price
                    </span>
                    <span className="font-bold text-[#252525] text-sm">PKR 15.50 Crore</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-[#667085] leading-relaxed">
                    Heavy industrial container accessible infrastructure on Main Katar Bund Road with dedicated boundary wall, warehouse sheds, and three-phase industrial transformer.
                  </p>
                  <p className="text-[11px] font-semibold text-[#B89B5E]">
                    Note: Listed price is slightly negotiable. Verified documents available on consultation.
                  </p>
                </div>
              </div>

              <div>
                <button
                  id="btn-view-featured-factory"
                  onClick={() => onSelectProperty(featuredFactory)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#4A748C] hover:bg-[#37576B] text-white text-xs font-bold uppercase tracking-widest rounded-xs transition-colors cursor-pointer"
                >
                  <span>View Full Factory Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Commercial Categories Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-4">
        {[
          { id: 'all', label: 'All Commercial' },
          { id: 'OFFICES', label: 'Offices' },
          { id: 'SHOPS', label: 'Shops' },
          { id: 'FACTORIES', label: 'Factories' },
          { id: 'BUILDINGS', label: 'Commercial Buildings' },
          { id: 'LAND', label: 'Commercial Land' },
        ].map((tab) => {
          const isActive = commercialTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCommercialTab(tab.id as any)}
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

      {/* Commercial Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-[#667085]">
          <span>
            Showing <strong className="text-[#252525]">{commercialListings.length}</strong> commercial opportunities
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {commercialListings.map((prop, idx) => (
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
