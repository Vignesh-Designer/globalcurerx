'use client';

import React from 'react';
import { Phone } from 'lucide-react';
import { useCart } from './CartContext';

export default function MobileBottomBar() {
  const { settings } = useCart();
  const phone = settings?.phone || '+971 50 515 2391';
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

  const handleCall = () => {
    window.location.href = `tel:${phone.replace(/\s+/g, '')}`;
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hello ${settings?.storeName || 'Global Cure RX Pharmacy'}, I have an inquiry about your medical products.`);
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#002b5c] text-white border-t border-[#001e40] shadow-[0_-4px_16px_rgba(0,0,0,0.2)]">
      <div className="grid grid-cols-2 divide-x divide-white/15 h-14">
        {/* Call Us Button */}
        <button
          onClick={handleCall}
          className="flex flex-col items-center justify-center space-y-1 hover:bg-[#003a73] active:bg-[#001e40] transition-colors"
          aria-label="Call pharmacy"
        >
          <Phone className="w-5 h-5 text-white" />
          <span className="text-xs font-semibold tracking-wide">Call us</span>
        </button>

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center space-y-1 hover:bg-[#003a73] active:bg-[#001e40] transition-colors"
          aria-label="Chat on WhatsApp"
        >
          {/* WhatsApp SVG Icon matching brand */}
          <svg
            className="w-5 h-5 text-white fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16C10.6 20.16 9.17 19.78 7.91 19.03L7.61 18.85L4.5 19.67L5.33 16.63L5.13 16.32C4.31 15.01 3.79 13.49 3.79 11.91C3.79 7.37 7.5 3.67 12.05 3.67M9.11 7.27C8.94 7.27 8.66 7.33 8.43 7.59C8.2 7.84 7.55 8.45 7.55 9.69C7.55 10.93 8.45 12.13 8.58 12.3C8.7 12.47 10.34 14.99 12.85 16.08C13.45 16.34 13.91 16.49 14.28 16.61C14.88 16.8 15.43 16.77 15.86 16.71C16.35 16.64 17.36 16.1 17.57 15.51C17.78 14.92 17.78 14.41 17.71 14.31C17.65 14.2 17.48 14.14 17.22 14.01C16.97 13.88 15.7 13.25 15.47 13.17C15.24 13.08 15.07 13.04 14.9 13.3C14.73 13.55 14.25 14.14 14.1 14.31C13.96 14.48 13.81 14.5 13.56 14.37C13.3 14.25 12.49 13.98 11.53 13.13C10.78 12.46 10.28 11.64 10.13 11.39C9.99 11.13 10.12 11 10.25 10.87C10.36 10.76 10.5 10.58 10.63 10.43C10.75 10.28 10.8 10.17 10.88 10C10.97 9.83 10.92 9.69 10.86 9.56C10.8 9.43 10.31 8.24 10.11 7.74C9.91 7.26 9.71 7.32 9.55 7.31C9.4 7.31 9.25 7.27 9.11 7.27Z" />
          </svg>
          <span className="text-xs font-semibold tracking-wide">Whatsapp</span>
        </button>
      </div>
    </div>
  );
}
