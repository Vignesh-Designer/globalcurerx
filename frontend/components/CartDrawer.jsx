'use client';

import React from 'react';
import { X, Minus, Plus, ShoppingBag, Phone, Send } from 'lucide-react';
import { useCart } from './CartContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    cartTotal,
    settings
  } = useCart();

  const currency = settings?.currency || 'AED';
  const phone = settings?.phone || '+971 50 515 2391';
  const whatsappNumber = settings?.whatsapp || '+971 50 515 2391';

  // Format WhatsApp message
  const handlePlaceOrderWhatsApp = async () => {
    if (cart.length === 0) return;

    let itemsListText = '';
    cart.forEach((item, index) => {
      itemsListText += `${index + 1}. *${item.title}*\n   Qty: ${item.quantity} | Price: ${item.price * item.quantity} ${currency}\n`;
    });

    const message = 
`Hello ${settings?.storeName || 'Global Cure RX Pharmacy'},

I would like to place an order from your online store:
------------------------------------------
${itemsListText}------------------------------------------
*Subtotal: ${cartTotal} ${currency}*

Please confirm availability and arrange delivery. Thank you!`;

    // Ensure phone number has country code if needed (default India +91 if 10 digits without code, or UAE +971 if starts with 05 / 5)
    let cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
    if (cleanNumber.length === 10 && cleanNumber.startsWith('9')) {
      // Indian 10-digit mobile (like 9789321789)
      cleanNumber = '91' + cleanNumber;
    } else if (cleanNumber.length === 9 && cleanNumber.startsWith('5')) {
      // UAE mobile
      cleanNumber = '971' + cleanNumber;
    } else if (cleanNumber.length === 10 && cleanNumber.startsWith('05')) {
      cleanNumber = '971' + cleanNumber.substring(1);
    }

    const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

    // Log order in backend
    try {
      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          subtotal: cartTotal,
          totalItems: cart.reduce((s, i) => s + i.quantity, 0),
          whatsappUrl: waUrl,
          phone: cleanNumber
        })
      }).catch(err => console.log('Order log error', err));
    } catch (e) {
      // non-blocking
    }

    // Open WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCallUs = () => {
    window.location.href = `tel:${phone.replace(/\s+/g, '')}`;
  };

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          onClick={closeCart}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 transition-opacity duration-300"
        />
      )}

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Shopping cart
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close Shopping Cart"
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16 text-slate-400">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                <ShoppingBag className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-sm font-semibold text-slate-600">Your cart is empty</p>
              <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
                Browse our products and add medicines or equipment to place an order.
              </p>
              <button
                onClick={closeCart}
                className="mt-5 px-5 py-2 bg-[#004b93] text-white text-xs font-bold rounded-full hover:bg-[#003a73]"
              >
                Browse Products
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-start space-x-4 pb-4 border-b border-slate-100 last:border-b-0">
                {/* Product Thumbnail */}
                <div className="w-20 h-20 bg-[#f8fafc] rounded-xl flex items-center justify-center p-2 flex-shrink-0 border border-slate-100">
                  <img
                    src={item.image || '/placeholder-product.png'}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      e.target.src = '/banners/banner_original.png';
                    }}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2 pr-2">
                      {item.title}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                      className="p-1 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs font-bold text-[#31a56d] mt-1" style={{ color: '#31a56d' }}>
                    {item.price} {currency}
                  </p>

                  {/* Quantity Counter */}
                  <div className="inline-flex items-center border border-slate-300 rounded-lg overflow-hidden mt-3 bg-white">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 px-2.5 hover:bg-slate-100 text-slate-600 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-slate-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 px-2.5 hover:bg-slate-100 text-slate-600 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-[#fbfcfd] space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-slate-800">Subtotal</span>
              <span className="text-lg font-black text-[#31a56d]" style={{ color: '#31a56d' }}>
                {cartTotal} {currency}
              </span>
            </div>

            <p className="text-[11px] text-slate-500 text-left">
              Taxes and shipping calculated at checkout
            </p>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-1">
              {/* WhatsApp Order Button */}
              <button
                onClick={handlePlaceOrderWhatsApp}
                className="w-full py-3.5 px-6 rounded-full bg-[#004b93] hover:bg-[#003a73] text-white font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 active:scale-98"
              >
                <span>Place order in whatsapp</span>
              </button>

              {/* Call Us Button */}
              <button
                onClick={handleCallUs}
                className="w-full py-3 px-6 rounded-full border border-slate-800 hover:bg-slate-50 text-slate-900 font-bold text-sm transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4 text-slate-800" />
                <span>Call us</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
