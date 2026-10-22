'use client';

import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from './CartContext';

export default function ProductModal({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, settings } = useCart();
  const currency = settings?.currency || 'AED';

  useEffect(() => {
    // Reset quantity when new product opens
    setQuantity(1);

    // Prevent background scrolling while modal is open
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [product]);

  if (!product) return null;

  const isSoldOut = Boolean(product.isSoldOut || product.stockQuantity === 0);

  const handleAdd = () => {
    if (isSoldOut) return;
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Modal"
          className="absolute top-4 right-4 z-20 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Side: Product Image */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 bg-[#fbfcfd] flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100">
          <div className="w-full h-56 sm:h-72 flex items-center justify-center">
            <img
              src={product.image || '/placeholder-product.png'}
              alt={product.title}
              className="max-h-full max-w-full object-contain filter drop-shadow-md"
              onError={(e) => {
                e.target.src = '/banners/banner_original.png';
              }}
            />
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            {/* Category Tag */}
            {product.category && (
              <span className="text-[11px] font-bold text-[#004b93] uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md inline-block">
                {product.category}
              </span>
            )}

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {product.title}
            </h2>

            {/* Price Row */}
            <div className="flex items-baseline space-x-3">
              <span className="text-xl sm:text-2xl font-extrabold text-[#31a56d]" style={{ color: '#31a56d' }}>
                {product.offerPrice} {currency}
              </span>
              {product.actualPrice && product.actualPrice > product.offerPrice && (
                <span className="text-sm font-medium text-slate-400 line-through">
                  {product.actualPrice} {currency}
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 pt-2">
              <span className="text-xs font-semibold text-slate-700">Quantity</span>
              <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="p-1.5 px-2.5 hover:bg-slate-100 text-slate-600 transition-colors"
                  aria-label="Decrease quantity"
                  disabled={isSoldOut}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-xs font-bold text-slate-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="p-1.5 px-2.5 hover:bg-slate-100 text-slate-600 transition-colors"
                  aria-label="Increase quantity"
                  disabled={isSoldOut}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Add To Cart Button */}
            <div className="pt-2">
              {isSoldOut ? (
                <button
                  disabled
                  className="w-full py-3 px-6 rounded-full text-xs font-bold bg-slate-200 text-slate-500 cursor-not-allowed"
                >
                  Sold out
                </button>
              ) : (
                <button
                  onClick={handleAdd}
                  className="w-full py-3 px-6 rounded-full text-xs font-bold bg-[#004b93] hover:bg-[#003a73] text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Cart</span>
                </button>
              )}
            </div>

            {/* Description */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 mb-1.5">About This Product</h4>
              <p className="text-xs text-slate-600 leading-relaxed max-h-36 overflow-y-auto pr-1">
                {product.description ||
                  'Manufactured under strict ISO and CE quality standards. Suitable for hospital, clinical, or home healthcare usage. Guaranteed sterile and safe.'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
