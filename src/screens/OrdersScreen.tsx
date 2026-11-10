import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import {
  ShoppingBag,
  Clock,
  Calendar,
  Check,
  Bike,
  UtensilsCrossed,
  MapPin,
  ChevronLeft,
  Phone,
  RefreshCw,
  Receipt,
  Headphones,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react-native';
import { Header } from '../components/Header';
import { Colors, BorderRadius, Spacing } from '../theme/colors';
import { useApp } from '../context/AppContext';
import { Order, InvoiceData } from '../types';
import { PRODUCTS } from '../data/mockData';

export const OrdersScreen: React.FC = () => {
  const { orders, viewInvoice, addToCart, setCurrentTab, setSupportOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');

  const currentOrders = orders.filter((o) => o.statusStep < 4);
  const historyOrders = orders.filter((o) => o.statusStep === 4);
  const displayedOrders = activeTab === 'current' ? currentOrders : historyOrders;

  const handleViewInvoice = (order: Order) => {
    const inv: InvoiceData = {
      invoiceNumber: `INV-${order.orderNumber.replace('#', '')}`,
      orderNumber: order.orderNumber,
      dateStr: order.dateStr,
      customerName: 'أحمد محمود',
      deliveryAddress: `${order.address.title} - ${order.address.street}، ${order.address.details}`,
      paymentMethodText:
        order.paymentMethod === 'cash'
          ? 'الدفع عند الاستلام'
          : order.paymentMethod === 'card'
          ? 'بطاقة بنكية'
          : 'المحفظة الإلكترونية',
      paymentStatus: order.statusStep === 4 ? 'paid' : 'pending',
      items: order.items,
      subtotal: order.subtotal,
      deliveryFee: order.deliveryFee,
      vatRate: 0.14,
      vatAmount: order.vat,
      discount: order.discount,
      totalAmount: order.total,
    };
    viewInvoice(inv);
  };

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      const prod = PRODUCTS.find((p) => p.name === item.productName) || PRODUCTS[0];
      addToCart(prod, prod.flavors?.[0], prod.sizes?.[0], item.quantity);
    });
    Alert.alert(
      'تمت الإضافة للسلة',
      `تمت إضافة أصناف الطلب ${order.orderNumber} إلى سلة مشترياتك بنجاح!`,
      [
        { text: 'متابعة التصفح', style: 'cancel' },
        { text: 'الذهاب للسلة', onPress: () => setCurrentTab('cart') },
      ]
    );
  };

  const handleCallCaptain = () => {
    Linking.openURL('tel:01112345678').catch(() => {
      Alert.alert('اتصال بالمندوب', 'رقم الكابتن: 01112345678');
    });
  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Page Title */}
        <View style={styles.pageHeader}>
          <TouchableOpacity style={styles.helpLink} onPress={() => setSupportOpen(true)}>
            <Headphones size={16} color={Colors.vibrantPink} />
            <Text style={styles.helpLinkText}>مساعدة</Text>
          </TouchableOpacity>
          <View style={styles.titleWithIcon}>
            <Text style={styles.pageTitle}>طلباتي</Text>
            <ShoppingBag size={22} color={Colors.vibrantPink} />
          </View>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'history' && styles.tabBtnActive]}
            onPress={() => setActiveTab('history')}
            activeOpacity={0.85}
          >
            <Clock size={16} color={activeTab === 'history' ? Colors.white : Colors.subText} />
            <Text
              style={[
                styles.tabBtnText,
                activeTab === 'history' && styles.tabBtnTextActive,
              ]}
            >
              الطلبات السابقة ({historyOrders.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'current' && styles.tabBtnActive]}
            onPress={() => setActiveTab('current')}
            activeOpacity={0.85}
          >
            <Bike size={16} color={activeTab === 'current' ? Colors.white : Colors.subText} />
            <Text
              style={[
                styles.tabBtnText,
                activeTab === 'current' && styles.tabBtnTextActive,
              ]}
            >
              الطلبات الحالية ({currentOrders.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Orders List */}
        {displayedOrders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <ShoppingBag size={48} color={Colors.muted} />
            </View>
            <Text style={styles.emptyTitle}>لا توجد طلبات في هذا القسم حالياً</Text>
            <Text style={styles.emptySub}>
              تصفح قائمة الحلويات والمأكولات الشهية من وزير الحلو واطلب الآن!
            </Text>
            <TouchableOpacity
              style={styles.browseBtn}
              onPress={() => setCurrentTab('home')}
              activeOpacity={0.85}
            >
              <Text style={styles.browseBtnText}>اطلب الآن</Text>
            </TouchableOpacity>
          </View>
        ) : (
          displayedOrders.map((order) => {
            const isLive = order.statusStep < 4;
            return (
              <View key={order.id} style={styles.orderCard}>
                {/* Active Tracking Banner */}
                {isLive && (
                  <View style={styles.liveBanner}>
                    <View style={styles.liveBadge}>
                      <View style={styles.livePulseDot} />
                      <Text style={styles.liveBadgeText}>طلب قيد التنفيذ</Text>
                    </View>
                    <Text style={styles.liveEta}>متبقي حوالي 20 – 30 دقيقة ⚡</Text>
                  </View>
                )}

                {/* Order Top Summary */}
                <View style={styles.orderTopRow}>
                  <View style={styles.priceContainer}>
                    <Text style={styles.totalPriceText}>{order.total} EGP</Text>
                    <Text style={styles.itemsCountText}>
                      ({order.items.reduce((s, i) => s + i.quantity, 0)} قطع)
                    </Text>
                  </View>

                  <View style={styles.orderMeta}>
                    <Text style={styles.orderNumberTitle}>طلب رقم {order.orderNumber}</Text>
                    <View style={styles.dateRow}>
                      <Text style={styles.dateText}>{order.dateStr}</Text>
                      <Calendar size={13} color={Colors.muted} />
                    </View>
                  </View>

                  <Image
                    source={order.items[0]?.image || require('../../assets/cat-cake.jpg')}
                    style={styles.orderThumbnail}
                  />
                </View>

                {/* Live Stepper Timeline */}
                <View style={styles.stepperContainer}>
                  {/* Step 4: Left is تم التوصيل */}
                  <View style={styles.stepCol}>
                    <View
                      style={[
                        styles.stepCircle,
                        order.statusStep >= 4 && styles.stepCircleDone,
                      ]}
                    >
                      <Check
                        size={12}
                        color={order.statusStep >= 4 ? Colors.white : Colors.muted}
                        strokeWidth={2.5}
                      />
                    </View>
                    <Text
                      style={[
                        styles.stepLabel,
                        order.statusStep === 4 && styles.stepLabelActive,
                      ]}
                    >
                      تم التوصيل
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.stepConnector,
                      order.statusStep >= 4 && styles.stepConnectorActive,
                    ]}
                  />

                  {/* Step 3: جاري التوصيل */}
                  <View style={styles.stepCol}>
                    <View
                      style={[
                        styles.stepCircle,
                        order.statusStep >= 3 && styles.stepCircleCurrent,
                      ]}
                    >
                      <Bike
                        size={14}
                        color={order.statusStep >= 3 ? Colors.white : Colors.muted}
                      />
                    </View>
                    <Text
                      style={[
                        styles.stepLabel,
                        order.statusStep === 3 && styles.stepLabelActive,
                      ]}
                    >
                      جاري التوصيل
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.stepConnector,
                      order.statusStep >= 3 && styles.stepConnectorActive,
                    ]}
                  />

                  {/* Step 2: قيد التحضير */}
                  <View style={styles.stepCol}>
                    <View
                      style={[
                        styles.stepCircle,
                        order.statusStep >= 2 && styles.stepCircleCurrent,
                      ]}
                    >
                      <UtensilsCrossed
                        size={12}
                        color={order.statusStep >= 2 ? Colors.white : Colors.muted}
                      />
                    </View>
                    <Text
                      style={[
                        styles.stepLabel,
                        order.statusStep === 2 && styles.stepLabelActive,
                      ]}
                    >
                      قيد التحضير
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.stepConnector,
                      order.statusStep >= 2 && styles.stepConnectorActive,
                    ]}
                  />

                  {/* Step 1: Right is استلام الطلب */}
                  <View style={styles.stepCol}>
                    <View
                      style={[
                        styles.stepCircle,
                        order.statusStep >= 1 && styles.stepCircleDone,
                      ]}
                    >
                      <Check
                        size={12}
                        color={order.statusStep >= 1 ? Colors.white : Colors.muted}
                        strokeWidth={2.5}
                      />
                    </View>
                    <Text style={styles.stepLabel}>استلام الطلب</Text>
                  </View>
                </View>

                {/* Delivery Captain & Address Row (For Live Orders) */}
                {isLive && (
                  <View style={styles.captainCard}>
                    <TouchableOpacity
                      style={styles.callCaptainBtn}
                      onPress={handleCallCaptain}
                      activeOpacity={0.85}
                    >
                      <Phone size={14} color={Colors.white} />
                      <Text style={styles.callCaptainText}>اتصال</Text>
                    </TouchableOpacity>

                    <View style={styles.captainInfo}>
                      <Text style={styles.captainName}>كابتن التوصيل: محمود سالم</Text>
                      <View style={styles.captainAddressRow}>
                        <Text style={styles.captainAddressText} numberOfLines={1}>
                          {order.address.title} - {order.address.street}
                        </Text>
                        <MapPin size={12} color={Colors.vibrantPink} />
                      </View>
                    </View>
                  </View>
                )}

                {/* Items Summary Chips */}
                <View style={styles.itemsChipRow}>
                  {order.items.map((it, idx) => (
                    <View key={idx} style={styles.itemChip}>
                      <Text style={styles.itemChipText}>
                        {it.quantity}x {it.productName}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Card Action Buttons */}
                <View style={styles.cardActionsRow}>
                  <TouchableOpacity
                    style={styles.invoiceBtn}
                    onPress={() => handleViewInvoice(order)}
                    activeOpacity={0.85}
                  >
                    <Receipt size={15} color={Colors.deepPurple} />
                    <Text style={styles.invoiceBtnText}>عرض الفاتورة</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.reorderBtn}
                    onPress={() => handleReorder(order)}
                    activeOpacity={0.85}
                  >
                    <RefreshCw size={14} color={Colors.white} />
                    <Text style={styles.reorderBtnText}>إعادة الطلب</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.softGray,
  },
  scrollContent: {
    paddingBottom: 28,
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 14,
    marginBottom: 8,
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.deepPurple,
  },
  helpLink: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDEDF2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  helpLinkText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.vibrantPink,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    gap: 10,
    marginTop: 4,
    marginBottom: 14,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 10,
    borderRadius: 14,
    gap: 6,
    borderWidth: 1,
    borderColor: '#ECECF2',
    elevation: 2,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  tabBtnActive: {
    backgroundColor: Colors.deepPurple,
    borderColor: Colors.deepPurple,
  },
  tabBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.subText,
  },
  tabBtnTextActive: {
    color: Colors.white,
    fontWeight: '800',
  },
  emptyContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: 18,
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
    elevation: 2,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5F6FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.deepPurple,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySub: {
    fontSize: 12.5,
    color: Colors.subText,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  browseBtn: {
    backgroundColor: Colors.vibrantPink,
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 14,
  },
  browseBtnText: {
    color: Colors.white,
    fontSize: 13.5,
    fontWeight: '800',
  },
  orderCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 18,
    marginBottom: 16,
    borderRadius: 20,
    padding: 16,
    elevation: 3,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#ECECF2',
  },
  liveBanner: {
    backgroundColor: '#E6F8FA',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#C6EFF3',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  livePulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.turquoise,
  },
  liveBadgeText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#08737F',
  },
  liveEta: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.deepPurple,
  },
  orderTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  priceContainer: {
    alignItems: 'flex-start',
  },
  totalPriceText: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.vibrantPink,
  },
  itemsCountText: {
    fontSize: 11,
    color: Colors.muted,
  },
  orderMeta: {
    flex: 1,
    alignItems: 'flex-end',
    paddingHorizontal: 12,
  },
  orderNumberTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.deepPurple,
    marginBottom: 3,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 11.5,
    color: Colors.muted,
  },
  orderThumbnail: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAFBFD',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  stepCol: {
    alignItems: 'center',
    width: 60,
  },
  stepCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#ECECF2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepCircleCurrent: {
    backgroundColor: Colors.vibrantPink,
  },
  stepCircleDone: {
    backgroundColor: Colors.successGreen,
  },
  stepConnector: {
    flex: 1,
    height: 3,
    backgroundColor: '#ECECF2',
    marginTop: -16,
  },
  stepConnectorActive: {
    backgroundColor: Colors.successGreen,
  },
  stepLabel: {
    fontSize: 10,
    color: Colors.muted,
    fontWeight: '600',
    textAlign: 'center',
  },
  stepLabelActive: {
    color: Colors.deepPurple,
    fontWeight: '800',
  },
  captainCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF8FA',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FDEDF2',
  },
  callCaptainBtn: {
    backgroundColor: Colors.successGreen,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 4,
  },
  callCaptainText: {
    color: Colors.white,
    fontSize: 11.5,
    fontWeight: '700',
  },
  captainInfo: {
    alignItems: 'flex-end',
  },
  captainName: {
    fontSize: 12.5,
    fontWeight: '800',
    color: Colors.deepPurple,
    marginBottom: 2,
  },
  captainAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  captainAddressText: {
    fontSize: 10.5,
    color: Colors.subText,
  },
  itemsChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
    justifyContent: 'flex-end',
  },
  itemChip: {
    backgroundColor: '#F5F5FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  itemChipText: {
    fontSize: 11,
    color: Colors.subText,
  },
  cardActionsRow: {
    flexDirection: 'row',
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F6',
    paddingTop: 12,
  },
  invoiceBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5FA',
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  invoiceBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: Colors.deepPurple,
  },
  reorderBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.vibrantPink,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  reorderBtnText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: Colors.white,
  },
});
