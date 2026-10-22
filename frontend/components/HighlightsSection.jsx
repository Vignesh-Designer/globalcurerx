'use client';

import React from 'react';
import {
  ShieldCheck,
  Award,
  ShoppingBag,
  Users,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  HeartHandshake
} from 'lucide-react';
import { useCart } from './CartContext';

export default function HighlightsSection() {
  const { settings } = useCart();
  const whatsappNumber = settings?.whatsapp || '+971 50 515 2391';

  // Format WhatsApp number
  let cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  if (cleanNumber.length === 10 && cleanNumber.startsWith('9')) {
    cleanNumber = '91' + cleanNumber;
  } else if (cleanNumber.length === 9 && cleanNumber.startsWith('5')) {
    cleanNumber = '971' + cleanNumber;
  } else if (cleanNumber.length === 10 && cleanNumber.startsWith('05')) {
    cleanNumber = '971' + cleanNumber.substring(1);
  }

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hello ${settings?.storeName || 'Global Cure RX Pharmacy'}, I would like to inquire about your healthcare products.`);
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const categoriesList = [
    "Medicines",
    "Vitamins & Supplements",
    "Cosmetics",
    "Medical Equipment",
    "Surgical Products",
    "Medical Consumables",
    "Personal Care"
  ];

  const whyChooseUsPillars = [
    {
      icon: ShieldCheck,
      color: 'bg-blue-50 text-[#004b93] border-blue-100',
      title: "Quality-Focused Selection",
      description: "We aim to provide products sourced through responsible and reliable supply channels."
    },
    {
      icon: Award,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      title: "Healthcare You Can Trust",
      description: "Our product selection is built around quality, authenticity and responsible healthcare practices."
    },
    {
      icon: ShoppingBag,
      color: 'bg-cyan-50 text-cyan-800 border-cyan-100',
      title: "Convenient Online Shopping",
      description: "Browse our categories, find the products you need and place your order through a simple online experience."
    },
    {
      icon: Users,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      title: "Customer-Centred Service",
      description: "Our team is committed to providing helpful service and making your healthcare shopping experience straightforward."
    },
    {
      icon: MapPin,
      color: 'bg-sky-50 text-sky-800 border-sky-100',
      title: "Dubai-Based Healthcare Partner",
      description: "Serving customers in Dubai with a convenient platform for healthcare, wellness and medical-supply needs."
    }
  ];

  return (
    <section className="w-full bg-gradient-to-b from-white via-slate-50/60 to-white py-16 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* 1. DUBAI PHARMACY INTRO & WHY CHOOSE US */}
        <div className="space-y-10">
          
          {/* Top Intro Card */}
          <div className="relative overflow-hidden bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/60 rounded-full blur-3xl -z-0 pointer-events-none"></div>

            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#002b5c]/5 text-[#002b5c] text-xs font-bold tracking-wide uppercase">
                <MapPin className="w-3.5 h-3.5 text-[#004b93]" />
                <span>Dubai Healthcare Partner</span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#002b5c] leading-snug">
                Trusted Healthcare, Medical Equipment & Wellness in Dubai
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Based in Dubai, we provide a carefully selected range of{' '}
                <span className="font-semibold text-slate-900">
                  medicines, vitamins and supplements, personal care products, cosmetics, medical equipment, surgical supplies and medical consumables
                </span>{' '}
                to support everyday health and professional healthcare needs.
              </p>

              <div className="pt-2">
                <p className="text-xs sm:text-sm font-semibold text-[#004b93] bg-blue-50/70 inline-block px-4 py-2 rounded-xl border border-blue-100/60">
                  Our focus is simple: <span className="text-slate-900 font-bold">quality products, responsible service and customer care you can trust.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Value Pillars Grid (5 Cards) */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#002b5c] tracking-tight">
                Why Choose Global Cure RX Pharmacy?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Committed to safety, authenticity, and straightforward healthcare delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {whyChooseUsPillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-5 border border-slate-200/70 hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center border transition-transform duration-300 group-hover:scale-105`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#004b93] transition-colors leading-snug">
                        {item.title}
                      </h4>

                      <p className="text-xs text-slate-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-slate-100 flex items-center space-x-1.5 text-[11px] font-semibold text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Verified Standard</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* 2. BRAND MISSION & PROFESSIONAL STANDARDS BANNER */}
        <div className="relative overflow-hidden rounded-3xl bg-[#002b5c] text-white p-8 sm:p-12 lg:p-14 shadow-xl">
          {/* Decorative glow circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#004b93] opacity-40 rounded-full blur-3xl -z-0"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500 opacity-20 rounded-full blur-2xl -z-0"></div>

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Global Cure RX Pharmacy LLC</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              Healthcare Products. Professional Standards. Convenient Shopping.
            </h3>

            <div className="space-y-3 text-slate-200 text-xs sm:text-sm leading-relaxed">
              <p>
                At Global Cure RX Pharmacy LLC, we bring healthcare and wellness essentials together in one convenient destination.
              </p>
              <p>
                From everyday vitamins and personal care products to medical equipment and professional healthcare supplies, our goal is to make quality healthcare products more accessible while maintaining responsible standards.
              </p>
            </div>

            {/* Confidence Quote Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
              <p className="text-xs sm:text-sm font-semibold text-cyan-200 italic">
                “Your health matters. Choose your healthcare products with confidence.”
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#products"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white text-[#002b5c] hover:bg-slate-100 font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95"
              >
                <span>Inquire on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. SHOP GLOBAL CURE RX PHARMACY DIRECTORY */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm text-center space-y-8">
          <div className="max-w-2xl mx-auto space-y-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#002b5c] tracking-tight">
              Shop Global Cure RX Pharmacy
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              Explore our healthcare and wellness categories and discover products selected to meet a wide range of everyday and professional needs.
            </p>
          </div>

          {/* Interactive Category Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
            {categoriesList.map((cat, idx) => (
              <a
                key={idx}
                href="#products"
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-[#004b93] text-slate-700 hover:text-white font-semibold text-xs transition-colors duration-200 border border-slate-200/60 shadow-xs"
              >
                {cat}
              </a>
            ))}
          </div>

          {/* Brand Signature Footer Card */}
          <div className="pt-6 border-t border-slate-100 max-w-md mx-auto space-y-1">
            <h4 className="text-base font-extrabold text-[#002b5c]">
              Global Cure RX Pharmacy LLC
            </h4>
            <p className="text-xs font-semibold text-slate-500 italic">
              Healthcare & Wellness — Delivered with Care.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
