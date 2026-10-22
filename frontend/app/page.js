'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import ExploreSection from '../components/ExploreSection';
import BlogSection from '../components/BlogSection';
import FaqSection from '../components/FaqSection';
import HighlightsSection from '../components/HighlightsSection';
import Footer from '../components/Footer';
import ProductModal from '../components/ProductModal';
import CartDrawer from '../components/CartDrawer';
import MobileBottomBar from '../components/MobileBottomBar';

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="min-h-screen flex flex-col justify-between relative bg-white">
      {/* Main Top Header */}
      <Header />

      {/* Main Store Content */}
      <main className="flex-1 space-y-4 pb-16 md:pb-0">
        {/* 3 Banners Carousel with Auto-Scroll & Mobile Responsive Images */}
        <HeroBanner />

        {/* Explore Healthcare Products Section */}
        <ExploreSection onSelectProduct={(prod) => setSelectedProduct(prod)} />

        {/* Custom Highlights & Trust Section (Dubai Healthcare, Why Choose Us, Brand Standards, Shop Global Cure RX Pharmacy) */}
        <HighlightsSection />

        {/* From Our Blog Section */}
        <BlogSection />

        {/* Frequently Asked Questions (FAQ) Section */}
        <FaqSection />
      </main>

      {/* Deep Navy Blue Footer */}
      <Footer />

      {/* Product Details Popup Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Right Slide-out Shopping Cart Drawer */}
      <CartDrawer />

      {/* Mobile & Tablet Responsive Sticky Bottom Action Bar */}
      <MobileBottomBar />
    </div>
  );
}
