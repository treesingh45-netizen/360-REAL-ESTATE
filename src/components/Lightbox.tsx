import React, { useEffect } from 'react';
import { GalleryItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

interface LightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onSelect: (item: GalleryItem) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  item,
  items,
  onClose,
  onSelect,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!item) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, items]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + items.length) % items.length;
    onSelect(items[prevIdx]);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % items.length;
    onSelect(items[nextIdx]);
  };

  return (
    <AnimatePresence>
      <motion.div
        id="gallery-lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#252525]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 lg:p-8"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold tracking-widest text-[#B89B5E] uppercase px-2.5 py-1 bg-white/10 rounded-xs">
              {item.category}
            </span>
            <span className="text-xs text-[#F5F7F8]/70">
              {currentIndex + 1} / {items.length}
            </span>
          </div>

          <button
            id="lightbox-close-btn"
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors focus:outline-hidden"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center Media Stage with Prev/Next buttons */}
        <div className="relative flex-grow flex items-center justify-center my-auto max-h-[75vh]">
          {/* Prev button */}
          <button
            id="lightbox-prev-btn"
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 z-20 p-3 bg-black/40 hover:bg-black/70 text-white rounded-full transition-colors focus:outline-hidden"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main Image with smooth scale & fade */}
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl max-h-full rounded-xs overflow-hidden shadow-2xl"
          >
            <img
              src={item.image}
              alt={item.title}
              className="max-h-[72vh] w-auto max-w-full object-contain mx-auto"
            />
          </motion.div>

          {/* Next button */}
          <button
            id="lightbox-next-btn"
            onClick={handleNext}
            className="absolute right-2 sm:right-4 z-20 p-3 bg-black/40 hover:bg-black/70 text-white rounded-full transition-colors focus:outline-hidden"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Caption Bar */}
        <div className="max-w-2xl mx-auto text-center space-y-1 z-10 bg-black/30 backdrop-blur-xs px-6 py-3 rounded-sm border border-white/10">
          <h3 className="text-base font-bold text-white tracking-tight">
            {item.title}
          </h3>
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#667085]">
            <MapPin className="w-3.5 h-3.5 text-[#4A748C]" />
            <span>{item.location}</span>
          </div>
          {item.caption && (
            <p className="text-xs text-white/80 max-w-md mx-auto pt-0.5">
              {item.caption}
            </p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
