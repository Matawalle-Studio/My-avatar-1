import React, { useState } from 'react';
import { MessageCircle, X, Send, Clock, CheckCheck } from 'lucide-react';

interface FloatingWhatsAppButtonProps {
  whatsappNumber: string;
  hasMobileCartBar?: boolean;
}

const PRESET_QUESTIONS = [
  'Hi! I would like to check stock for a flavor / device.',
  'How much is same-day Lalamove delivery to my area?',
  'Can I self-collect at the Sri Gombak shop today?',
  'What salt nic pod flavor do you recommend for sweet icy taste?',
];

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  whatsappNumber,
  hasMobileCartBar = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');

  const openWhatsApp = (messageText: string) => {
    const text = messageText.trim() || 'Hi 7 Vape Taman Sri Gombak, I have an enquiry!';
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customMsg.trim()) {
      openWhatsApp(customMsg);
      setCustomMsg('');
    }
  };

  return (
    <div
      className={`fixed ${
        hasMobileCartBar ? 'bottom-20' : 'bottom-6'
      } right-4 sm:bottom-8 sm:right-8 z-40 flex flex-col items-end transition-all duration-200`}
    >
      {/* Popover Chat Launcher Window */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2.5rem)] sm:w-80 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden animate-fade-in flex flex-col backdrop-blur-md">
          {/* Popover Header */}
          <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 p-4 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                {/* Active status indicator */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-neutral-950 rounded-full" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-red-500 font-display font-black text-sm">7</span>
                  <span className="text-white font-bold text-xs uppercase">Vape Sri Gombak</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-neutral-400 mt-0.5">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  <span>Online · Daily 11 AM - 12 AM</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close WhatsApp chat popup"
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body Greeting */}
          <div className="p-4 space-y-3 bg-neutral-950/60 max-h-72 overflow-y-auto text-xs">
            {/* Store Greeting Bubble */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl rounded-tl-sm p-3 text-neutral-200 space-y-1.5 shadow-sm max-w-[90%]">
              <p className="font-medium text-white">
                👋 Salam! Welcome to 7 Vape Taman Sri Gombak.
              </p>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Need help finding a pod flavor, checking stock, or asking about same-day delivery?
              </p>
              <div className="flex items-center justify-end gap-1 text-[10px] text-neutral-500 pt-1">
                <span>Just now</span>
                <CheckCheck className="w-3 h-3 text-emerald-400" />
              </div>
            </div>

            {/* Quick Question Presets */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block px-1">
                Frequent Questions:
              </span>
              {PRESET_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => openWhatsApp(q)}
                  className="w-full text-left p-2.5 bg-neutral-900/90 hover:bg-neutral-850 border border-neutral-800 hover:border-red-500/40 rounded-xl text-neutral-300 hover:text-white text-[11px] transition-all cursor-pointer flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{q}</span>
                  <Send className="w-3 h-3 text-neutral-500 group-hover:text-red-400 shrink-0 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Input & Send to WhatsApp */}
          <form onSubmit={handleSendCustom} className="p-3 bg-neutral-950 border-t border-neutral-800 flex gap-2">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 bg-neutral-900 border border-neutral-750 rounded-xl px-3 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-red-500"
            />
            <button
              type="submit"
              className="p-2.5 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-neutral-950 font-bold rounded-xl transition-all cursor-pointer shadow-md shrink-0 flex items-center justify-center"
              title="Send to WhatsApp"
            >
              <Send className="w-4 h-4 fill-neutral-950" />
            </button>
          </form>
        </div>
      )}

      {/* Main Persistent Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open WhatsApp direct chat"
        className="group relative flex items-center gap-2.5 p-3.5 sm:px-4 sm:py-3 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-neutral-950 font-bold text-xs rounded-full shadow-[0_4px_25px_rgba(37,211,102,0.4)] transition-all cursor-pointer duration-300 hover:shadow-[0_6px_30px_rgba(37,211,102,0.55)]"
      >
        <MessageCircle className="w-6 h-6 fill-neutral-950 shrink-0" />
        <span className="hidden sm:inline font-extrabold tracking-wide text-neutral-950 whitespace-nowrap">
          Chat on WhatsApp
        </span>

        {/* Small live notification pulse dot */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border-2 border-neutral-950" />
        </span>
      </button>
    </div>
  );
};
