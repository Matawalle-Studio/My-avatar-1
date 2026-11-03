import React from 'react';
import { Sparkles, ArrowRight, Zap, Droplets, Truck, Store, Flame } from 'lucide-react';
import { CategoryType } from '../types';

interface PromoItem {
  id: string;
  badge: string;
  badgeColor: string;
  headline: string;
  actionText: string;
  targetCategory?: CategoryType;
  targetSearch?: string;
  icon: React.ElementType;
}

const PROMO_ITEMS: PromoItem[] = [
  {
    id: 'promo-voltbar',
    badge: 'NEW ARRIVAL',
    badgeColor: 'text-amber-400 bg-amber-950/80 border-amber-800/80',
    headline: 'Voltbar Switch 12,000 Puffs restocked in 6 signature flavors',
    actionText: 'View Disposables',
    targetCategory: 'disposable',
    icon: Flame,
  },
  {
    id: 'promo-oxva',
    badge: 'HOT DEAL',
    badgeColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-800/80',
    headline: 'OXVA Xlim Pro 2 (30W) Pod Kits now only RM 115.00',
    actionText: 'Shop Kit',
    targetCategory: 'pod-kits',
    icon: Zap,
  },
  {
    id: 'promo-kardinal',
    badge: 'FLAVOR DROP',
    badgeColor: 'text-cyan-400 bg-cyan-950/80 border-cyan-800/80',
    headline: 'Kardinal Kristal & Tokyo Salt Super Cool series in stock',
    actionText: 'Explore Refills',
    targetCategory: 'refill-flavors',
    icon: Droplets,
  },
  {
    id: 'promo-delivery',
    badge: 'SAME-DAY DISPATCH',
    badgeColor: 'text-blue-400 bg-blue-950/80 border-blue-800/80',
    headline: 'Lalamove / Grab delivery available across Gombak & Klang Valley',
    actionText: 'Order Now',
    icon: Truck,
  },
  {
    id: 'promo-pickup',
    badge: 'FREE PICKUP',
    badgeColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-800/80',
    headline: 'Self-collect at No. 31-G, Jalan SG 3/1, Taman Sri Gombak',
    actionText: 'Store Info',
    icon: Store,
  },
  {
    id: 'promo-nasty',
    badge: 'BEST SELLER',
    badgeColor: 'text-yellow-400 bg-yellow-950/80 border-yellow-800/80',
    headline: 'Nasty Juice Cush Man 60ml Freebase ripe mango classic restock',
    actionText: 'Shop Liquid',
    targetCategory: 'refill-flavors',
    targetSearch: 'Nasty',
    icon: Sparkles,
  },
];

interface PromoMarqueeProps {
  onSelectCategory: (category: CategoryType) => void;
  onSearch: (query: string) => void;
  onScrollToStore: () => void;
}

export const PromoMarquee: React.FC<PromoMarqueeProps> = ({
  onSelectCategory,
  onSearch,
  onScrollToStore,
}) => {
  const handleClick = (item: PromoItem) => {
    if (item.targetCategory) {
      onSelectCategory(item.targetCategory);
    }
    if (item.targetSearch) {
      onSearch(item.targetSearch);
    }
    if (item.id === 'promo-pickup') {
      onScrollToStore();
    }
  };

  return (
    <div className="relative mb-8 overflow-hidden rounded-xl border border-red-500/30 bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 shadow-md">
      {/* Decorative Leading Indicator */}
      <div className="absolute left-0 top-0 bottom-0 z-20 hidden sm:flex items-center gap-2 pl-4 pr-3 bg-gradient-to-r from-neutral-950 via-neutral-950/95 to-transparent">
        <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-red-500 font-display whitespace-nowrap">
          Live Updates
        </span>
        <div className="h-4 w-px bg-neutral-800 ml-1" />
      </div>

      {/* Edge Scrim Gradients for Seamless Fading */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-neutral-950 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-neutral-950 to-transparent z-10" />

      {/* Continuous Marquee Track */}
      <div className="py-2.5 overflow-hidden">
        <div className="animate-marquee flex items-center">
          {/* First loop */}
          {PROMO_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={`m1-${item.id}`}
                onClick={() => handleClick(item)}
                className="group mx-4 inline-flex items-center gap-3 text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                    item.badgeColor.includes('amber')
                      ? 'text-amber-400 bg-amber-950/80 border-amber-800/80'
                      : item.badgeColor.includes('blue')
                      ? 'text-sky-400 bg-sky-950/80 border-sky-800/80'
                      : 'text-red-400 bg-red-950/80 border-red-800/80'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{item.badge}</span>
                </span>
                <span className="font-medium text-neutral-200 group-hover:text-red-300 transition-colors">
                  {item.headline}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-red-400 font-semibold group-hover:underline">
                  <span>{item.actionText}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
                <span className="text-neutral-700 ml-3 font-mono">·</span>
              </button>
            );
          })}

          {/* Duplicated loop for infinite scroll without jerk */}
          {PROMO_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={`m2-${item.id}`}
                onClick={() => handleClick(item)}
                className="group mx-4 inline-flex items-center gap-3 text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                    item.badgeColor.includes('amber')
                      ? 'text-amber-400 bg-amber-950/80 border-amber-800/80'
                      : item.badgeColor.includes('blue')
                      ? 'text-sky-400 bg-sky-950/80 border-sky-800/80'
                      : 'text-red-400 bg-red-950/80 border-red-800/80'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{item.badge}</span>
                </span>
                <span className="font-medium text-neutral-200 group-hover:text-red-300 transition-colors">
                  {item.headline}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-red-400 font-semibold group-hover:underline">
                  <span>{item.actionText}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
                <span className="text-neutral-700 ml-3 font-mono">·</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
