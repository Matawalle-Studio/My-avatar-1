import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, MapPin } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onProceedToCheckout: () => void;
  onExplore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExplore,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-900 border-l border-neutral-800 text-white flex flex-col shadow-2xl">
          {/* Header */}
          <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-red-500" />
              <h2 className="font-display text-lg font-bold">Your Order Cart</h2>
              <span className="text-xs font-mono text-neutral-400">
                ({items.reduce((acc, item) => acc + item.quantity, 0)} items)
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-neutral-800 border border-neutral-700/80 flex items-center justify-center text-neutral-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-200 text-base">Your cart is empty</h3>
                  <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                    Explore our collection of disposable pods, pod kits, and e-liquids at 7 Vape Taman Sri Gombak.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onExplore();
                  }}
                  className="px-5 py-2.5 text-xs font-bold bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors cursor-pointer shadow-md"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemTotal = item.product.price * item.quantity;
                return (
                  <div
                    key={item.cartId}
                    className="p-3.5 bg-neutral-950/80 border border-neutral-800 rounded-xl flex items-start gap-3.5"
                  >
                    {/* Small device type badge */}
                    <div className="w-12 h-14 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-mono text-red-400 uppercase font-bold">
                        {item.product.brand.slice(0, 4)}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-semibold text-white leading-tight truncate">
                            {item.product.name}
                          </h4>
                          <div className="text-[11px] text-red-400 font-medium mt-0.5">
                            {item.selectedVariant.name}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.cartId)}
                          aria-label={`Remove ${item.product.name}`}
                          className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-900">
                        {/* Quantity Stepper */}
                        <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-md">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.cartId, item.quantity - 1)
                            }
                            className="p-1 text-neutral-400 hover:text-white transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center font-mono text-xs font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.cartId, item.quantity + 1)
                            }
                            className="p-1 text-neutral-400 hover:text-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="font-mono text-xs font-bold text-white tabular-nums">
                            RM {itemTotal.toFixed(2)}
                          </div>
                          <div className="text-[10px] text-neutral-500 font-mono tabular-nums">
                            @ RM {item.product.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with Summary and Proceed Button */}
          {items.length > 0 && (
            <div className="p-5 border-t border-neutral-800 bg-neutral-950/90 space-y-3.5">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Shop Location</span>
                <span className="text-neutral-200">Taman Sri Gombak</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-300">Total Items Price</span>
                <span className="font-mono text-xl font-bold text-red-500 tabular-nums">
                  RM {subtotal.toFixed(2)}
                </span>
              </div>

              <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800">
                <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>Next step: Select pickup or delivery & finalize order on WhatsApp</span>
              </div>

              <button
                type="button"
                onClick={onProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-red-600 hover:bg-red-500 active:scale-[0.98] text-white font-bold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] cursor-pointer"
              >
                <span>Confirm Order Details</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
