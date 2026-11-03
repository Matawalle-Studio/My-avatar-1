import React, { useState } from 'react';
import { X, Check, ShoppingBag, Plus, Minus, Snowflake, Droplets, Star } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { ProductVisual } from './ProductVisual';
import { CustomerReviews } from './CustomerReviews';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  const handleAdd = () => {
    onAddToCart(product, selectedVariant, quantity);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      onClose();
    }, 600);
  };

  const itemTotal = product.price * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto">
          {/* Top Visual Banner */}
          <div className="relative">
            <ProductVisual product={product} size="lg" />
            <div className="absolute bottom-3 left-4 flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-neutral-950/80 px-2.5 py-1 rounded border border-neutral-800 backdrop-blur-xs">
                {product.brand}
              </span>
              {product.nicotineType && (
                <span className="text-xs font-mono text-cyan-300 bg-neutral-950/80 px-2.5 py-1 rounded border border-neutral-800 backdrop-blur-xs">
                  {product.nicotineType}
                </span>
              )}
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1 text-xs">
                <div className="flex items-center text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-mono text-xs font-bold text-white tabular-nums">4.9</span>
                <span className="text-neutral-500">·</span>
                <span className="text-neutral-400 text-[11px]">Customer Verified</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                {product.name}
              </h2>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-sm font-medium text-neutral-400">Price:</span>
                <span className="text-xs font-semibold text-neutral-400">RM</span>
                <span className="font-mono text-2xl font-bold text-white tabular-nums">
                  {product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="font-mono text-sm text-neutral-400 line-through tabular-nums ml-2">
                    RM {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed mt-3">
                {product.description}
              </p>
            </div>

            {/* Refill Flavor Tasting Notes & Cooling Indicator */}
            {(product.flavorNotes || product.coolingLevel) && (
              <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-emerald-400" />
                    Flavor Profile & Taste Notes
                  </span>
                  {product.coolingLevel && (
                    <span className="flex items-center gap-1 text-cyan-400 font-medium">
                      <Snowflake className="w-3.5 h-3.5" />
                      {product.coolingLevel}
                    </span>
                  )}
                </div>

                {product.flavorNotes && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {product.flavorNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-neutral-200 bg-neutral-900 border border-neutral-750 px-2.5 py-1 rounded-md"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Specifications Strip */}
            {(product.puffs || product.nicotine || product.capacity) && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 text-xs">
                {product.puffs && (
                  <div>
                    <div className="text-neutral-500 font-medium">Estimated Puffs</div>
                    <div className="text-neutral-200 font-mono font-semibold mt-0.5">
                      {product.puffs}
                    </div>
                  </div>
                )}
                {product.nicotine && (
                  <div>
                    <div className="text-neutral-500 font-medium">Nicotine Level</div>
                    <div className="text-neutral-200 font-mono font-semibold mt-0.5">
                      {product.nicotine}
                    </div>
                  </div>
                )}
                {product.capacity && (
                  <div>
                    <div className="text-neutral-500 font-medium">Bottle / Pod Size</div>
                    <div className="text-neutral-200 font-mono font-semibold mt-0.5">
                      {product.capacity}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Variant Selector (Flavor / Color / Spec) */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                  Select {product.variantLabel}
                </label>
                <span className="text-xs text-emerald-400 font-medium">
                  {selectedVariant.name}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`flex items-center justify-between p-3 rounded-lg text-xs font-medium border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-red-950/40 border-red-500 text-white shadow-xs'
                          : 'bg-neutral-800/60 border-neutral-700/70 text-neutral-300 hover:border-neutral-600 hover:text-white'
                      }`}
                    >
                      <span className="truncate pr-2">{v.name}</span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & Add to Cart Action */}
            <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <span className="text-xs font-medium text-neutral-400">Quantity</span>
                <div className="flex items-center bg-neutral-950 border border-neutral-750 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-1.5 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-sm text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1.5 text-neutral-400 hover:text-white cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-3 bg-red-600 hover:bg-red-500 active:scale-[0.98] text-white font-bold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                <span>Add to Cart</span>
                <span className="font-mono tabular-nums font-bold ml-1">
                  · RM {itemTotal.toFixed(2)}
                </span>
              </button>
            </div>

            {/* Added Toast */}
            {addedToast && (
              <div className="p-2.5 bg-red-950 border border-red-500/50 rounded-lg text-red-200 text-xs text-center font-medium animate-fade-in flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-red-400" />
                <span>Added to cart!</span>
              </div>
            )}

            {/* Customer Reviews & Feedback Section */}
            <CustomerReviews product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};
