import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, MessageSquare, ThumbsUp } from 'lucide-react';
import { Product, ProductReview } from '../types';

interface CustomerReviewsProps {
  product: Product;
  onReviewAdded?: (newReview: ProductReview) => void;
}

// Default reviews for products if not explicitly provided
const DEFAULT_REVIEWS: Record<string, ProductReview[]> = {
  'prod-voltbar-12k': [
    {
      id: 'rev-vb-1',
      author: 'Hafiz Z.',
      rating: 5,
      date: '2 days ago',
      variantPurchased: 'Grape Apple Ice',
      comment: 'Super icy cold throat hit! Tastes exactly like chilled Ribena and apple. Rechargeable battery charges to full in 25 mins.',
      verifiedBuyer: true,
    },
    {
      id: 'rev-vb-2',
      author: 'Firdaus K.',
      rating: 5,
      date: '1 week ago',
      variantPurchased: 'Ribena Blackcurrant',
      comment: 'Lasted me over 2 weeks of daily use. No burnt taste even towards the end. Collected directly at the Sri Gombak shop.',
      verifiedBuyer: true,
    },
    {
      id: 'rev-vb-3',
      author: 'Jason L.',
      rating: 4,
      date: '2 weeks ago',
      variantPurchased: 'Mango Peach Ice',
      comment: 'Flavor is very rich and sweet. Good airflow draw.',
      verifiedBuyer: true,
    },
  ],
  'prod-oxva-xlim-pro-2': [
    {
      id: 'rev-ox-1',
      author: 'Danial A.',
      rating: 5,
      date: '3 days ago',
      variantPurchased: 'Carbon Fiber Black',
      comment: 'The new color screen and 1300mAh battery is a huge upgrade. Zero leak with the top-fill 0.6 cartridge. 100% authentic QR checked.',
      verifiedBuyer: true,
    },
    {
      id: 'rev-ox-2',
      author: 'Syamil R.',
      rating: 5,
      date: '5 days ago',
      variantPurchased: 'Denim Green',
      comment: 'Best pod kit of 2026 hands down. Hits smooth at 22W with Kardinal salt.',
      verifiedBuyer: true,
    },
  ],
  'prod-nasty-cushman': [
    {
      id: 'rev-nc-1',
      author: 'Azman B.',
      rating: 5,
      date: '4 days ago',
      variantPurchased: 'Cush Man Pure Mango',
      comment: 'The definitive Malaysian mango freebase. High cloud production, crisp subtle mint finish. Always buy from 7 Vape.',
      verifiedBuyer: true,
    },
  ],
  'prod-kardinal-salt': [
    {
      id: 'rev-kd-1',
      author: 'Amirul N.',
      rating: 5,
      date: 'Yesterday',
      variantPurchased: 'Kardinal Gold (Vanilla Tobacco)',
      comment: 'Smooth and aromatic tobacco with a warm hint of vanilla. Gentle on coil life and pairs perfectly with morning coffee.',
      verifiedBuyer: true,
    },
  ],
  'prod-relx-infinity-2': [
    {
      id: 'rev-rx-1',
      author: 'Kevin T.',
      rating: 5,
      date: '1 week ago',
      variantPurchased: 'Obsidian Black',
      comment: 'Boost mode gives a great punch. Original product with sealed warranty. Very fast WhatsApp confirmation.',
      verifiedBuyer: true,
    },
  ],
};

