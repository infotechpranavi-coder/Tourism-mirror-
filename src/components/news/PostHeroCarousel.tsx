"use client";

import { AnimatePresence, motion } from '@/lib/motion';
import { useEffect, useState } from 'react';

interface PostHeroCarouselProps {
  title: string;
  images: string[];
}

export default function PostHeroCarousel({ title, images }: PostHeroCarouselProps) {
  const safeImages = images.filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (safeImages.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % safeImages.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [safeImages.length]);

  const activeImage = safeImages[activeIndex] || safeImages[0];

  return (
    <div className="relative h-full w-full bg-[radial-gradient(circle_at_top,#f8fafc_0%,#eef2f7_48%,#dce3ea_100%)]">
      <AnimatePresence mode="wait">
        <motion.img
          key={`${activeImage}-${activeIndex}`}
          src={activeImage}
          alt={title}
          initial={{ opacity: 0.25, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.25, scale: 1.02 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="h-full w-full object-contain p-6 sm:p-8"
        />
      </AnimatePresence>

      {safeImages.length > 1 && (
        <div className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-lg backdrop-blur-md">
          {safeImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                activeIndex === index ? 'w-8 bg-primary' : 'w-2.5 bg-gray-300'
              }`}
              aria-label={`Show image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
