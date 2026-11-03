import React from 'react';
import { Plus, Star } from 'lucide-react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onQuickAdd,
}) => {
  return (
    <div
      onClick={() => onOpenDetails(product)}
      className="group relative flex flex-col bg-neutral-900/80 border border-neutral-800 hover:border-red-500/40 rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/50 cursor-pointer"
    >
      {/* Visual Slot */}
      <ProductVisual product={product} size="md" />

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Unboxed clean metadata (Zero-Pill discipline) */}
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-neutral-400">
              {product.brand}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-0.5 text-amber-400 font-mono text-[11px] font-semibold">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>4.9</span>
              </span>
              {product.tag && (
                <>
                  <span className="text-neutral-700">·</span>
                  <span className="text-[11px] font-medium text-red-400">
                    {product.tag}
                  </span>
                </>
              )}
            </div>
          </div>

          <h3 className="font-semibold text-neutral-100 text-sm sm:text-base leading-snug group-hover:text-red-400 transition-colors line-clamp-2">
            {product.name}
          </h3>

          <p className="text-xs text-neutral-400 line-clamp-2 mt-1.5 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Variants count indicator & Price row */}
        <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="text-[11px] text-neutral-400">
              {product.variants.length} {product.variantLabel.toLowerCase()}{product.variants.length > 1 ? 's' : ''}
            </div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xs font-semibold text-neutral-400">RM</span>
              <span className="font-mono text-base font-bold text-white tabular-nums">
                {product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="font-mono text-xs text-neutral-400 line-through tabular-nums">
                  RM {product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Quick Action Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(product);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-neutral-800 hover:bg-red-600 text-neutral-200 hover:text-white rounded-lg transition-colors border border-neutral-700/80 cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Select</span>
          </button>
        </div>
      </div>
    </div>
  );
};
