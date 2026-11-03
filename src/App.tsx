import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RefillFlavorsSection } from './components/RefillFlavorsSection';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmedModal } from './components/OrderConfirmedModal';
import { StoreInfoSection } from './components/StoreInfoSection';
import { PromoMarquee } from './components/PromoMarquee';
import { StoreBanner } from './components/StoreBanner';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { INITIAL_PRODUCTS, STORE_DATA } from './data/products';
import { Product, ProductVariant, CartItem, PlacedOrder, CategoryType } from './types';
import { ArrowUpDown, Droplets } from 'lucide-react';

export default function App() {
  // Products
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Modals & Drawers
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  // Store WhatsApp Number (persisted in localStorage for business owner)
  const [whatsappNumber, setWhatsappNumber] = useState<string>(() => {
    return localStorage.getItem('7vape_whatsapp') || STORE_DATA.whatsappPhone;
  });

  const handleUpdateWhatsappNumber = (newNumber: string) => {
    setWhatsappNumber(newNumber);
    localStorage.setItem('7vape_whatsapp', newNumber);
  };

  // Cart State (persisted in localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('7vape_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('7vape_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Cart Handlers
  const handleAddToCart = (
    product: Product,
    variant: ProductVariant,
    quantity: number
  ) => {
    setCartItems((prevItems) => {
      const cartId = `${product.id}-${variant.id}`;
      const existingIndex = prevItems.findIndex((item) => item.cartId === cartId);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            cartId,
            product,
            selectedVariant: variant,
            quantity,
          },
        ];
      }
    });
  };

  const handleQuickAdd = (product: Product) => {
    handleAddToCart(product, product.variants[0], 1);
  };

  const handleUpdateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(cartId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleOrderPlaced = (order: PlacedOrder) => {
    setPlacedOrder(order);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setCartItems([]); // Clear cart after order submitted to WhatsApp
  };

  // Filter & Search logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'all') {
          if (selectedCategory === 'refill-flavors') {
            if (!product.isRefillFlavor && product.category !== 'refill-flavors' && product.category !== 'eliquids') {
              return false;
            }
          } else if (product.category !== selectedCategory) {
            return false;
          }
        }

        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = product.name.toLowerCase().includes(q);
          const matchBrand = product.brand.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchVariant = product.variants.some((v) =>
            v.name.toLowerCase().includes(q)
          );
          const matchNotes = product.flavorNotes?.some((n) =>
            n.toLowerCase().includes(q)
          );
          return matchName || matchBrand || matchDesc || matchVariant || matchNotes;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return 0; // Default featured order
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const scrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToRefills = () => {
    document.getElementById('refill-flavors')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToStore = () => {
    document.getElementById('store-info')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-neutral-950">
      {/* Age Warning Banner (Regulatory Notice) */}
      <div className="bg-neutral-900 border-b border-neutral-800 text-[11px] text-neutral-400 py-1.5 px-4 text-center">
        <span className="font-semibold text-neutral-200">Age Restriction Notice:</span> You must be 18+ years old to browse or order vape products. We verify age upon delivery or collection.
      </div>

      {/* Top Bar Header */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat as CategoryType);
          scrollToCatalog();
        }}
        activeCategory={selectedCategory}
        onScrollToRefills={scrollToRefills}
        onScrollToStore={scrollToStore}
      />

      <main className="flex-1">
        {/* Storefront Hero Section */}
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onScrollToCatalog={scrollToCatalog}
          onScrollToRefills={scrollToRefills}
          onScrollToStore={scrollToStore}
        />

        {/* Featured In-Store Arrival Showcase Banner */}
        <StoreBanner
          onScrollToRefills={scrollToRefills}
          whatsappNumber={whatsappNumber}
        />

        {/* Dedicated Refill Flavors Station Section */}
        <RefillFlavorsSection
          products={products}
          onOpenDetails={(p) => setActiveModalProduct(p)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Full Product Catalog Section */}
        <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-neutral-800/80">
          {/* Promotional Marquee Banner */}
          <PromoMarquee
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              scrollToCatalog();
            }}
            onSearch={(q) => {
              setSearchQuery(q);
              scrollToCatalog();
            }}
            onScrollToStore={scrollToStore}
          />

          {/* Section Header & Sort Dropdown */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
            <div>
              <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                7 Vape Stock Catalog
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                Browse Complete Catalog
              </h2>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>Sort by:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-neutral-900 border border-neutral-750 text-xs text-white rounded-lg px-3 py-1.5 focus:outline-hidden focus:border-red-500 cursor-pointer"
              >
                <option value="featured">Featured / Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Interactive Category Segmented Controls */}
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">
            {[
              { id: 'all', label: 'All Products' },
              { id: 'refill-flavors', label: 'Refill Flavors (Salt & Freebase)' },
              { id: 'disposable', label: 'Disposable Pods' },
              { id: 'pod-kits', label: 'Pod Kits & Mods' },
              { id: 'closed-pods', label: 'Closed Pods (RELX / Lana)' },
              { id: 'accessories', label: 'Coils & Accessories' },
            ].map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as CategoryType)}
                  className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-red-600 text-white font-bold shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-850 border border-neutral-800'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Products Count Indicator */}
          <div className="text-xs text-neutral-500 mb-6 flex items-center justify-between">
            <span>
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              {searchQuery && ` for "${searchQuery}"`}
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-red-400 hover:underline cursor-pointer"
              >
                Clear Search
              </button>
            )}
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-neutral-900/40 rounded-2xl border border-neutral-800">
              <p className="text-base font-semibold text-neutral-300">
                No products found matching your search
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Try searching for another flavor, brand like Voltbar or Relx, or reset your filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-white rounded-lg transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetails={(p) => setActiveModalProduct(p)}
                  onQuickAdd={handleQuickAdd}
                />
              ))}
            </div>
          )}
        </section>

        {/* Physical Store Location & Contact Information */}
        <StoreInfoSection
          currentWhatsappNumber={whatsappNumber}
          onUpdateWhatsappNumber={handleUpdateWhatsappNumber}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800 bg-neutral-950 py-10 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-white uppercase tracking-wider font-display">
              7 Vape Taman Sri Gombak
            </span>
            <span className="mx-2">·</span>
            <span>No. 31-G, Jalan SG 3/1, Taman Sri Gombak, Batu Caves, Selangor</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 font-semibold"
            >
              WhatsApp: +{whatsappNumber}
            </a>
            <span>·</span>
            <span>Tel: {STORE_DATA.phone}</span>
          </div>
        </div>
      </footer>

      {/* Floating Bottom Cart Bar on Mobile when items exist */}
      {cartCount > 0 && !isCartOpen && !isCheckoutOpen && !activeModalProduct && (
        <div className="fixed bottom-4 inset-x-4 sm:hidden z-30">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-2xl flex items-center justify-between transition-transform active:scale-98"
          >
            <div className="flex items-center gap-2">
              <span className="bg-neutral-950 text-red-400 text-xs font-mono font-bold px-2 py-0.5 rounded-full border border-red-500/30">
                {cartCount}
              </span>
              <span className="text-sm font-semibold">View Cart</span>
            </div>
            <div className="font-mono text-sm font-bold tabular-nums">
              RM {cartTotal.toFixed(2)} &rarr;
            </div>
          </button>
        </div>
      )}

      {/* Product Detail & Variant Selector Modal */}
      <ProductModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onExplore={scrollToCatalog}
      />

      {/* Checkout & WhatsApp Generation Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderPlaced={handleOrderPlaced}
        whatsappNumber={whatsappNumber}
      />

      {/* Order Confirmed Receipt Modal */}
      <OrderConfirmedModal
        order={placedOrder}
        onClose={() => setPlacedOrder(null)}
        whatsappNumber={whatsappNumber}
      />

      {/* Persistent Floating WhatsApp Chat Button */}
      <FloatingWhatsAppButton
        whatsappNumber={whatsappNumber}
        hasMobileCartBar={cartCount > 0 && !isCartOpen && !isCheckoutOpen && !activeModalProduct}
      />
    </div>
  );
}
