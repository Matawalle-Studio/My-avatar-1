import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onSelectCategory: (category: string) => void;
  activeCategory: string;
  onScrollToRefills: () => void;
  onScrollToStore: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onSelectCategory,
  onScrollToRefills,
  onScrollToStore,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark matching the 7 VAPE signage logo */}
        <a
          href="#home"
          className="text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2 group"
        >
          {/* Vibrant Red "7" and Embossed White "VAPE" */}
          <span className="font-display text-2xl sm:text-3xl font-black text-red-500 group-hover:text-red-400 transition-colors drop-shadow-[0_2px_10px_rgba(239,68,68,0.4)]">
            7
          </span>
          <span className="font-display text-lg sm:text-xl tracking-wider uppercase font-black text-white">
            VAPE
          </span>
          <span className="text-[9px] uppercase tracking-wider text-neutral-400 hidden sm:inline-block ml-1 border-l border-neutral-800 pl-2 font-medium">
            Sri Gombak
          </span>
        </a>

        {/* Zone 2: Clean single-line nav links (Top Bar Contract: 4-5 concise single-line links) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400 whitespace-nowrap shrink-0">
          <button
            onClick={() => onSelectCategory('all')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            All Products
          </button>
          <button
            onClick={onScrollToRefills}
            className="hover:text-red-400 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span>Refill Flavors</span>
          </button>
          <button
            onClick={() => onSelectCategory('disposable')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Disposables
          </button>
          <button
            onClick={() => onSelectCategory('pod-kits')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Pod Systems
          </button>
          <button
            onClick={onScrollToStore}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Shop Info
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (Red CTA Button matching 7 logo) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            aria-label={`View Cart, ${cartCount} items, total RM ${cartTotal.toFixed(2)}`}
            className="relative flex items-center gap-2.5 px-3.5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-500 active:scale-[0.98] rounded-lg transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] cursor-pointer whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            <span className="hidden sm:inline">Cart</span>
            <span className="font-mono tabular-nums font-bold">
              {cartCount > 0 ? `(${cartCount}) · RM ${cartTotal.toFixed(2)}` : 'RM 0.00'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
