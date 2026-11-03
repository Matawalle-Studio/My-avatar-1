import React from 'react';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, Tag, MapPin } from 'lucide-react';

interface StoreBannerProps {
  onScrollToRefills: () => void;
  whatsappNumber: string;
}

export const StoreBanner: React.FC<StoreBannerProps> = ({
  onScrollToRefills,
  whatsappNumber,
}) => {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');

  const openCounterWhatsApp = () => {
    const text = encodeURIComponent(
      'Hi 7 Vape Sri Gombak! I saw your counter banner with the ELON & VEUZ pods / Salt Nic 3 for RM40 deal. Can I check current stock?'
    );
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="relative rounded-2xl sm:rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 overflow-hidden shadow-2xl">
        {/* Ambient background glow matching 7 Vape branding */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-red-900/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10 p-5 sm:p-8 lg:p-10">
          {/* Left Column: Promotion & Store Welcome */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Counter Arrival
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs border border-neutral-700">
                <MapPin className="w-3 h-3 text-red-400" />
                Jalan SG 3/1, Sri Gombak
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white leading-tight">
                Meet the 7 Vape Team &amp; <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-300">
                  Explore Fresh In-Store Arrivals
                </span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 mt-2.5 leading-relaxed max-w-xl">
                Ready to level up your vaping experience? Check out the newly arrived <strong>ELON Breathing-Light Pod Kits</strong> and our huge wall of <strong>VEUZ Pod Flavors &amp; Bottled Salt Nics</strong>.
              </p>
            </div>

            {/* In-Store Counter Deal Badge */}
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-neutral-950/80 border border-red-500/30 flex items-start sm:items-center gap-3 shadow-inner">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
                <Tag className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                    Counter Special Deal
                  </span>
                  <span className="text-[10px] bg-red-600/30 text-red-300 px-1.5 py-0.5 rounded font-bold">
                    HOT
                  </span>
                </div>
                <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                  All Local 10ml / 15ml Salt Nic: <span className="text-red-400 font-extrabold">3 BOTTLES = RM 40</span>
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  Available for in-person walk-ins and direct WhatsApp dispatch.
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={openCounterWhatsApp}
                className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-neutral-950 font-bold text-xs sm:text-sm transition-all shadow-[0_4px_20px_rgba(37,211,102,0.35)] cursor-pointer flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-neutral-950" />
                <span>Ask Counter Staff on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={onScrollToRefills}
                className="px-5 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-750 active:scale-95 text-white font-semibold text-xs sm:text-sm border border-neutral-700 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Browse Refill Flavors</span>
                <ArrowRight className="w-4 h-4 text-red-400" />
              </button>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-neutral-400 pt-1">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Authentic Warrantied Stock</span>
              </div>
              <span>·</span>
              <span>Friendly Advice &amp; Flavor Recommendations</span>
            </div>
          </div>

          {/* Right Column: High-Fidelity In-Store Banner Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none rounded-2xl overflow-hidden border-2 border-neutral-700/80 group shadow-2xl bg-neutral-950">
              <img
                src="/assets/aistudio/image_e5194242.png"
                alt="7 Vape Store Staff & ELON VEUZ Pod Flavor Showcase"
                className="w-full h-72 sm:h-84 lg:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none" />

              {/* Tag overlaid on image */}
              <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-bold text-white tracking-wide">
                  Live at 7 Vape Sri Gombak
                </span>
              </div>

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-3 inset-x-3 bg-neutral-950/90 backdrop-blur-md p-2.5 rounded-xl border border-neutral-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white text-[11px] flex items-center gap-1.5">
                    <span className="text-red-500 font-display font-black">7</span>
                    <span>ELON &amp; VEUZ Pod Bar</span>
                  </div>
                  <div className="text-[10px] text-neutral-400">
                    Over 50+ Flavors &amp; Cartridge Refills Available
                  </div>
                </div>

                <button
                  type="button"
                  onClick={openCounterWhatsApp}
                  className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white font-bold text-[10px] rounded-lg transition-colors cursor-pointer"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
