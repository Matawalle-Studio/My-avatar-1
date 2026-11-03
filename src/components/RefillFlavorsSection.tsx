import React, { useState, useMemo } from 'react';
import { Sparkles, Droplets, Flame, Snowflake, Coffee, Apple, GlassWater, Plus } from 'lucide-react';
import { Product, FlavorProfile } from '../types';
import { ProductVisual } from './ProductVisual';

interface RefillFlavorsSectionProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const RefillFlavorsSection: React.FC<RefillFlavorsSectionProps> = ({
  products,
  onOpenDetails,
  onQuickAdd,
}) => {
  const [selectedProfile, setSelectedProfile] = useState<string>('all');
  const [selectedNicType, setSelectedNicType] = useState<string>('all');

  // Filter only products marked as refill flavors
  const refillProducts = useMemo(() => {
    return products.filter((p) => p.isRefillFlavor || p.category === 'refill-flavors' || p.category === 'eliquids');
  }, [products]);

  // Apply profile and nicotine type filters
  const filteredRefills = useMemo(() => {
    return refillProducts.filter((product) => {
      if (selectedProfile !== 'all' && product.flavorProfile !== selectedProfile) {
        return false;
      }
      if (selectedNicType !== 'all' && product.nicotineType !== selectedNicType) {
        return false;
      }
      return true;
    });
  }, [refillProducts, selectedProfile, selectedNicType]);

  const profileFilters = [
    { id: 'all', label: 'All Refills', icon: Sparkles },
    { id: 'fruity-ice', label: 'Fruity & Iced', icon: Apple },
    { id: 'drinks-beverage', label: 'Drinks & Shisha', icon: GlassWater },
    { id: 'tobacco-coffee', label: 'Tobacco & Brews', icon: Coffee },
    { id: 'creamy-dessert', label: 'Creamy & Dessert', icon: Flame },
    { id: 'mint-menthol', label: 'Mint & Menthol', icon: Snowflake },
  ];

  return (
    <section id="refill-flavors" className="relative py-16 border-t border-neutral-800 bg-neutral-950 overflow-hidden">
      {/* Authentic In-Store Refill Station Background Image */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <img
          src="/assets/aistudio/image_e5194242.png"
          alt="7 Vape Storefront Refill Station & Tasting Shelves"
          className="w-full h-full object-cover object-[center_30%] opacity-20 sm:opacity-25 filter brightness-70 contrast-115 scale-105"
        />
        {/* Multilayered Gradients for High Readability and Brand Aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/80 to-neutral-950" />
        <div className="absolute inset-0 bg-radial-[circle_at_top] from-red-950/20 via-transparent to-neutral-950/90" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-400 uppercase tracking-widest bg-red-950/70 border border-red-800/60 px-3 py-1 rounded-md mb-2 shadow-sm backdrop-blur-xs">
              <Droplets className="w-3.5 h-3.5 text-red-400" />
              <span>In-Store Refill Station · Sri Gombak Counter</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              Refill Flavors Station
            </h2>
            <p className="text-sm text-neutral-300 mt-1 max-w-2xl">
              Authentic bottled e-liquids and pre-filled cartridge refills straight from our Sri Gombak shop shelves. Choose your taste notes, cooling chill, and nicotine strength.
            </p>
          </div>

          {/* Nicotine Type Filter Buttons */}
          <div className="flex items-center gap-1.5 bg-neutral-900 p-1 rounded-xl border border-neutral-800 self-start md:self-auto">
            <button
              onClick={() => setSelectedNicType('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedNicType === 'all'
                  ? 'bg-neutral-800 text-white font-semibold shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setSelectedNicType('Salt Nic')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedNicType === 'Salt Nic'
                  ? 'bg-red-600 text-white font-bold shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Salt Nic (Pod Kits)
            </button>
            <button
              onClick={() => setSelectedNicType('Freebase')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedNicType === 'Freebase'
                  ? 'bg-red-600 text-white font-bold shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Freebase (Sub-Ohm / Mod)
            </button>
          </div>
        </div>

        {/* Flavor Profile Taste Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {profileFilters.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedProfile === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedProfile(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-neutral-100 text-neutral-950 font-bold shadow-md'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-850 border border-neutral-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-red-600' : 'text-neutral-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Refill Flavor Compatibility Tip Banner */}
        <div className="mb-8 p-3.5 bg-neutral-900/90 backdrop-blur-md border border-neutral-800 rounded-xl text-xs text-neutral-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2.5">
            <span className="p-1 rounded-md bg-red-500/10 text-red-400 shrink-0 font-bold font-mono">
              TIP
            </span>
            <span>
              <strong>Refill Recommendation:</strong> Use Salt Nic bottles for 0.6Ω - 1.2Ω pod cartridges (OXVA, Caliburn). Use Freebase 60ml for sub-ohm tank mods.
            </span>
          </div>
          <span className="text-neutral-400 shrink-0">
            {filteredRefills.length} refill options available
          </span>
        </div>

        {/* Refill Flavor Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRefills.map((product) => {
            return (
              <div
                key={product.id}
                onClick={() => onOpenDetails(product)}
                className="group relative flex flex-col bg-neutral-900/90 backdrop-blur-md border border-neutral-800/90 hover:border-red-500/60 rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/70 cursor-pointer"
              >
                {/* Visual */}
                <ProductVisual product={product} size="md" />

                {/* Content */}
                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    {/* Header info */}
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
                      <span className="uppercase tracking-wider font-semibold text-neutral-400">
                        {product.brand}
                      </span>
                      {product.nicotineType && (
                        <span className="text-[11px] font-mono text-red-400 font-medium">
                          {product.nicotineType}
                        </span>
                      )}
                    </div>

                    <h3 className="font-semibold text-neutral-100 text-sm sm:text-base leading-snug group-hover:text-red-300 transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Tasting Notes */}
                    {product.flavorNotes && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {product.flavorNotes.map((note, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] text-neutral-300 bg-neutral-950 border border-neutral-800 px-2 py-0.5 rounded"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Cooling & Volume info */}
                    <div className="flex items-center gap-3 text-xs text-neutral-400 mt-2.5">
                      {product.coolingLevel && (
                        <span className="flex items-center gap-1 text-[11px]">
                          <Snowflake className="w-3 h-3 text-cyan-400" />
                          <span>{product.coolingLevel}</span>
                        </span>
                      )}
                      {product.capacity && (
                        <span className="text-[11px] font-mono text-neutral-400">
                          {product.capacity}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between gap-2 mt-auto">
                    <div>
                      <div className="text-[11px] text-neutral-400">
                        {product.variants.length} flavor option{product.variants.length > 1 ? 's' : ''}
                      </div>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-xs font-semibold text-neutral-400">RM</span>
                        <span className="font-mono text-base font-bold text-white tabular-nums">
                          {product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="font-mono text-xs text-neutral-400 line-through tabular-nums ml-1">
                            RM {product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDetails(product);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors cursor-pointer shrink-0 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Select</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
