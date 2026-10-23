'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  ShoppingBag,
  Menu,
  X,
  Home,
  Package,
  PhoneCall,
  HelpCircle,
  BookOpen,
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import { useCart } from './CartContext';

export default function Header() {
  const { cartCount, openCart, settings } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const phone = settings?.phone || '+971 50 515 2391';
  const whatsapp = settings?.whatsapp || '+971 50 515 2391';

  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, '');

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="w-full sticky top-0 z-40 bg-white shadow-sm border-b border-slate-100">
      {/* Top Announcement Bar */}
      <div className="w-full bg-[#002b5c] text-white text-xs py-2 px-3 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Announcement with live pulse */}
          <div className="flex items-center space-x-2 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span className="font-medium tracking-wide truncate">
              {settings?.topAnnouncement || 'Welcome to Global Cure Rx Pharmacy LLC'}
            </span>
          </div>

          {/* Right: Phone Call Button */}
          <div className="flex items-center shrink-0">
            {/* Desktop Link */}
            <a
              href={`tel:${cleanPhone}`}
              className="hidden sm:flex items-center space-x-1.5 hover:text-cyan-300 transition-colors font-medium text-xs"
              title="Click to call us directly"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Call Us: {phone}</span>
            </a>

            {/* Mobile Touch-Friendly Button (Specifically requested for responsive mobile touch) */}
            <a
              href={`tel:${cleanPhone}`}
              className="sm:hidden inline-flex items-center space-x-1.5 bg-[#31a56d] hover:bg-[#288c5c] active:scale-95 text-white font-bold text-[11px] px-3 py-1 rounded-full shadow-sm transition-all"
              title="Touch to call directly"
              aria-label={`Call us at ${phone}`}
            >
              <Phone className="w-3 h-3 text-white fill-current shrink-0" />
              <span className="whitespace-nowrap">Call Us: {phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group shrink-0">
          <img
            src={settings?.logoUrl || '/uploads/1791916790068_Artboard_3_copy_3x-100.jpg'}
            alt={settings?.storeName || 'Global Cure RX Pharmacy'}
            className="h-11 sm:h-14 md:h-[70px] max-w-[170px] sm:max-w-[220px] object-contain group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* Center / Desktop Links (hidden on mobile, visible on md and up) */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link
            href="/"
            className="text-sm font-semibold text-slate-700 hover:text-[#004b93] transition-colors"
          >
            Home
          </Link>
          <a
            href="#products"
            className="text-sm font-semibold text-slate-700 hover:text-[#004b93] transition-colors"
          >
            Products
          </a>
          <a
            href="#faq"
            className="text-sm font-semibold text-slate-700 hover:text-[#004b93] transition-colors"
          >
            FAQ
          </a>
          <a
            href="#contact"
            className="text-sm font-semibold text-slate-700 hover:text-[#004b93] transition-colors"
          >
            Contact us
          </a>
        </nav>

        {/* Right Actions: Cart Icon + Mobile Hamburger Button */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Cart Icon Button (always visible on mobile and desktop) */}
          <button
            onClick={openCart}
            aria-label="Open Shopping Cart"
            className="relative p-2 text-slate-700 hover:text-[#004b93] rounded-full hover:bg-slate-100 transition-colors focus:outline-none"
          >
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#004b93] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Menu Toggle Button (visible ONLY on mobile) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden p-2 text-slate-700 hover:text-[#004b93] rounded-xl hover:bg-slate-100 transition-colors focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-800" />
            ) : (
              <Menu className="w-6 h-6 text-slate-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-50 md:hidden backdrop-blur-xs transition-opacity duration-200"
            onClick={closeMenu}
          />

          {/* Slide-out Drawer */}
          <div className="fixed top-0 right-0 bottom-0 w-[290px] sm:w-[320px] bg-white z-50 md:hidden shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            <div>
              {/* Drawer Top Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Menu
                </span>
                <button
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links inside Drawer */}
              <div className="p-3 space-y-1">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 hover:text-[#004b93] transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Home className="w-4 h-4 text-[#004b93]" />
                    <span>Home</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>

                <a
                  href="#products"
                  onClick={closeMenu}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 hover:text-[#004b93] transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Package className="w-4 h-4 text-[#004b93]" />
                    <span>Products</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="#faq"
                  onClick={closeMenu}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 hover:text-[#004b93] transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-4 h-4 text-[#004b93]" />
                    <span>Frequently Asked Questions</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 hover:text-[#004b93] transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <PhoneCall className="w-4 h-4 text-[#004b93]" />
                    <span>Contact us</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Bottom Contact & Quick Actions in Drawer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/80 space-y-2.5">
              <a
                href={`tel:${cleanPhone}`}
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-[#31a56d] hover:bg-[#288c5c] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5 fill-current" />
                <span>Call Us ({phone})</span>
              </a>

              <a
                href={`https://wa.me/${cleanWhatsapp}?text=Hello%20Global%20Cure%20RX%20Pharmacy,%20I%20have%20an%20inquiry%20about%20your%20products.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Helpline</span>
              </a>

              <p className="text-[10px] text-center text-slate-400 pt-1">
                Global Cure RX Pharmacy LLC • Dubai, UAE
              </p>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
