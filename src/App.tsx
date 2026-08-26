import React, { useState, useEffect } from 'react';
import { ActivePage, Property, EnquirySubmission } from './types';
import { PROPERTIES_DATA } from './data/properties';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PropertyDetailModal } from './components/PropertyDetailModal';

// 7 Distinct Page Components
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { ApartmentsPage } from './pages/ApartmentsPage';
import { CommercialPage } from './pages/CommercialPage';
import { RentalsPage } from './pages/RentalsPage';
import { AboutGalleryPage } from './pages/AboutGalleryPage';
import { ContactPage } from './pages/ContactPage';

import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync scroll to top on page change
  const handlePageChange = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnquirySuccess = (data: EnquirySubmission) => {
    setToastMessage(`Thank you, ${data.name}. Your enquiry for ${data.preferredLocation} has been received.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7F8] text-[#252525] font-sans antialiased selection:bg-[#4A748C]/20 selection:text-[#252525]">
      {/* Sticky Top Header */}
      <Header activePage={activePage} onNavigate={handlePageChange} />

      {/* Main Page Container with Smooth Fade Transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {activePage === 'home' && (
              <HomePage
                properties={PROPERTIES_DATA}
                onSelectProperty={(prop) => setSelectedProperty(prop)}
                onNavigate={handlePageChange}
              />
            )}

            {activePage === 'properties' && (
              <PropertiesPage
                properties={PROPERTIES_DATA}
                onSelectProperty={(prop) => setSelectedProperty(prop)}
              />
            )}

            {activePage === 'apartments' && (
              <ApartmentsPage
                properties={PROPERTIES_DATA}
                onSelectProperty={(prop) => setSelectedProperty(prop)}
              />
            )}

            {activePage === 'commercial' && (
              <CommercialPage
                properties={PROPERTIES_DATA}
                onSelectProperty={(prop) => setSelectedProperty(prop)}
              />
            )}

            {activePage === 'rentals' && (
              <RentalsPage
                properties={PROPERTIES_DATA}
                onSelectProperty={(prop) => setSelectedProperty(prop)}
              />
            )}

            {activePage === 'about' && <AboutGalleryPage />}

            {activePage === 'contact' && (
              <ContactPage onEnquirySuccess={handleEnquirySuccess} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Spacious Luxury Footer */}
      <Footer onNavigate={handlePageChange} />

      {/* Dedicated Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onEnquireSuccess={(sub) => {
          setSelectedProperty(null);
          handleEnquirySuccess(sub);
        }}
      />

      {/* Global Confirmation Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-[#252525] text-white px-5 py-3.5 rounded-sm shadow-xl border border-white/10 flex items-center gap-3 max-w-md"
          >
            <CheckCircle2 className="w-5 h-5 text-[#4A748C] shrink-0" />
            <p className="text-xs text-white/90 leading-normal">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
