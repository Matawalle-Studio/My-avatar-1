export type CategoryType = 
  | 'all'
  | 'refill-flavors'
  | 'disposable'
  | 'pod-kits'
  | 'closed-pods'
  | 'eliquids'
  | 'accessories';

export type FlavorProfile = 
  | 'fruity-ice'
  | 'creamy-dessert'
  | 'drinks-beverage'
  | 'tobacco-coffee'
  | 'mint-menthol';

export interface ProductVariant {
  id: string;
  name: string; // e.g., "Grape Apple" or "Carbon Black" or "30mg"
  inStock?: boolean;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number; // 1 - 5
  date: string;
  comment: string;
  variantPurchased?: string;
  verifiedBuyer?: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategoryType;
  price: number; // in Malaysian Ringgit (RM)
  originalPrice?: number;
  description: string;
  puffs?: string;
  nicotine?: string;
  capacity?: string;
  variants: ProductVariant[];
  variantLabel: string; // "Flavor", "Color", "Nicotine Strength", etc.
  tag?: string; // "Top Seller", "New Arrival", "Popular"
  colorTheme: string; // hex or gradient for visual presentation
  deviceType: 'disposable' | 'open-pod' | 'closed-pod' | 'liquid' | 'accessory';
  // Refill Flavor specific metadata
  isRefillFlavor?: boolean;
  flavorProfile?: FlavorProfile;
  coolingLevel?: 'Low / Smooth' | 'Medium Ice' | 'Sub-Zero Cold';
  nicotineType?: 'Salt Nic' | 'Freebase' | 'Hybrid';
  flavorNotes?: string[];
  // Customer Reviews & Ratings
  rating?: number;
  reviewCount?: number;
  reviews?: ProductReview[];
}

export interface CartItem {
  cartId: string; // productId + variantId
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
}

export type DeliveryMethod = 'pickup' | 'lalamove' | 'postage';

export interface OrderCustomerInfo {
  name: string;
  phone: string;
  deliveryMethod: DeliveryMethod;
  address: string;
  notes: string;
  ageConfirmed: boolean;
}

export interface PlacedOrder {
  orderId: string;
  timestamp: string;
  items: CartItem[];
  customerInfo: OrderCustomerInfo;
  subtotal: number;
  deliveryFee: number;
  total: number;
  whatsappMessage: string;
}
