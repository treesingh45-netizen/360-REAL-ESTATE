import React, { useState } from 'react';
import { Property, EnquirySubmission } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Maximize2, Bed, Bath, CheckCircle2, ShieldCheck, Send, Check } from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onEnquireSuccess?: (data: EnquirySubmission) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  onEnquireSuccess,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!property) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const submission: EnquirySubmission = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      propertyRequirement: `${property.title} (${property.location})`,
      preferredLocation: property.areaLocation,
      message: formData.message || `I am interested in ${property.title} listed at ${property.price}.`,
      propertyName: property.title,
    };

    setIsSubmitted(true);
    if (onEnquireSuccess) {
      onEnquireSuccess(submission);
    }
  };

  const isArchived = property.status.includes('ARCHIVED');

  return (
    <AnimatePresence>
      <div
        id="property-detail-overlay"
        className="fixed inset-0 z-50 overflow-y-auto bg-[#252525]/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 lg:p-8"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          id="property-detail-modal"
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white w-full max-w-5xl rounded-sm shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Top Bar with Close Button */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#252525]/10 bg-white sticky top-0 z-20">
            <div className="flex items-center gap-2">
              <span
                className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xs ${
                  isArchived
                    ? 'bg-[#252525] text-white'
                    : property.purpose === 'rent'
                    ? 'bg-[#4A748C] text-white'
                    : 'bg-[#252525] text-white'
                }`}
              >
                {property.status}
              </span>
              {property.projectReference && (
                <span className="text-xs font-semibold text-[#4A748C] uppercase tracking-wider">
                  {property.projectReference}
                </span>
              )}
            </div>

            <button
              id="close-property-detail-btn"
              onClick={onClose}
              className="p-2 text-[#667085] hover:text-[#252525] hover:bg-[#F5F7F8] rounded-full transition-colors focus:outline-hidden"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
            {/* Gallery Section */}
            <div className="space-y-3">
              <div className="relative aspect-16/9 sm:aspect-21/9 w-full bg-[#252525]/5 rounded-sm overflow-hidden border border-[#252525]/10">
                <img
                  src={property.images[activeImageIdx] || property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>

              {/* Thumbnails */}
              {property.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {property.images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative w-20 h-14 sm:w-24 sm:h-16 shrink-0 rounded-xs overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIdx === idx
                          ? 'border-[#4A748C] opacity-100'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Preview thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Header info & Price */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#252525]/10">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#252525] tracking-tight">
                  {property.title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-[#667085]">
                  <MapPin className="w-4 h-4 text-[#4A748C] shrink-0" />
                  <span>{property.location}</span>
                </div>
              </div>

              <div className="md:text-right bg-[#F5F7F8] md:bg-transparent p-4 md:p-0 rounded-xs">
                <span className="text-xs uppercase tracking-widest text-[#667085] block font-semibold mb-1">
                  {property.purpose === 'rent' ? 'Monthly Rental' : 'Listed Price'}
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                  {property.price}
                  {property.pricePeriod && (
                    <span className="text-sm font-normal text-[#667085] ml-1">
                      {property.pricePeriod}
                    </span>
                  )}
                </div>
                {property.priceNote && (
                  <span className="text-xs text-[#4A748C] font-medium block mt-1">
                    {property.priceNote}
                  </span>
                )}
              </div>
            </div>

            {/* Key Specs Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#F5F7F8] rounded-sm border border-[#252525]/5">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
                  Covered Area
                </span>
                <div className="flex items-center gap-2 text-sm font-bold text-[#252525]">
                  <Maximize2 className="w-4 h-4 text-[#4A748C]" />
                  <span>{property.areaSize}</span>
                </div>
              </div>

              {property.bedrooms !== undefined && (
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
                    Bedrooms
                  </span>
                  <div className="flex items-center gap-2 text-sm font-bold text-[#252525]">
                    <Bed className="w-4 h-4 text-[#4A748C]" />
                    <span>{property.bedrooms > 0 ? property.bedrooms : 'Commercial'}</span>
                  </div>
                </div>
              )}

              {property.bathrooms !== undefined && (
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
                    Bathrooms
                  </span>
                  <div className="flex items-center gap-2 text-sm font-bold text-[#252525]">
                    <Bath className="w-4 h-4 text-[#4A748C]" />
                    <span>{property.bathrooms}</span>
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
                  Furnishing
                </span>
                <div className="flex items-center gap-2 text-sm font-bold text-[#252525]">
                  <ShieldCheck className="w-4 h-4 text-[#4A748C]" />
                  <span>{property.furnishing}</span>
                </div>
              </div>
            </div>

            {/* Description & Specifications Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Description & Highlights */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#4A748C] mb-3">
                    Property Overview
                  </h4>
                  <p className="text-sm sm:text-base text-[#252525]/85 leading-relaxed">
                    {property.description}
                  </p>
                </div>

                {property.highlights.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#4A748C] mb-3">
                      Key Highlights &amp; Features
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {property.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-[#252525] bg-[#F5F7F8] p-2.5 rounded-xs"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#4A748C] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Column: Verified Specifications */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white border border-[#252525]/10 p-5 rounded-sm">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#252525] mb-4 pb-2 border-b border-[#252525]/10">
                    Verified Specifications
                  </h4>
                  <dl className="space-y-2.5 text-xs">
                    {Object.entries(property.specifications).map(([key, val]) => (
                      <div key={key} className="flex justify-between items-baseline gap-2">
                        <dt className="text-[#667085] font-medium">{key}:</dt>
                        <dd className="font-semibold text-[#252525] text-right">{val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            {/* Simple Enquiry Section at the bottom */}
            <div id="property-enquiry-section" className="bg-[#F5F7F8] border border-[#252525]/10 p-6 sm:p-8 rounded-sm">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4A748C]">
                    Direct Property Enquiry
                  </span>
                  <h3 className="text-xl font-bold text-[#252525] tracking-tight mt-1">
                    Request Details for {property.title}
                  </h3>
                  <p className="text-xs text-[#667085] mt-1">
                    Submit your contact details and our team will provide full verification and schedule an on-site visit.
                  </p>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-white border border-[#4A748C]/30 rounded-xs text-center space-y-2"
                  >
                    <div className="w-10 h-10 bg-[#4A748C]/10 text-[#4A748C] rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-5 h-5" />
                    </div>
                    <p className="text-base font-bold text-[#252525]">
                      Thank you. Your enquiry has been received.
                    </p>
                    <p className="text-xs text-[#667085]">
                      Muhammad Younus or an authorized 360 representative will contact you shortly regarding {property.title}.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#252525] mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Tariq Mehmood"
                          className="w-full bg-white border border-[#252525]/15 px-3.5 py-2.5 text-xs text-[#252525] focus:outline-hidden focus:border-[#4A748C] rounded-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#252525] mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. 0300 1234567"
                          className="w-full bg-white border border-[#252525]/15 px-3.5 py-2.5 text-xs text-[#252525] focus:outline-hidden focus:border-[#4A748C] rounded-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#252525] mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. tariq@example.com"
                        className="w-full bg-white border border-[#252525]/15 px-3.5 py-2.5 text-xs text-[#252525] focus:outline-hidden focus:border-[#4A748C] rounded-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#252525] mb-1">
                        Message / Specific Inquiries
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please let us know your timeframe or preferred visiting schedule..."
                        className="w-full bg-white border border-[#252525]/15 px-3.5 py-2.5 text-xs text-[#252525] focus:outline-hidden focus:border-[#4A748C] rounded-xs resize-none"
                      />
                    </div>

                    <div className="pt-2 text-center">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#4A748C] hover:bg-[#37576B] text-white text-xs font-bold uppercase tracking-widest rounded-xs transition-colors shadow-xs cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Enquiry</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
