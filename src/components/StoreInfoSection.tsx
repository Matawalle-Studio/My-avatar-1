import React, { useState } from 'react';
import { MapPin, MessageSquare, Clock, ShieldCheck, Navigation, Settings, Check } from 'lucide-react';
import { STORE_DATA } from '../data/products';

interface StoreInfoSectionProps {
  currentWhatsappNumber: string;
  onUpdateWhatsappNumber: (newNumber: string) => void;
}

export const StoreInfoSection: React.FC<StoreInfoSectionProps> = ({
  currentWhatsappNumber,
  onUpdateWhatsappNumber,
}) => {
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [tempPhone, setTempPhone] = useState(currentWhatsappNumber);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = tempPhone.replace(/[^0-9]/g, '');
    if (cleanNumber.length >= 8) {
      onUpdateWhatsappNumber(cleanNumber);
      setIsEditingPhone(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  return (
    <section id="store-info" className="py-16 border-t border-neutral-800 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-red-500 font-bold mb-2">
            <span>Your Trusted Vape Partner</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black font-display text-white flex items-center justify-center gap-2">
            <span className="text-red-500 font-black text-3xl sm:text-5xl">7</span>
            <span>VAPE TAMAN SRI GOMBAK</span>
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Your neighborhood vape shop in Batu Caves. Walk-in daily or order online for fast self-pickup & delivery.
          </p>
          <div className="text-[11px] text-neutral-600 font-mono mt-1">
            Dimiliki oleh: JL WORLD MARKETING & RESOURCES (002424401-V)
          </div>
        </div>

        {/* Storefront Photo Banner */}
        <div className="mb-10 rounded-2xl overflow-hidden border border-neutral-800 relative max-w-4xl mx-auto shadow-2xl group">
          <img
            src={STORE_DATA.storefrontImage}
            alt="7 Vape Storefront Signboard Taman Sri Gombak"
            className="w-full h-56 sm:h-72 object-cover object-center group-hover:scale-102 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-2xl text-red-500">7</span>
              <span className="font-display font-black text-xl text-white">VAPE</span>
              <span className="text-xs text-neutral-300 ml-1 border-l border-neutral-700 pl-2">
                No. 31-G, Jalan SG 3/1, Taman Sri Gombak, Batu Caves
              </span>
            </div>
            <a
              href={STORE_DATA.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors shadow-md self-start sm:self-auto"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Physical Store Address & Directions */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-base">Store Address</h3>
                <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                  {STORE_DATA.address}
                </p>
                <div className="text-xs text-neutral-400 mt-2">
                  Located at Jalan SG 3/1, Taman Sri Gombak (near Batu Caves).
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex flex-wrap gap-2">
              <a
                href={STORE_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 bg-neutral-800 hover:bg-neutral-750 text-red-400 text-xs font-semibold rounded-lg transition-colors border border-neutral-700"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Card 2: Operating Hours & Contact */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-base">Hours & Contact</h3>
                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-400">Monday – Sunday</span>
                    <span className="font-mono font-bold text-red-400">11:00 AM – 12:00 AM</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-400">Telephone</span>
                    <span className="font-mono">{STORE_DATA.phone}</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-400">WhatsApp Order Line</span>
                    <span className="font-mono text-white">+{currentWhatsappNumber}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
              <a
                href={`https://wa.me/${currentWhatsappNumber}?text=Hi%207%20Vape%20Taman%20Sri%20Gombak,%20I%20have%20an%20enquiry`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg transition-colors shadow-md"
              >
                <MessageSquare className="w-3.5 h-3.5 text-white" />
                <span>Chat on WhatsApp</span>
              </a>

              {/* Business Owner Quick Settings */}
              <button
                type="button"
                onClick={() => setIsEditingPhone(!isEditingPhone)}
                title="Business Owner: Change receiving WhatsApp number"
                className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: Payments & Verification */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-base">Payment & Verification</h3>
                <div className="mt-3 space-y-2.5 text-xs text-neutral-300">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span>DuitNow QR & Instant Bank Transfer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span>Cash / QR on Store Self-Pickup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span>Strict 18+ ID age verification on handover</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 text-[11px] text-neutral-400">
              Transactions are finalized securely on WhatsApp with live staff confirmation.
            </div>
          </div>
        </div>

        {/* Business Owner Settings Panel (Collapsible) */}
        {isEditingPhone && (
          <div className="mt-6 p-5 bg-neutral-900/90 border border-red-500/40 rounded-xl max-w-lg mx-auto animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-semibold text-white uppercase tracking-wider">
                Store Owner Settings: Receiving WhatsApp Number
              </div>
              <button
                type="button"
                onClick={() => setIsEditingPhone(false)}
                className="text-neutral-400 hover:text-white text-xs cursor-pointer"
              >
                Cancel
              </button>
            </div>
            <p className="text-xs text-neutral-400 mb-3">
              Enter your shop's mobile WhatsApp number with country code (e.g. <code>601361776154</code> for Malaysia +601361776154) where checkout orders will be sent.
            </p>
            <form onSubmit={handleSavePhone} className="flex gap-2">
              <input
                type="text"
                value={tempPhone}
                onChange={(e) => setTempPhone(e.target.value)}
                placeholder="601361776154"
                className="flex-1 bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Save Number
              </button>
            </form>
          </div>
        )}

        {saveSuccess && (
          <div className="mt-4 p-2 bg-red-950 border border-red-500/50 rounded-lg text-red-200 text-xs text-center max-w-sm mx-auto flex items-center justify-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-red-400" />
            <span>Store WhatsApp number successfully updated!</span>
          </div>
        )}
      </div>
    </section>
  );
};
