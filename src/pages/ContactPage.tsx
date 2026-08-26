import React, { useState } from 'react';
import { EnquirySubmission } from '../types';
import { AGENCY_INFO } from '../data/properties';
import { SignatureText } from '../components/SignatureText';
import { MapPin, Phone, User, Send, Check, MessageSquare, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactPageProps {
  onEnquirySuccess?: (data: EnquirySubmission) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onEnquirySuccess }) => {
  const [formData, setFormData] = useState<EnquirySubmission>({
    name: '',
    phone: '',
    email: '',
    propertyRequirement: 'Apartment Purchase',
    preferredLocation: 'Johar Town',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitted(true);
    if (onEnquirySuccess) {
      onEnquirySuccess(formData);
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Page Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-6">
        <SignatureText text="LET'S TALK PROPERTY" variant="slate" size="sm" className="mx-auto" />
        <h1 className="text-3xl sm:text-4xl font-extrabold uppercase text-[#252525] tracking-tight">
          Find The Right Space For Your Next Move
        </h1>
        <p className="text-sm text-[#667085]">
          Tell us what you are looking for and we&apos;ll help you explore suitable property options across Lahore.
        </p>
      </div>

      {/* Main Content Grid: Info & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Contact Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#252525]/10 p-6 sm:p-8 rounded-sm shadow-xs space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4A748C]">
                Agency Head Office
              </span>
              <h2 className="text-xl font-bold uppercase text-[#252525] tracking-tight mt-1">
                {AGENCY_INFO.name}
              </h2>
            </div>

            <div className="space-y-4 text-xs text-[#667085]">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#4A748C] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#252525] block uppercase tracking-wider text-[11px] mb-0.5">
                    Address
                  </strong>
                  <span>{AGENCY_INFO.address}</span>
                </div>
              </div>

              {/* Principal Consultant */}
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-[#4A748C] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#252525] block uppercase tracking-wider text-[11px] mb-0.5">
                    Property Contact
                  </strong>
                  <span className="text-[#252525] font-semibold">{AGENCY_INFO.head}</span>
                  <span className="block text-[11px] text-[#667085]">
                    {AGENCY_INFO.designation}
                  </span>
                </div>
              </div>

              {/* Phone (Understated, not oversized) */}
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#4A748C] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#252525] block uppercase tracking-wider text-[11px] mb-0.5">
                    Telephone
                  </strong>
                  <a
                    href={`tel:${AGENCY_INFO.phoneRaw}`}
                    className="text-[#252525] font-semibold hover:text-[#4A748C] transition-colors"
                  >
                    {AGENCY_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#4A748C] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#252525] block uppercase tracking-wider text-[11px] mb-0.5">
                    Consultation Hours
                  </strong>
                  <span>Monday – Saturday: 10:00 AM – 8:00 PM</span>
                  <span className="block text-[11px] text-[#667085]">Sunday by prior appointment</span>
                </div>
              </div>
            </div>

            {/* Subtle WhatsApp Option (Only in this single contact context as specified) */}
            <div className="pt-4 border-t border-[#252525]/10">
              <a
                href={`https://wa.me/${AGENCY_INFO.whatsappRaw}?text=${encodeURIComponent(
                  'Hello Muhammad Younus, I would like to enquire about properties with 360 Real Estate & Builder\'s.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F5F7F8] hover:bg-[#E5E7EB] border border-[#252525]/10 text-[#252525] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#4A748C]" />
                <span>Message via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Appointment / Property Enquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-[#252525]/10 p-6 sm:p-8 rounded-sm shadow-xs">
            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4A748C]">
                Enquiry &amp; Consultation
              </span>
              <h2 className="text-xl font-bold uppercase text-[#252525] tracking-tight mt-1">
                Property Enquiry Form
              </h2>
              <p className="text-xs text-[#667085] mt-1">
                Please provide your requirements. We will contact you promptly with verified matches.
              </p>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 bg-[#F5F7F8] border border-[#4A748C]/30 rounded-xs text-center space-y-3"
              >
                <div className="w-12 h-12 bg-[#4A748C] text-white rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-[#252525] uppercase tracking-wide">
                  Thank you. Your enquiry has been received.
                </h4>
                <p className="text-xs text-[#667085] max-w-md mx-auto leading-relaxed">
                  Muhammad Younus will review your property request for {formData.preferredLocation} and reach out to you at {formData.phone}.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      propertyRequirement: 'Apartment Purchase',
                      preferredLocation: 'Johar Town',
                      message: '',
                    });
                  }}
                  className="mt-4 px-6 py-2 border border-[#4A748C] text-[#4A748C] hover:bg-[#4A748C] hover:text-white text-xs font-bold uppercase tracking-widest rounded-xs transition-colors"
                >
                  Send Another Enquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#252525] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Asad Malik"
                      className="w-full bg-[#F5F7F8] border border-[#252525]/15 px-3.5 py-2.5 text-xs text-[#252525] focus:outline-hidden focus:border-[#4A748C] focus:bg-white rounded-xs"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#252525] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 0300 5599467"
                      className="w-full bg-[#F5F7F8] border border-[#252525]/15 px-3.5 py-2.5 text-xs text-[#252525] focus:outline-hidden focus:border-[#4A748C] focus:bg-white rounded-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#252525] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. asad@domain.com"
                      className="w-full bg-[#F5F7F8] border border-[#252525]/15 px-3.5 py-2.5 text-xs text-[#252525] focus:outline-hidden focus:border-[#4A748C] focus:bg-white rounded-xs"
                    />
                  </div>

                  {/* Property Requirement */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#252525] mb-1">
                      Property Requirement
                    </label>
                    <select
                      value={formData.propertyRequirement}
                      onChange={(e) => setFormData({ ...formData, propertyRequirement: e.target.value })}
                      className="w-full bg-[#F5F7F8] border border-[#252525]/15 px-3.5 py-2.5 text-xs text-[#252525] focus:outline-hidden focus:border-[#4A748C] focus:bg-white rounded-xs"
                    >
                      <option value="Apartment Purchase">Apartment / Flat for Sale</option>
                      <option value="Apartment Rental">Apartment / Flat for Rent</option>
                      <option value="Commercial Shop / Retail">Commercial Shop / Retail</option>
                      <option value="Corporate Office">Corporate Office Suite</option>
                      <option value="Factory / Industrial">Factory / Industrial Warehouse</option>
                      <option value="Commercial Land">Commercial Land / Plot</option>
                      <option value="Investment Consultation">General Property Investment</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Location */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#252525] mb-1">
                    Preferred Location
                  </label>
                  <select
                    value={formData.preferredLocation}
                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                    className="w-full bg-[#F5F7F8] border border-[#252525]/15 px-3.5 py-2.5 text-xs text-[#252525] focus:outline-hidden focus:border-[#4A748C] focus:bg-white rounded-xs"
                  >
                    <option value="Johar Town">Johar Town (Phase 1 &amp; Phase 2)</option>
                    <option value="Canal Road">Canal Road / The Springs Area</option>
                    <option value="Etihad Town">Etihad Town (Phase 1 / Victoria Livings)</option>
                    <option value="Thokar Niaz Baig">Thokar Niaz Baig / Katar Bund Road</option>
                    <option value="Other Lahore Locations">Other Lahore Locations</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#252525] mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide any specific details (budget range, preferred floor, timeframe)..."
                    className="w-full bg-[#F5F7F8] border border-[#252525]/15 px-3.5 py-2.5 text-xs text-[#252525] focus:outline-hidden focus:border-[#4A748C] focus:bg-white rounded-xs resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#4A748C] hover:bg-[#37576B] text-white text-xs font-bold uppercase tracking-widest rounded-xs transition-colors shadow-xs cursor-pointer"
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

      {/* Clean Google Map Embed (Visually secondary) */}
      <section id="map-section" className="space-y-4">
        <div className="flex items-center gap-2 text-[#4A748C]">
          <MapPin className="w-4 h-4" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#252525]">
            Office Location • Zam Zam Mall, Johar Town Phase 2, Lahore
          </h3>
        </div>

        <div className="w-full h-80 rounded-sm overflow-hidden border border-[#252525]/10 bg-white shadow-xs">
          <iframe
            title="360 Real Estate Office Location"
            src="https://maps.google.com/maps?q=Zam+Zam+Mall+Johar+Town+Lahore&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0 grayscale-20"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  );
};
