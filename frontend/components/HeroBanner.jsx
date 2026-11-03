'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroBanner() {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Default fallback banners matching active banners
  const fallbackBanners = [
    {
      id: 'banner-1',
      title: 'At Global Cure RX Pharmacy LLC',
      subtitle: 'We believe access to quality healthcare products should be simple, reliable and convenient.',
      desktopImage: '/banners/banner1_desktop.png',
      mobileImage: '/banners/banner1_mobile.png',
      ctaText: 'Shop Equipment',
      ctaLink: '#products',
      active: true,
      order: 1
    },
    {
      id: 'banner-2',
      title: 'Certified Medical Supplies & Equipment',
      subtitle: 'Advanced Medical Equipment for Quality Patient Care The Right Equipment. The Best Care. Better Patient Outcomes.',
      desktopImage: '/uploads/1792066012602_new_22.png',
      mobileImage: '/uploads/1792063921529_mobile.png',
      ctaText: 'Browse Supplies',
      ctaLink: '#products',
      active: true,
      order: 2
    },
    {
      id: 'banner-3',
      title: 'Fast Delivery & Instant WhatsApp Ordering',
      subtitle: 'Medical Consumables - Essential Supplies for Safe & Effective Care',
      desktopImage: '/uploads/1792065475064_Medical_Consumables__Essential_Care_Supplies.png',
      mobileImage: '/uploads/1792065507305_Essential_Medical_Consumables_for_Safe_Care.png',
      ctaText: 'Order Now',
      ctaLink: '#products',
      active: true,
      order: 3
    }
  ];

  // Fetch banners from API
  useEffect(() => {
    fetch('/api/banners')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setBanners(data);
        } else {
          setBanners(fallbackBanners);
        }
      })
      .catch(() => setBanners(fallbackBanners));
  }, []);

  const displayBanners = banners.length > 0 ? banners : fallbackBanners;

  // Auto-scroll effect
  useEffect(() => {
    if (isPaused || displayBanners.length <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % displayBanners.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [displayBanners.length, isPaused]);

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? displayBanners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % displayBanners.length);
  };

  if (!displayBanners || displayBanners.length === 0) return null;

  const currentBanner = displayBanners[currentIndex] || displayBanners[0];

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-[#002b5c] text-white shadow-xl min-h-[220px] sm:min-h-[280px] md:min-h-[340px] flex items-center">
        
        {/* Slide Content */}
        {displayBanners.map((banner, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={banner.id || index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Desktop View Banner */}
              <div className="hidden md:flex w-full h-full items-center justify-between p-8 lg:p-12">
                <div className="max-w-xl z-20 space-y-4">
                  <p className="text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                    {banner.title}
                  </p>
                  <p className="text-sm lg:text-base text-slate-200 leading-relaxed font-normal">
                    {banner.subtitle}
                  </p>
                  {banner.ctaText && (
                    <a
                      href={banner.ctaLink || '#products'}
                      className="inline-block px-6 py-2.5 bg-white text-[#002b5c] font-bold text-xs uppercase tracking-wider rounded-full hover:bg-slate-100 transition-colors shadow-md"
                    >
                      {banner.ctaText}
                    </a>
                  )}
                </div>

                {/* Desktop Banner Graphic/Photo */}
                <div className="w-1/2 h-full flex items-center justify-center relative z-10">
                  <img
                    src={banner.desktopImage || '/banners/banner_original.png'}
                    alt={banner.title}
                    className="max-h-[280px] max-w-full object-contain filter drop-shadow-2xl rounded-lg"
                    onError={(e) => {
                      e.target.src = '/banners/banner_original.png';
                    }}
                  />
                </div>
              </div>

              {/* Mobile / Tablet Responsive Banner */}
              <div className="md:hidden w-full h-full relative flex flex-col justify-end p-6">
                {/* Background image for mobile if custom mobile banner provided */}
                <img
                  src={banner.mobileImage || banner.desktopImage || '/banners/banner1_mobile.png'}
                  alt={banner.title}
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
                  onError={(e) => {
                    e.target.src = '/banners/banner_original.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002b5c] via-[#002b5c]/70 to-transparent"></div>
                <div className="relative z-20 space-y-2">
                  <p className="text-lg sm:text-xl font-bold text-white leading-snug">
                    {banner.title}
                  </p>
                  <p className="text-xs text-slate-200 line-clamp-3 leading-relaxed">
                    {banner.subtitle}
                  </p>
                  {banner.ctaText && (
                    <a
                      href={banner.ctaLink || '#products'}
                      className="inline-block mt-2 px-5 py-2 bg-white text-[#002b5c] font-bold text-xs rounded-full shadow"
                    >
                      {banner.ctaText}
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous Banner"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/25 hover:bg-black/40 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Banner"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/25 hover:bg-black/40 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-1.5">
          {displayBanners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
