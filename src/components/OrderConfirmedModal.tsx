import React, { useState } from 'react';
import { CheckCircle2, Copy, ExternalLink, MessageCircle, ArrowRight, Store } from 'lucide-react';
import { PlacedOrder } from '../types';

interface OrderConfirmedModalProps {
  order: PlacedOrder | null;
  onClose: () => void;
  whatsappNumber: string;
}

export const OrderConfirmedModal: React.FC<OrderConfirmedModalProps> = ({
  order,
  onClose,
  whatsappNumber,
}) => {
  if (!order) return null;

  const [copied, setCopied] = useState(false);

  const cleanWaNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const encodedMessage = encodeURIComponent(order.whatsappMessage);
  const whatsappUrl = `https://wa.me/${cleanWaNumber}?text=${encodedMessage}`;

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(order.whatsappMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard error
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 my-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto text-red-500">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest text-red-400 font-bold">
            Order Transmitted
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
            Order #{order.orderId} Confirmed
          </h2>
          <p className="text-sm text-neutral-300 mt-2 max-w-md mx-auto">
            Your order has been routed to <strong>7 Vape Taman Sri Gombak</strong>. Finalize payment via WhatsApp to dispatch your order.
          </p>
        </div>

        {/* Receipt Box */}
        <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl text-left space-y-3 text-xs">
          <div className="flex justify-between border-b border-neutral-800 pb-2.5">
            <span className="text-neutral-400">Customer</span>
            <span className="text-white font-semibold">{order.customerInfo.name}</span>
          </div>
          <div className="flex justify-between border-b border-neutral-800 pb-2.5">
            <span className="text-neutral-400">Fulfillment</span>
            <span className="text-white font-semibold capitalize">
              {order.customerInfo.deliveryMethod === 'pickup'
                ? 'Store Self Pickup'
                : order.customerInfo.deliveryMethod === 'lalamove'
                ? 'Same-Day Lalamove'
                : 'Postage Courier'}
            </span>
          </div>
          <div className="flex justify-between border-b border-neutral-800 pb-2.5">
            <span className="text-neutral-400">Items Count</span>
            <span className="text-white font-semibold">
              {order.items.reduce((acc, i) => acc + i.quantity, 0)} items
            </span>
          </div>
          <div className="flex justify-between pt-1 text-sm font-bold">
            <span className="text-neutral-300">Total Payable</span>
            <span className="font-mono text-red-500 text-base tabular-nums font-black">
              RM {order.total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 bg-red-600 hover:bg-red-500 active:scale-[0.98] text-white font-bold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.35)] cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-white" />
            <span>Open in WhatsApp</span>
            <ExternalLink className="w-4 h-4 text-white/70" />
          </a>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleCopyMessage}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-xs font-medium rounded-lg border border-neutral-700 transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied!' : 'Copy Order Text'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-xs font-medium rounded-lg border border-neutral-700 transition-colors cursor-pointer"
            >
              <span>Done & Shop More</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Physical Store Address reminder */}
        <div className="pt-2 border-t border-neutral-800/80 text-[11px] text-neutral-500 flex items-center justify-center gap-1.5">
          <Store className="w-3.5 h-3.5 text-neutral-400" />
          <span>7 Vape · No. 31-G, Jalan SG 3/1, Taman Sri Gombak</span>
        </div>
      </div>
    </div>
  );
};
