'use client';

import React from 'react';
import { MapPin, Mail, Phone, Heart } from 'lucide-react';
import { useCart } from './CartContext';

export default function Footer() {
  const { settings } = useCart();
  const phone = settings?.phone || '+971 50 515 2391';
  const email = settings?.email || 'Info@globalcurerx.com';
  const address = settings?.address || 'Shop Number 22, Ground Floor, Building P-15 (France P-15), France Cluster, Warsan 1 / International City, Dubai, United Arab Emirates.';
  const poBox = (settings?.poBox || '').trim();

  return (
    <footer id="contact" className="w-full bg-[#002b5c] text-white pt-10 pb-20 md:pb-10 border-t border-[#001e40]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10 border-b border-white/10">
          
          {/* Left Column: Get In Touch */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-cyan-300">
              Get In Touch
            </h4>
            <div className="flex items-start space-x-3 text-xs text-slate-200 leading-relaxed max-w-sm">
              <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{settings?.storeName || 'Global Cure RX Pharmacy LLC'}</p>
                <p>{address}</p>
                {poBox ? <p className="text-slate-300 mt-0.5">{poBox}</p> : null}
              </div>
            </div>
          </div>

          {/* Right Column: Contact us */}
          <div className="space-y-3 md:pl-12">
            <h4 className="text-sm font-bold tracking-wider uppercase text-cyan-300">
              Contact us
            </h4>
            <div className="space-y-2.5 text-xs text-slate-200">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a
                  href={`mailto:${email}`}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Email: {email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="hover:text-cyan-300 transition-colors font-medium"
                >
                  Phone: {phone}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <p>© {new Date().getFullYear()} Global Cure RX Pharmacy LLC. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Licensed Healthcare & Medical Equipment Provider</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
