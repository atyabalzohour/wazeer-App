export type TabType = 'home' | 'categories' | 'cart' | 'orders' | 'account';

export type CategoryId = 'all' | 'sweets' | 'icecream' | 'drinks' | 'meals';

export interface Category {
  id: CategoryId;
  name: string;
  iconName: string;
  image?: any;
}

export interface FlavorOption {
  id: string;
  name: string;
  icon?: string;
}

export interface SizeOption {
  id: string;
  name: string;
  servingCount: string;
  priceOffset: number;
}

export interface IngredientHighlight {
  id: string;
  name: string;
  subtext: string;
  icon?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  categoryId: CategoryId;
  image: any;
  badge?: string;
  isPopular?: boolean;
  flavors?: FlavorOption[];
  sizes?: SizeOption[];
  ingredients?: IngredientHighlight[];
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  selectedFlavor?: FlavorOption;
  selectedSize?: SizeOption;
  unitPrice: number;
  totalPrice: number;
}

export interface Address {
  id: string;
  title: string;
  street: string;
  details: string;
  type: 'home' | 'work' | 'other';
  isDefault?: boolean;
}

export type OrderStatusStep = 1 | 2 | 3 | 4; // 1: استلام الطلب, 2: قيد التحضير, 3: جاري التوصيل, 4: تم التوصيل

export interface OrderItemSummary {
  productName: string;
  variant: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image: any;
}

export interface Order {
  id: string;
  orderNumber: string;
  dateStr: string;
  statusText: string;
  statusStep: OrderStatusStep;
  items: OrderItemSummary[];
  itemsCount: number;
  subtotal: number;
  deliveryFee: number;
  vat: number;
  discount: number;
  total: number;
  address: Address;
  paymentMethod: 'cash' | 'card' | 'wallet';
  notes?: string;
  deliveryTimeType: 'now' | 'scheduled';
}

export interface InvoiceData {
  invoiceNumber: string;
  orderNumber: string;
  dateStr: string;
  customerName: string;
  deliveryAddress: string;
  paymentMethodText: string;
  paymentStatus: 'paid' | 'pending';
  items: OrderItemSummary[];
  subtotal: number;
  deliveryFee: number;
  vatRate: number; // e.g. 0.14
  vatAmount: number;
  discount: number;
  totalAmount: number;
  qrCodeUrl?: string;
}

