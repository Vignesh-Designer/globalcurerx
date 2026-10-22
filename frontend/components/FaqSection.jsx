'use client';

import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  Search,
  MessageCircle,
  ShieldCheck,
  Truck,
  FileText,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  PhoneCall,
  Clock,
  Package
} from 'lucide-react';

const FAQ_DATA = [
  {
    id: 'faq-1',
    category: 'ordering',
    categoryLabel: 'WhatsApp Ordering',
    question: 'How do I place an order for medicines or healthcare products on Global Cure RX Pharmacy?',
    answer: 'Ordering is fast, simple, and completely tension-free through WhatsApp with zero payment gateway friction. Simply browse our website, find your required products, and click "Add to Cart" or "Order via WhatsApp". When you go to checkout, our intelligent system automatically compiles all your selected product names, quantities, and pricing into a clean, pre-filled WhatsApp message. All you do is tap the "Send" button on WhatsApp—our pharmacy team instantly receives your order and begins processing it right away!'
  },
  {
    id: 'faq-2',
    category: 'ordering',
    categoryLabel: 'WhatsApp Ordering',
    question: 'How does the Cart to WhatsApp feature work?',
    answer: 'Whenever you add multiple healthcare items to your cart—such as Medicines, Vitamins, Surgical Products, or Consumables—our cart saves your selections. When you click the green "Order via WhatsApp" button, our site pulls your exact cart summary directly into a formatted message sent to our official WhatsApp (+971 50 515 2391). There is no need to type out product names or prices manually; one click transfers your complete order cleanly to our team.'
  },
  {
    id: 'faq-3',
    category: 'payments',
    categoryLabel: 'Payment & Security',
    question: 'Why is there no card payment gateway on the website? Is this more secure for me?',
    answer: 'Yes, this is significantly more secure! In online healthcare, patient privacy and genuine verification are paramount. By eliminating third-party website card forms, you never have to expose your sensitive credit card numbers, debit cards, or CVV codes online. There is zero risk of unauthorized card auto-charges or data leaks. You submit your order effortlessly with total peace of mind.'
  },
  {
    id: 'faq-4',
    category: 'payments',
    categoryLabel: 'Payment & Security',
    question: 'How and when do I pay for my order?',
    answer: 'Once you send your order message on WhatsApp, our expert team verifies product availability and confirms your delivery address and preferences. After receiving your confirmation, we send you a 100% secure, encrypted official payment link (supporting Apple Pay, Visa, and Mastercard) or arrange payment upon delivery. You only pay after you have personally reviewed and confirmed your order with our pharmacy specialist.'
  },
  {
    id: 'faq-5',
    category: 'ordering',
    categoryLabel: 'Expert Support',
    question: 'Who follows up on my order after I send the WhatsApp message?',
    answer: 'A dedicated healthcare specialist from our Dubai pharmacy personally follows up with you. Unlike automated chatbots or generic websites, our trained pharmacy team member reviews your order, verifies proper storage and packaging, answers any usage or dosage questions, and ensures your experience is smooth from start to finish.'
  },
  {
    id: 'faq-6',
    category: 'delivery',
    categoryLabel: 'Order Tracking & Delivery',
    question: 'How do I receive order updates and tracking information?',
    answer: 'You receive prompt, personalized updates directly on WhatsApp from our team. We notify you when your order is packed, when it is handed over to our temperature-controlled dispatch courier, and provide an accurate delivery window. If you ever have a question about delivery timing, you can simply reply in the WhatsApp chat for immediate answers.'
  },
  {
    id: 'faq-7',
    category: 'products',
    categoryLabel: 'Products & Categories',
    question: 'What types of medical and healthcare products do you supply?',
    answer: 'Global Cure RX Pharmacy LLC is a licensed community and clinical pharmacy in Dubai supplying 8 primary categories: (1) Medicines – Genuine OTC pharmaceuticals and therapeutic treatments; (2) Vitamins & Supplements – Immune defense, multivitamins, and wellness formulas; (3) Cosmetics & Personal Care – Dermatologist-approved skincare and hygiene; (4) Medical Equipment – Diagnostic devices, nebulizers, wheelchairs, and plaster machines; (5) Surgical Products – Sterile clinic surgical instruments, scissors, and scalpels; (6) Medical Consumables – Nitrile examination gloves, sanitizers, and clinical bandages; (7) Wellness Essentials – Everyday family healthcare essentials; and (8) Orthopedic Supports – Braces, rehabilitation supports, and joint care.'
  },
  {
    id: 'faq-8',
    category: 'products',
    categoryLabel: 'Prescriptions',
    question: 'How do I order prescription medicines or submit my doctor\'s prescription?',
    answer: 'You can easily share a clear photo or digital PDF of your valid UAE doctor\'s prescription directly in our WhatsApp conversation. Our licensed pharmacists verify the prescription in accordance with UAE Ministry of Health (MOH) and Dubai Health Authority (DHA) protocols, check dosage compatibility, and fulfill your medication safely.'
  },
  {
    id: 'faq-9',
    category: 'delivery',
    categoryLabel: 'Delivery Areas',
    question: 'Do you deliver across Dubai and all other Emirates in the UAE?',
    answer: 'Yes! We offer express delivery across all areas of Dubai—including Al Hudaiba, Jumeirah, Downtown, Business Bay, Deira, Bur Dubai, Dubai Marina, and Arabian Ranches. We also deliver across all 7 Emirates: Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Umm Al Quwain, and Fujairah using reliable, temperature-monitored medical delivery couriers.'
  },
  {
    id: 'faq-10',
    category: 'products',
    categoryLabel: 'Product Authenticity',
    question: 'Are all your medical supplies, medicines, and surgical equipment genuine and certified?',
    answer: '100% Yes. Every product supplied by Global Cure RX Pharmacy LLC is authentic, sourced exclusively from certified pharmaceutical manufacturers and authorized UAE healthcare distributors. All items adhere to strict regulatory standards and are stored in temperature-controlled pharmaceutical facilities in Dubai to ensure maximum efficacy.'
  },
  {
    id: 'faq-11',
    category: 'ordering',
    categoryLabel: 'Order Modifications',
    question: 'Can I add more products, change quantities, or modify my order after sending it?',
    answer: 'Absolutely! Because you are communicating directly with a human pharmacy specialist on WhatsApp, changing your order is effortless. If you wish to add vitamins, change the quantity of gloves, or update your delivery address, just tell our specialist in the chat. They will update your cart and bill in real time before dispatch.'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'ordering', label: 'WhatsApp Ordering' },
  { id: 'payments', label: 'Security & Payments' },
  { id: 'products', label: 'Products & Prescriptions' },
  { id: 'delivery', label: 'Delivery & Shipping' }
];

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState(['faq-1', 'faq-3']); // Open first and key security FAQ by default

  const toggleFaq = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-100">
      
      {/* Header with Brand Pulse Wave */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="flex items-center justify-center space-x-3">
          <svg className="w-10 sm:w-12 h-6 text-cyan-400 stroke-current" viewBox="0 0 100 30" fill="none">
            <path d="M0 15 H40 L45 3 L55 27 L60 15 H100" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-cyan-600 bg-cyan-50 px-3.5 py-1 rounded-full border border-cyan-100">
            Help & Ordering Guide
          </span>
          <svg className="w-10 sm:w-12 h-6 text-cyan-400 stroke-current" viewBox="0 0 100 30" fill="none">
            <path d="M0 15 H40 L45 3 L55 27 L60 15 H100" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002b5c] tracking-tight">
          Frequently Asked Questions
        </h2>

        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto">
          Learn how our secure 1-click WhatsApp ordering, cart synchronization, verified medical supplies, and expert customer follow-up work for you in Dubai & the UAE.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="max-w-4xl mx-auto space-y-4 mb-8">
        {/* Search input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search questions (e.g. WhatsApp, payment, medicines, delivery, prescription)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-xs focus:ring-2 focus:ring-[#004b93] focus:border-[#004b93] focus:outline-none transition-all placeholder:text-slate-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#002b5c] text-white shadow-sm'
                  : 'bg-slate-100/80 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion FAQ List */}
      <div className="max-w-4xl mx-auto space-y-3.5">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-700">No matching questions found</h3>
            <p className="text-xs text-slate-400">
              Try searching with different terms or reset your filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 bg-[#004b93] text-white text-xs font-bold rounded-xl"
            >
              Reset Search
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#004b93]/40 shadow-md ring-1 ring-[#004b93]/10'
                    : 'border-slate-200/90 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {/* Question Trigger */}
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 group focus:outline-none cursor-pointer"
                >
                  <div className="flex items-start sm:items-center space-x-3 flex-1">
                    <span className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                      isOpen
                        ? 'bg-[#002b5c] text-white'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                    }`}>
                      {index + 1}
                    </span>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50/70 px-2 py-0.5 rounded-md inline-block mr-2">
                        {faq.categoryLabel}
                      </span>
                      <h3 className={`text-xs sm:text-sm font-bold transition-colors ${
                        isOpen ? 'text-[#002b5c]' : 'text-slate-800 group-hover:text-[#004b93]'
                      }`}>
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div className={`p-1.5 rounded-full shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-slate-100 text-[#004b93]' : 'text-slate-400 group-hover:text-slate-600'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Collapsible Answer */}
                {isOpen && (
                  <div className="px-4 pb-5 pt-1 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <div className="flex items-start space-x-2 pt-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Pharmacist WhatsApp Help CTA Banner */}
      <div className="max-w-4xl mx-auto mt-10 bg-gradient-to-br from-[#002b5c] to-[#004b93] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-1.5 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Licensed Pharmacists On Duty</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold">
            Still Have Questions About Your Health Essentials?
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
            Chat directly with our Dubai pharmacy specialist on WhatsApp for dosage instructions, medical equipment consultation, or immediate order assistance.
          </p>
        </div>

        <a
          href="https://wa.me/971505152391?text=Hello%20Global%20Cure%20RX%20Pharmacy,%20I%20have%20a%20question%20about%20your%20products%20and%20ordering."
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center space-x-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 whitespace-nowrap"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat on WhatsApp (+971 50 515 2391)</span>
        </a>
      </div>

    </section>
  );
}
