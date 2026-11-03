import React, { useState } from 'react';
import { X, Send, ShieldCheck, MapPin, Truck, Store, ArrowLeft } from 'lucide-react';
import { CartItem, DeliveryMethod, PlacedOrder } from '../types';
import { STORE_DATA } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderPlaced: (order: PlacedOrder) => void;
  whatsappNumber: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderPlaced,
  whatsappNumber,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('pickup');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const deliveryFee =
    deliveryMethod === 'pickup' ? 0 : deliveryMethod === 'postage' ? 8 : 12;

  const grandTotal = subtotal + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please enter your WhatsApp contact number');
      return;
    }
    if (deliveryMethod !== 'pickup' && !address.trim()) {
      setErrorMessage('Please enter your complete delivery address');
      return;
    }
    if (!ageConfirmed) {
      setErrorMessage('You must confirm that you are at least 18 years of age to proceed');
      return;
    }

    const orderNumber = `7V-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-MY', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const deliveryMethodLabel =
      deliveryMethod === 'pickup'
        ? 'Self Pickup at Store (Taman Sri Gombak)'
        : deliveryMethod === 'lalamove'
        ? 'Same-Day Delivery (Lalamove / GrabExpress)'
        : 'Postage Courier (J&T Express / Pos Laju)';

    // Build WhatsApp message
    const itemLines = items
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.product.name}*\n   • ${item.product.variantLabel}: ${item.selectedVariant.name}\n   • Qty: ${item.quantity} x RM ${item.product.price.toFixed(2)} = RM ${(item.product.price * item.quantity).toFixed(2)}`
      )
      .join('\n\n');

    const message = `*NEW ORDER - 7 VAPE TAMAN SRI GOMBAK*
Ref Code: #${orderNumber}
Date: ${formattedDate}

*Customer Details:*
• Name: ${name.trim()}
• Phone: ${phone.trim()}
• Method: ${deliveryMethodLabel}
${deliveryMethod !== 'pickup' ? `• Address: ${address.trim()}\n` : ''}${notes.trim() ? `• Notes: ${notes.trim()}\n` : ''}
*Order Items:*
${itemLines}

*Payment Summary:*
• Items Subtotal: RM ${subtotal.toFixed(2)}
• Delivery Fee: RM ${deliveryFee.toFixed(2)} (${deliveryMethod === 'pickup' ? 'Free Self Pickup' : deliveryMethodLabel})
*TOTAL PAYABLE: RM ${grandTotal.toFixed(2)}*

• Preferred Payment: DuitNow QR / Bank Transfer / Cash on Pickup

Hi 7 Vape Sri Gombak! I would like to confirm my order and receive the DuitNow QR payment details. Thank you!`;

    const placedOrder: PlacedOrder = {
      orderId: orderNumber,
      timestamp: formattedDate,
      items: [...items],
      customerInfo: {
        name: name.trim(),
        phone: phone.trim(),
        deliveryMethod,
        address: address.trim(),
        notes: notes.trim(),
        ageConfirmed,
      },
      subtotal,
      deliveryFee,
      total: grandTotal,
      whatsappMessage: message,
    };

    // Open WhatsApp
    const cleanWaNumber = whatsappNumber.replace(/[^0-9]/g, '');
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanWaNumber}?text=${encodedMessage}`;

    // Safely trigger WhatsApp
    try {
      window.open(whatsappUrl, '_blank');
    } catch {
      // Fallback in case popup blocked
      window.location.href = whatsappUrl;
    }

    onOrderPlaced(placedOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div>
            <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <span>Confirm Order</span>
              <span className="text-xs text-neutral-400 font-normal">
                · 7 Vape Taman Sri Gombak
              </span>
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
          {/* Order Item Summary Accordion / List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Order Items ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </span>
              <span className="font-mono text-xs font-semibold text-neutral-300">
                Subtotal: RM {subtotal.toFixed(2)}
              </span>
            </div>

            <div className="max-h-36 overflow-y-auto space-y-2 p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-xs">
              {items.map((item) => (
                <div
                  key={item.cartId}
                  className="flex items-center justify-between text-neutral-300 py-1 border-b border-neutral-900 last:border-0"
                >
                  <div className="truncate pr-3">
                    <span className="font-medium text-white">{item.product.name}</span>
                    <span className="text-emerald-400 ml-1.5">
                      ({item.selectedVariant.name})
                    </span>
                    <span className="text-neutral-500 ml-1">x {item.quantity}</span>
                  </div>
                  <span className="font-mono font-semibold text-white shrink-0">
                    RM {(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Method Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
              Fulfillment Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setDeliveryMethod('pickup')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  deliveryMethod === 'pickup'
                    ? 'bg-red-950/40 border-red-500 text-white shadow-xs'
                    : 'bg-neutral-800/50 border-neutral-700/70 text-neutral-300 hover:border-neutral-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-red-400" />
                  <span className="text-xs font-bold">Self Pickup</span>
                </div>
                <div className="text-[11px] text-neutral-400 mt-1">
                  At Taman Sri Gombak Shop
                </div>
                <div className="text-xs font-mono font-semibold text-red-400 mt-2">
                  FREE
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod('lalamove')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  deliveryMethod === 'lalamove'
                    ? 'bg-red-950/40 border-red-500 text-white shadow-xs'
                    : 'bg-neutral-800/50 border-neutral-700/70 text-neutral-300 hover:border-neutral-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-red-400" />
                  <span className="text-xs font-bold">Same-Day Delivery</span>
                </div>
                <div className="text-[11px] text-neutral-400 mt-1">
                  Lalamove / GrabExpress
                </div>
                <div className="text-xs font-mono font-semibold text-neutral-200 mt-2">
                  RM 12.00
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod('postage')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  deliveryMethod === 'postage'
                    ? 'bg-red-950/40 border-red-500 text-white shadow-xs'
                    : 'bg-neutral-800/50 border-neutral-700/70 text-neutral-300 hover:border-neutral-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-red-400" />
                  <span className="text-xs font-bold">Postage Courier</span>
                </div>
                <div className="text-[11px] text-neutral-400 mt-1">
                  J&T / Pos Laju (1-2 days)
                </div>
                <div className="text-xs font-mono font-semibold text-neutral-200 mt-2">
                  RM 8.00
                </div>
              </button>
            </div>

            {deliveryMethod === 'pickup' && (
              <div className="mt-2.5 p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-neutral-300 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Pickup Location:</strong> No. 31-G, Jalan SG 3/1, Taman Sri Gombak, 68100 Batu Caves, Selangor.
                </span>
              </div>
            )}
          </div>

          {/* Customer Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                Your Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Danial Azman"
                className="w-full bg-neutral-950 border border-neutral-750 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                WhatsApp Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 012-3456789"
                className="w-full bg-neutral-950 border border-neutral-750 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-red-500"
              />
            </div>
          </div>

          {deliveryMethod !== 'pickup' && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                Complete Delivery Address <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={2}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House / Unit number, street, postcode, city, state"
                className="w-full bg-neutral-950 border border-neutral-750 rounded-lg px-3.5 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-red-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
              Special Instructions / Notes (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Extra cold preference, pickup around 8pm, call upon arrival"
              className="w-full bg-neutral-950 border border-neutral-750 rounded-lg px-3.5 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-red-500"
            />
          </div>

          {/* Age Verification Compliance Checkbox */}
          <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={ageConfirmed}
                onChange={(e) => setAgeConfirmed(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-neutral-700 bg-neutral-900 text-red-600 focus:ring-red-500 accent-red-600"
              />
              <div className="text-xs text-neutral-300">
                <span className="font-semibold text-white">Age Verification Confirmation:</span> I confirm that I am at least <strong>18 years of age</strong> and legally permitted to purchase vape products under Malaysian regulations.
              </div>
            </label>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-950/60 border border-red-800 rounded-lg text-red-200 text-xs">
              {errorMessage}
            </div>
          )}

          {/* Price Breakdown & WhatsApp Pay Action */}
          <div className="pt-4 border-t border-neutral-800 space-y-3">
            <div className="space-y-1.5 text-xs text-neutral-400">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-mono text-neutral-200">RM {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Fulfillment ({deliveryMethod === 'pickup' ? 'Self Pickup' : 'Delivery'})</span>
                <span className="font-mono text-neutral-200">
                  {deliveryFee === 0 ? 'FREE' : `RM ${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-neutral-800">
                <span>Total Amount</span>
                <span className="font-mono text-red-500 text-lg tabular-nums font-black">
                  RM {grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2.5 py-4 px-6 bg-red-600 hover:bg-red-500 active:scale-[0.98] text-white font-bold text-base rounded-xl transition-all shadow-[0_0_25px_rgba(239,68,68,0.35)] cursor-pointer"
            >
              <Send className="w-5 h-5 text-white" />
              <span>Send Order to WhatsApp to Pay</span>
            </button>

            <p className="text-center text-[11px] text-neutral-500">
              Tapping will open WhatsApp with your pre-filled order directly to 7 Vape Sri Gombak (+{whatsappNumber}) for DuitNow QR / payment confirmation.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
