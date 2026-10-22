'use client';

import React from 'react';
import { useCart } from './CartContext';

export default function ProductCard({ product, onClick }) {
  const { addToCart, settings } = useCart();
  const currency = settings?.currency || 'AED';

  const isSoldOut = Boolean(product.isSoldOut || product.stockQuantity === 0);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (isSoldOut) return;
    addToCart(product, 1);
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-xl border border-slate-100 p-3 sm:p-4 flex flex-col justify-between hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-slate-200"
    >
      {/* Top Badge */}
      <div className="absolute top-2.5 left-2.5 z-10">
        {isSoldOut ? (
          <span className="inline-block bg-[#1f2937] text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
            SOLD OUT
          </span>
        ) : product.badge ? (
          <span className="inline-block bg-[#005bb5] text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
            {product.badge}
          </span>
        ) : null}
      </div>

      {/* Product Image */}
      <div className="w-full h-36 sm:h-44 flex items-center justify-center p-2 mb-2 bg-[#fafbfc] rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
        <img
          src={product.image || '/placeholder-product.png'}
          alt={product.title}
          className="max-h-full max-w-full object-contain filter contrast-105"
          onError={(e) => {
            e.target.src = '/banners/banner_original.png';
          }}
        />
      </div>

      {/* Product Information */}
      <div className="space-y-1 mt-auto">
        <h3 className="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-2 min-h-[32px] group-hover:text-[#004b93] transition-colors leading-snug">
          {product.title}
        </h3>

        {/* Price Row */}
        <div className="flex items-baseline space-x-2 pt-0.5">
          <span className="text-xs sm:text-sm font-bold text-[#31a56d]" style={{ color: '#31a56d' }}>
            {product.offerPrice} {currency}
          </span>
          {product.actualPrice && product.actualPrice > product.offerPrice && (
            <span className="text-[11px] text-slate-400 line-through">
              {product.actualPrice} {currency}
            </span>
          )}
        </div>

        {/* Add to Cart / Sold Out Button */}
        <div className="pt-2">
          {isSoldOut ? (
            <button
              disabled
              className="w-full py-1.5 sm:py-2 px-3 rounded-full text-xs font-semibold bg-[#cbd5e1] text-slate-600 cursor-not-allowed text-center"
            >
              Sold out
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full py-1.5 sm:py-2 px-3 rounded-full text-xs font-semibold bg-[#004b93] hover:bg-[#003a73] text-white transition-colors text-center shadow-sm active:scale-95"
            >
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
