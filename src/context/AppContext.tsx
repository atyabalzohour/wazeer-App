import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  TabType,
  CategoryId,
  Product,
  CartItem,
  Address,
  Order,
  InvoiceData,
  FlavorOption,
  SizeOption,
} from '../types';
import { PRODUCTS, SAVED_ADDRESSES, MOCK_ORDERS, MOCK_INVOICE } from '../data/mockData';

interface AppContextType {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  selectedCategory: CategoryId;
  setSelectedCategory: (cat: CategoryId) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  cartItems: CartItem[];
  addToCart: (product: Product, flavor?: FlavorOption, size?: SizeOption, qty?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  couponCode: string;
  couponApplied: boolean;
  applyCoupon: (code: string) => boolean;
  vatAmount: number;
  finalTotal: number;
  activeModalProduct: Product | null;
  openProductDetails: (product: Product) => void;
  closeProductDetails: () => void;
  orders: Order[];
  createOrder: (deliveryTimeType: 'now' | 'scheduled', paymentMethod: 'cash' | 'card' | 'wallet', notes?: string) => Order;
  selectedAddress: Address;
  setSelectedAddress: (addr: Address) => void;
  addresses: Address[];
  addAddress: (addr: Address) => void;
  loyaltyPoints: number;
  redeemPoints: () => void;
  selectedInvoice: InvoiceData | null;
  viewInvoice: (inv: InvoiceData) => void;
  closeInvoice: () => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
  locationModalVisible: boolean;
  setLocationModalVisible: (visible: boolean) => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  supportOpen: boolean;
  setSupportOpen: (open: boolean) => void;
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  userProfile: { name: string; phone: string; email: string };
  updateUserProfile: (profile: { name: string; phone: string; email: string }) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceData | null>(null);
  const [loyaltyPoints, setLoyaltyPoints] = useState(420);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(['prod-torta-hazelnut', 'prod-molten-cake']);
  const [userProfile, setUserProfile] = useState({
    name: 'أحمد محمود',
    phone: '+20 111 234 5678',
    email: 'ahmed.mahmoud@gmail.com',
  });

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const updateUserProfile = (profile: { name: string; phone: string; email: string }) => {
    setUserProfile(profile);
  };

  const [addresses, setAddresses] = useState<Address[]>(SAVED_ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState<Address>(SAVED_ADDRESSES[0]);

  const addAddress = (newAddr: Address) => {
    setAddresses((prev) => [newAddr, ...prev]);
    setSelectedAddress(newAddr);
  };

  // Initial Cart matching wazeer-app5.png (3 items, 4 pieces total)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      cartItemId: 'init-1',
      product: PRODUCTS[0], // Torta Hazelnut
      quantity: 1,
      selectedFlavor: PRODUCTS[0].flavors?.[1],
      selectedSize: PRODUCTS[0].sizes?.[0],
      unitPrice: 140,
      totalPrice: 140,
    },
    {
      cartItemId: 'init-2',
      product: PRODUCTS[2], // Kunafa
      quantity: 1,
      selectedFlavor: PRODUCTS[2].flavors?.[0],
      selectedSize: PRODUCTS[2].sizes?.[0],
      unitPrice: 120,
      totalPrice: 120,
    },
    {
      cartItemId: 'init-3',
      product: PRODUCTS[3], // Ice cream mix
      quantity: 2,
      selectedFlavor: PRODUCTS[3].flavors?.[0],
      selectedSize: PRODUCTS[3].sizes?.[1],
      unitPrice: 85,
      totalPrice: 170,
    },
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  // Cart calculations
  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [cartItems]);

  const deliveryFee = useMemo(() => {
    return cartItems.length > 0 ? 25 : 0;
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    if (!couponApplied) return 0;
    return 30; // standard promo discount of 30 EGP
  }, [couponApplied]);

  const vatAmount = useMemo(() => {
    const taxable = Math.max(0, subtotal - discountAmount);
    return Math.round(taxable * 0.14 * 10) / 10;
  }, [subtotal, discountAmount]);

  const finalTotal = useMemo(() => {
    const base = subtotal + deliveryFee - discountAmount;
    return Math.max(0, base);
  }, [subtotal, deliveryFee, discountAmount]);

