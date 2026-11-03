import React from 'react';
import { Search, MapPin, MessageSquare, Clock, ShieldCheck, Droplets } from 'lucide-react';
import { STORE_DATA } from '../data/products';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onScrollToCatalog: () => void;
  onScrollToRefills: () => void;
  onScrollToStore: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onScrollToCatalog,
  onScrollToRefills,
  onScrollToStore,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-neutral-800 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Subtle atmospheric vapor background glow with 7 Vape Red theme */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Store Brief & Direct Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-red-400 bg-red-950/60 border border-red-800/60 px-3 py-1.5 rounded-md">
              <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span>Taman Sri Gombak, Batu Caves</span>
              <span className="text-neutral-500">·</span>
              <span className="text-neutral-300">Open Daily 11 AM – 12 AM</span>
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-red-400 font-bold mb-1">
                Your Trusted Vape Partner
              </div>
              <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.15] text-balance">
                Authentic Vapes & Flavors, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-400">
                  Direct WhatsApp Checkout
                </span>
              </h1>
            </div>

            <p className="text-base text-neutral-300 leading-relaxed max-w-xl">
              Welcome to <strong>7 Vape Taman Sri Gombak</strong>. Browse authentic disposable pods, open pod systems, bottled salt & freebase refill flavors, and replacement cartridges. Select your favorites and tap pay to finalize instantly via WhatsApp.
            </p>

            {/* Live Search Bar */}
            <div className="pt-2 max-w-xl">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search flavors, Nasty Juice, Kardinal, Voltbar, Oxva..."
                  className="w-full bg-neutral-900/90 text-white pl-11 pr-4 py-3 rounded-xl border border-neutral-700/80 focus:border-red-500 focus:outline-hidden focus:ring-1 focus:ring-red-500 text-sm placeholder:text-neutral-500 shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white px-1.5 py-0.5 rounded bg-neutral-800"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onScrollToCatalog}
                className="px-5 py-2.5 text-sm font-bold bg-red-600 hover:bg-red-500 text-white rounded-lg transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] cursor-pointer"
              >
                Browse Catalog
              </button>
              <button
                onClick={onScrollToRefills}
                className="px-4 py-2.5 text-sm font-semibold bg-red-950/50 hover:bg-red-900/60 text-red-300 border border-red-800/60 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
              >
                <Droplets className="w-4 h-4 text-red-400" />
                Refill Flavor Bar
              </button>
              <button
                onClick={onScrollToStore}
                className="px-4 py-2.5 text-sm font-medium bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-red-400" />
                Store Location
              </button>
            </div>
          </div>

          {/* Right Column: Actual Storefront Signboard Showcase & Order Guarantee */}
          <div className="lg:col-span-5 space-y-4">
            {/* Storefront Image Showcase */}
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 group shadow-2xl bg-neutral-900">
              <img
                src={STORE_DATA.storefrontImage}
                alt="7 Vape Taman Sri Gombak Storefront Sign"
                className="w-full h-48 sm:h-56 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-display font-black text-xl text-red-500">7</span>
                  <span className="font-display font-black text-base text-white">VAPE</span>
                  <span className="text-[10px] text-neutral-300 font-medium border-l border-neutral-700 pl-2">
                    Taman Sri Gombak
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-black/70 px-2 py-0.5 rounded border border-neutral-700">
                  Physical Storefront
                </span>
              </div>
            </div>

            {/* Quick Guarantees Card */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 space-y-3.5 shadow-xl backdrop-blur-xs">
              <div className="grid grid-cols-1 gap-2.5 text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-md bg-neutral-800 border border-neutral-700 text-red-400 shrink-0">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-white">Direct WhatsApp Checkout</span>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Order details automatically structured for fast payment QR & confirmation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-md bg-neutral-800 border border-neutral-700 text-red-400 shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-white">Self Pickup & Same-Day Dispatch</span>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Ready in 15 mins at Jalan SG 3/1 or same-day Lalamove across Klang Valley.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-md bg-neutral-800 border border-neutral-700 text-red-400 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-white">100% Authentic Stock</span>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Original verified devices, sealed pods, and genuine factory batch e-liquids.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Contact Ribbon */}
              <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                <span>Tel: {STORE_DATA.phone}</span>
                <a
                  href={`https://wa.me/${STORE_DATA.whatsappPhone}?text=Hi%207%20Vape%20Taman%20Sri%20Gombak,%20I%20have%20an%20enquiry`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-300 font-semibold transition-colors flex items-center gap-1"
                >
                  Direct Inquiry &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