// Generic fallback reviews based on product type
const getFallbackReviews = (product: Product): ProductReview[] => {
  if (DEFAULT_REVIEWS[product.id]) {
    return DEFAULT_REVIEWS[product.id];
  }

  const sampleVariant = product.variants[0]?.name || 'Standard';

  if (product.category === 'refill-flavors' || product.category === 'eliquids') {
    return [
      {
        id: `rev-fb-1-${product.id}`,
        author: 'Faiz M.',
        rating: 5,
        date: '3 days ago',
        variantPurchased: sampleVariant,
        comment: `Authentic flavor and clean vapor. Works great on my pod system with smooth throat satisfaction.`,
        verifiedBuyer: true,
      },
      {
        id: `rev-fb-2-${product.id}`,
        author: 'Marcus C.',
        rating: 5,
        date: '1 week ago',
        variantPurchased: sampleVariant,
        comment: `Sweetness is well-balanced and the cooling sensation is refreshing. Fast self-pickup at Sri Gombak shop.`,
        verifiedBuyer: true,
      },
    ];
  }

  if (product.category === 'disposable') {
    return [
      {
        id: `rev-fb-1-${product.id}`,
        author: 'Khairul A.',
        rating: 5,
        date: '2 days ago',
        variantPurchased: sampleVariant,
        comment: `Super cold hit and lasting battery! Airflow draw is tight and flavorful.`,
        verifiedBuyer: true,
      },
      {
        id: `rev-fb-2-${product.id}`,
        author: 'Wong S.',
        rating: 4,
        date: '5 days ago',
        variantPurchased: sampleVariant,
        comment: `Great device for on-the-go. No spitback or leakage.`,
        verifiedBuyer: true,
      },
    ];
  }

  return [
    {
      id: `rev-fb-1-${product.id}`,
      author: 'Razak H.',
      rating: 5,
      date: '4 days ago',
      variantPurchased: sampleVariant,
      comment: `Original genuine stock from 7 Vape. Works reliably right out of the packaging.`,
      verifiedBuyer: true,
    },
  ];
};

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({
  product,
  onReviewAdded,
}) => {
  // Load reviews from localStorage combined with presets
  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    try {
      const storageKey = `7vape_reviews_${product.id}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return getFallbackReviews(product);
  });

  // Review Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0]?.name || ''
  );
  const [comment, setComment] = useState('');
  const [submittedToast, setSubmittedToast] = useState(false);

  useEffect(() => {
    // When product changes, reload its reviews
    try {
      const storageKey = `7vape_reviews_${product.id}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setReviews(JSON.parse(saved));
      } else {
        setReviews(getFallbackReviews(product));
      }
    } catch {
      setReviews(getFallbackReviews(product));
    }
    setShowAddForm(false);
  }, [product.id]);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : '5.0';

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    const newReview: ProductReview = {
      id: `rev-user-${Date.now()}`,
      author: authorName.trim(),
      rating,
      date: 'Just now',
      variantPurchased: selectedVariant,
      comment: comment.trim(),
      verifiedBuyer: true,
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);

    try {
      localStorage.setItem(`7vape_reviews_${product.id}`, JSON.stringify(updated));
    } catch {
      // ignore
    }

    if (onReviewAdded) {
      onReviewAdded(newReview);
    }

    setAuthorName('');
    setComment('');
    setShowAddForm(false);
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 3000);
  };

  return (
    <div className="pt-6 border-t border-neutral-800 space-y-5">
      {/* Reviews Summary Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Customer Reviews
            </h3>
            <span className="text-xs text-neutral-400">
              ({reviews.length} feedback)
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center text-amber-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3.5 h-3.5 ${
                    star <= Math.round(Number(averageRating))
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-neutral-700'
                  }`}
                />
              ))}
            </div>
            <span className="font-mono text-xs font-bold text-white tabular-nums">
              {averageRating}
            </span>
            <span className="text-[11px] text-neutral-500">out of 5</span>
            <span className="text-neutral-600">·</span>
            <span className="text-[11px] text-red-400 font-medium flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Verified Local Buyers
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="self-start sm:self-auto px-3.5 py-1.5 text-xs font-semibold bg-neutral-800 hover:bg-neutral-750 text-neutral-200 border border-neutral-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5 text-red-400" />
          <span>{showAddForm ? 'Cancel Review' : 'Write a Review'}</span>
        </button>
      </div>

      {/* Submission Success Toast */}
      {submittedToast && (
        <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-xl text-red-300 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>Thank you! Your review has been published for {product.name}.</span>
        </div>
      )}

      {/* Write Review Form */}
      {showAddForm && (
        <form
          onSubmit={handleSubmitReview}
          className="p-4 bg-neutral-950 border border-red-500/40 rounded-xl space-y-4 animate-fade-in"
        >
          <div className="text-xs font-bold text-white uppercase tracking-wider">
            Share Your Experience with {product.brand}
          </div>

          {/* Star Picker */}
          <div>
            <label className="block text-[11px] font-medium text-neutral-400 mb-1">
              Your Rating
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition-transform cursor-pointer"
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-neutral-700 hover:text-amber-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-mono text-neutral-300 ml-2">
                {rating === 5
                  ? 'Excellent (5★)'
                  : rating === 4
                  ? 'Very Good (4★)'
                  : rating === 3
                  ? 'Average (3★)'
                  : `${rating} Stars`}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                Your Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Danial / Sarah"
                className="w-full bg-neutral-900 border border-neutral-750 rounded-lg px-3 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                {product.variantLabel} Purchased
              </label>
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-750 rounded-lg px-3 py-2 text-xs text-white focus:outline-hidden focus:border-red-500 cursor-pointer"
              >
                {product.variants.map((v) => (
                  <option key={v.id} value={v.name}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-neutral-400 mb-1">
              Feedback & Tasting Notes <span className="text-red-400">*</span>
            </label>
            <textarea
              required
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How was the flavor sweetness, throat hit, cooling chill, or battery life?"
              className="w-full bg-neutral-900 border border-neutral-750 rounded-lg px-3 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Post Review
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-3 bg-neutral-950/70 border border-neutral-800/80 rounded-xl space-y-1.5"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{rev.author}</span>
                {rev.verifiedBuyer && (
                  <span className="text-[10px] text-red-400 font-medium flex items-center gap-0.5">
                    <CheckCircle className="w-2.5 h-2.5" />
                    <span>Verified Buyer</span>
                  </span>
                )}
              </div>
              <span className="text-[10px] text-neutral-500">{rev.date}</span>
            </div>

            {/* Stars & Variant Purchased */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3 h-3 ${
                      s <= rev.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-neutral-800'
                    }`}
                  />
                ))}
              </div>
              {rev.variantPurchased && (
                <span className="text-[11px] text-neutral-400 font-mono">
                  · {rev.variantPurchased}
                </span>
              )}
            </div>

            {/* Comment Body */}
            <p className="text-xs text-neutral-300 leading-relaxed pt-0.5">
              "{rev.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