  const addToCart = (
    product: Product,
    flavor?: FlavorOption,
    size?: SizeOption,
    qty: number = 1
  ) => {
    const extraPrice = size ? size.priceOffset : 0;
    const unitPrice = product.price + extraPrice;
    const itemFlavor = flavor || (product.flavors ? product.flavors[0] : undefined);
    const itemSize = size || (product.sizes ? product.sizes[0] : undefined);

    const existingIndex = cartItems.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedFlavor?.id === itemFlavor?.id &&
        item.selectedSize?.id === itemSize?.id
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      const newQty = updated[existingIndex].quantity + qty;
      updated[existingIndex].quantity = newQty;
      updated[existingIndex].totalPrice = newQty * unitPrice;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        cartItemId: `${product.id}-${Date.now()}`,
        product,
        quantity: qty,
        selectedFlavor: itemFlavor,
        selectedSize: itemSize,
        unitPrice,
        totalPrice: unitPrice * qty,
      };
      setCartItems([newItem, ...cartItems]);
    }
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems(cartItems.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            return {
              ...item,
              quantity: nextQty,
              totalPrice: nextQty * item.unitPrice,
            };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCouponApplied(false);
  };

  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'WAZEER' || normalized === 'SWEET' || normalized === 'HEILW' || normalized === 'WAZEER2026') {
      setCouponCode(normalized);
      setCouponApplied(true);
      return true;
    } else if (code.trim().length > 0) {
      setCouponCode(code.trim());
      setCouponApplied(true);
      return true;
    }
    return false;
  };

  const openProductDetails = (product: Product) => {
    setActiveModalProduct(product);
  };

  const closeProductDetails = () => {
    setActiveModalProduct(null);
  };

  const redeemPoints = () => {
    if (loyaltyPoints >= 100) {
      setLoyaltyPoints((prev) => prev - 100);
      setCouponApplied(true);
    }
  };

  const createOrder = (
    deliveryTimeType: 'now' | 'scheduled',
    paymentMethod: 'cash' | 'card' | 'wallet',
    notes?: string
  ): Order => {
    const orderNum = `#OD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      dateStr: 'اليوم، الآن',
      statusText: 'قيد التحضير',
      statusStep: 2,
      items: cartItems.map((c) => ({
        productName: c.product.name,
        variant: `${c.selectedSize?.name || ''} ${c.selectedFlavor ? '• ' + c.selectedFlavor.name : ''}`.trim(),
        quantity: c.quantity,
        unitPrice: c.unitPrice,
        totalPrice: c.totalPrice,
        image: c.product.image,
      })),
      itemsCount: cartCount,
      subtotal,
      deliveryFee,
      vat: vatAmount,
      discount: discountAmount,
      total: finalTotal,
      address: selectedAddress,
      paymentMethod,
      notes,
      deliveryTimeType,
    };

    setOrders([newOrder, ...orders]);
    setLoyaltyPoints((prev) => prev + Math.floor(finalTotal * 0.1));
    clearCart();
    setCheckoutOpen(false);

    // Auto view invoice
    const invData: InvoiceData = {
      invoiceNumber: `INV-${Math.floor(10000 + Math.random() * 90000)}`,
      orderNumber: newOrder.orderNumber,
      dateStr: 'اليوم، الآن',
      customerName: 'أحمد محمود',
      deliveryAddress: `${selectedAddress.title} - ${selectedAddress.street}، ${selectedAddress.details}`,
      paymentMethodText:
        paymentMethod === 'cash'
          ? 'الدفع عند الاستلام'
          : paymentMethod === 'card'
          ? 'بطاقة بنكية'
          : 'المحفظة الإلكترونية',
      paymentStatus: paymentMethod === 'cash' ? 'pending' : 'paid',
      items: newOrder.items,
      subtotal: newOrder.subtotal,
      deliveryFee: newOrder.deliveryFee,
      vatRate: 0.14,
      vatAmount: newOrder.vat,
      discount: newOrder.discount,
      totalAmount: newOrder.total,
    };

    setSelectedInvoice(invData);
    return newOrder;
  };

  const viewInvoice = (inv: InvoiceData) => {
    setSelectedInvoice(inv);
  };

  const closeInvoice = () => {
    setSelectedInvoice(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        deliveryFee,
        discountAmount,
        couponCode,
        couponApplied,
        applyCoupon,
        vatAmount,
        finalTotal,
        activeModalProduct,
        openProductDetails,
        closeProductDetails,
        orders,
        createOrder,
        selectedAddress,
        setSelectedAddress,
        addresses,
        addAddress,
        loyaltyPoints,
        redeemPoints,
        selectedInvoice,
        viewInvoice,
        closeInvoice,
        checkoutOpen,
        setCheckoutOpen,
        locationModalVisible,
        setLocationModalVisible,
        notificationsOpen,
        setNotificationsOpen,
        supportOpen,
        setSupportOpen,
        settingsOpen,
        setSettingsOpen,
        favorites,
        toggleFavorite,
        userProfile,
        updateUserProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

