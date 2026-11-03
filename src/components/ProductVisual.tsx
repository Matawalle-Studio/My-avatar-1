import React from 'react';
import { Product } from '../types';

interface ProductVisualProps {
  product: Product;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  product,
  className = '',
  size = 'md',
}) => {
  const { deviceType, colorTheme, brand, puffs, capacity } = product;

  return (
    <div
      className={`relative w-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-neutral-900 to-neutral-950 border-b border-neutral-800/60 group-hover:border-neutral-700/60 transition-colors ${className}`}
      style={{ minHeight: size === 'lg' ? '300px' : size === 'sm' ? '140px' : '220px' }}
    >
      {/* Dynamic Ambient Background Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colorTheme} opacity-40 blur-2xl pointer-events-none group-hover:opacity-70 transition-opacity duration-500`}
      />

      {/* Subtle Grid Backdrop */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* Device Vector Illustration based on deviceType */}
      <div className="relative z-10 flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105">
        {deviceType === 'disposable' && (
          <div className="relative flex flex-col items-center">
            {/* Mouthpiece */}
            <div className="w-7 h-5 bg-neutral-800 rounded-t-md border-t border-x border-neutral-700 shadow-inner" />
            {/* Device Body */}
            <div className="w-16 h-36 bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 rounded-2xl p-2 flex flex-col items-center justify-between border border-neutral-700/80 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              {/* Brand mark */}
              <div className="text-[9px] font-bold tracking-widest uppercase text-neutral-400 mt-1">
                {brand}
              </div>
              {/* Flavor / puff visual indicator */}
              <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center my-auto">
                <span className="text-[10px] font-mono text-red-400 font-bold">
                  {puffs ? puffs.replace(' Puffs', '') : '10K'}
                </span>
              </div>
              {/* Bottom LED indicator ring */}
              <div className="w-6 h-1 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            </div>
            {/* Reflected Base */}
            <div className="w-10 h-1.5 bg-black/40 rounded-full blur-[2px] mt-1" />
          </div>
        )}

        {deviceType === 'open-pod' && (
          <div className="relative flex flex-col items-center">
            {/* Transparent Cartridge */}
            <div className="w-12 h-10 bg-neutral-800/80 border border-neutral-700 rounded-t-lg flex items-center justify-center backdrop-blur-xs relative overflow-hidden">
              <div className="w-8 h-4 bg-red-500/20 rounded-t-sm mt-auto" />
            </div>
            {/* Battery Body */}
            <div className="w-14 h-40 bg-gradient-to-b from-neutral-800 via-neutral-850 to-neutral-950 rounded-b-xl border border-neutral-700 p-2 flex flex-col justify-between items-center shadow-2xl relative">
              <div className="text-[9px] font-semibold text-neutral-400 tracking-wider uppercase mt-1">
                {brand}
              </div>
              {/* Screen Display */}
              <div className="w-10 h-8 bg-neutral-950 border border-neutral-700/80 rounded p-1 flex flex-col items-center justify-center">
                <span className="text-[8px] font-mono text-red-400 font-bold">25.0W</span>
                <span className="text-[7px] font-mono text-neutral-500">0.6Ω</span>
              </div>
              {/* Single Button & Fire Bar */}
              <div className="w-5 h-2 rounded-full bg-neutral-700 border border-neutral-600 mb-2" />
            </div>
          </div>
        )}

        {deviceType === 'closed-pod' && (
          <div className="relative flex flex-col items-center">
            {/* Pre-filled pod */}
            <div className="w-9 h-9 bg-neutral-800/90 border border-neutral-700 rounded-t-xl flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-red-500/40 blur-[1px]" />
            </div>
            {/* Minimalist Slim Body */}
            <div className="w-10 h-36 bg-gradient-to-b from-neutral-800 via-neutral-900 to-black rounded-b-2xl border border-neutral-700/60 p-2 flex flex-col items-center justify-between shadow-xl">
              <div className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-[0_0_6px_rgba(255,255,255,0.8)] mt-6" />
              <div className="text-[8px] font-bold text-neutral-400 tracking-widest uppercase mb-4 rotate-90">
                {brand}
              </div>
            </div>
          </div>
        )}

        {deviceType === 'liquid' && (
          <div className="relative flex flex-col items-center">
            {/* Dropper Cap */}
            <div className="w-6 h-6 bg-neutral-800 rounded-t-sm border border-neutral-750" />
            <div className="w-8 h-2 bg-neutral-700" />
            {/* Bottle Cylinder */}
            <div className="w-16 h-32 bg-gradient-to-b from-neutral-850 via-neutral-900 to-neutral-950 rounded-b-xl border border-neutral-750 p-2 flex flex-col justify-between items-center relative overflow-hidden shadow-2xl">
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-l from-white/10 to-transparent" />
              {/* Liquid Label */}
              <div className="w-full bg-neutral-950/80 border border-neutral-700/60 rounded p-1 text-center mt-2">
                <div className="text-[8px] font-bold text-amber-400 uppercase truncate">
                  {brand}
                </div>
                <div className="text-[7px] text-neutral-400 mt-0.5">
                  {capacity || '30ml'}
                </div>
              </div>
              <div className="text-[8px] font-mono text-red-400 font-semibold mb-1">
                SALT / FB
              </div>
            </div>
          </div>
        )}

        {deviceType === 'accessory' && (
          <div className="relative flex flex-col items-center justify-center p-3">
            <div className="w-20 h-24 bg-neutral-900 border border-neutral-750 rounded-xl p-2 flex flex-col items-center justify-between shadow-lg">
              <div className="w-12 h-12 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full border-2 border-red-500/60 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                </div>
              </div>
              <div className="text-[8px] font-bold text-neutral-400 uppercase text-center truncate w-full">
                {brand}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subtle Bottom Spec pill */}
      {puffs && (
        <div className="absolute bottom-2 right-2 text-[10px] font-mono text-neutral-400 bg-neutral-900/90 border border-neutral-800 px-1.5 py-0.5 rounded backdrop-blur-xs">
          {puffs}
        </div>
      )}
      {capacity && !puffs && (
        <div className="absolute bottom-2 right-2 text-[10px] font-mono text-neutral-400 bg-neutral-900/90 border border-neutral-800 px-1.5 py-0.5 rounded backdrop-blur-xs">
          {capacity}
        </div>
      )}
    </div>
  );
};
