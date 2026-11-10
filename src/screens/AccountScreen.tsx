import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  User,
  Pencil,
  ChevronLeft,
  Star,
  ShoppingBag,
  Clock,
  Calendar,
  Check,
  Bike,
  UtensilsCrossed,
  UserCircle2,
  Bell,
  Headphones,
  Heart,
  MapPin,
  Settings,
  CreditCard,
} from 'lucide-react-native';
import { Header } from '../components/Header';
import { Colors, BorderRadius, Spacing } from '../theme/colors';
import { useApp } from '../context/AppContext';
import { Order, InvoiceData } from '../types';
import { MOCK_INVOICE } from '../data/mockData';
import {
  EditProfileModal,
  FavoritesModal,
  SupportModal,
  SettingsModal,
} from '../components/AccountModals';

export const AccountScreen: React.FC = () => {
  const {
    orders,
    loyaltyPoints,
    redeemPoints,
    viewInvoice,
    setLocationModalVisible,
    setNotificationsOpen,
    userProfile,
  } = useApp();

  const [activeOrderTab, setActiveOrderTab] = useState<'current' | 'history'>('current');
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleOrderClick = (order: Order) => {
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

  const currentOrders = orders.filter((o) => o.statusStep < 4);
  const historyOrders = orders.filter((o) => o.statusStep === 4);
  const displayedOrders = activeOrderTab === 'current' ? currentOrders : historyOrders;

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Card matching wazeer-app.png */}
        <View style={styles.profileCard}>
          {/* Left: Dessert thumbnail */}
          <View style={styles.dessertThumbWrap}>
            <Image
              source={require('../../assets/cat-cake.jpg')}
              style={styles.dessertThumb}
            />
          </View>

          {/* Center: Name & Phone */}
          <View style={styles.profileInfoWrap}>
            <Text style={styles.welcomeName}>أهلاً بك يا {userProfile.name} 👋</Text>
            <Text style={styles.phoneNumber}>{userProfile.phone}</Text>
          </View>

          {/* Right: Avatar with edit pencil */}
          <View style={styles.avatarWrap}>
            <View style={styles.avatarCircle}>
              <User size={24} color={Colors.deepPurple} strokeWidth={2.2} />
            </View>
            <TouchableOpacity
              style={styles.pencilCircle}
              onPress={() => setEditProfileOpen(true)}
              activeOpacity={0.8}
            >
              <Pencil size={10} color={Colors.white} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Loyalty Points Golden Banner */}
        <View style={styles.pointsBanner}>
          <TouchableOpacity
            style={styles.redeemBtn}
            onPress={redeemPoints}
            activeOpacity={0.85}
          >
            <ChevronLeft size={13} color={Colors.white} strokeWidth={2.5} />
            <Text style={styles.redeemBtnText}>استبدل النقاط</Text>
          </TouchableOpacity>

          <View style={styles.pointsTextWrap}>
            <View style={styles.pointsScoreRow}>
              <Text style={styles.pointsNumber}>{loyaltyPoints}</Text>
              <Text style={styles.pointsWord}>نقطة</Text>
              <View style={styles.starBadge}>
                <Star size={18} color={Colors.goldenYellow} fill={Colors.goldenYellow} />
              </View>
            </View>
            <Text style={styles.pointsSub}>
              اجمع النقاط مع كل طلب واستمتع بمكافآت لذيذة
            </Text>
          </View>
        </View>

        {/* Orders Section Header */}
        <View style={styles.ordersHeaderRow}>
          <View style={{ flex: 1 }} />
          <View style={styles.headerTitleBox}>
            <ShoppingBag size={20} color={Colors.vibrantPink} strokeWidth={2.2} />
            <Text style={styles.ordersMainTitle}>طلباتي</Text>
          </View>
        </View>

        {/* Orders Tabs: Left is Previous Orders, Right is Current Orders */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tabPill,
              activeOrderTab === 'history' && styles.tabPillActive,
            ]}
            onPress={() => setActiveOrderTab('history')}
            activeOpacity={0.85}
          >
            <Clock
              size={15}
              color={activeOrderTab === 'history' ? Colors.white : Colors.subText}
              strokeWidth={2.2}
            />
            <Text
              style={[
                styles.tabPillText,
                activeOrderTab === 'history' && styles.tabPillTextActive,
              ]}
            >
              الطلبات السابقة
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabPill,
              activeOrderTab === 'current' && styles.tabPillActive,
            ]}
            onPress={() => setActiveOrderTab('current')}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.tabPillText,
                activeOrderTab === 'current' && styles.tabPillTextActive,
              ]}
            >
              الطلبات الحالية ({currentOrders.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Order Cards List */}
        <View style={styles.ordersList}>
          {displayedOrders.length === 0 ? (
            <View style={styles.noOrdersCard}>
              <Text style={styles.noOrdersText}>لا توجد طلبات في هذا القسم</Text>
            </View>
          ) : (
            displayedOrders.map((order) => (
              <TouchableOpacity
                key={order.id}
                style={styles.orderCard}
                onPress={() => handleOrderClick(order)}
                activeOpacity={0.9}
              >
                {/* Order Card Top Row */}
                <View style={styles.orderCardHeader}>
                  {/* Left: Price */}
                  <View style={styles.orderPriceBox}>
                    <ChevronLeft size={16} color={Colors.muted} strokeWidth={2.4} />
                    <Text style={styles.orderPriceText}>{order.total} EGP</Text>
                  </View>

                  {/* Center: Order Info */}
                  <View style={styles.orderMetaBox}>
                    <Text style={styles.orderNumberText}>
                      طلب رقم {order.orderNumber}
                    </Text>
                    <View style={styles.orderDateRow}>
                      <Text style={styles.orderDateText}>{order.dateStr}</Text>
                      <Calendar size={13} color={Colors.muted} strokeWidth={2.2} />
                    </View>
                  </View>

                  {/* Right: Dessert image */}
                  <Image
                    source={order.items[0]?.image || require('../../assets/cat-cake.jpg')}
                    style={styles.orderThumb}
                  />
                </View>

                {/* Progress Stepper Timeline matching wazeer-app.png */}
                <View style={styles.timelineRow}>
                  {/* Step 4: Left is تم التوصيل */}
                  <View style={styles.timelineStep}>
                    <View
                      style={[
                        styles.timelineCircle,
                        order.statusStep >= 4 && styles.timelineCircleDone,
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
                        styles.timelineLabel,
                        order.statusStep === 4 && styles.timelineLabelActive,
                      ]}
                    >
                      تم التوصيل
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.timelineBar,
                      order.statusStep >= 4 && styles.timelineBarActive,
                    ]}
                  />

                  {/* Step 3: جاري التوصيل */}
                  <View style={styles.timelineStep}>
                    <View
                      style={[
                        styles.timelineCircle,
                        order.statusStep >= 3 && styles.timelineCircleActive,
                      ]}
                    >
                      <Bike
                        size={14}
                        color={order.statusStep >= 3 ? Colors.white : Colors.muted}
                        strokeWidth={2.2}
                      />
                    </View>
                    <Text
                      style={[
                        styles.timelineLabel,
                        order.statusStep === 3 && styles.timelineLabelActive,
                      ]}
                    >
                      جاري التوصيل
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.timelineBar,
                      order.statusStep >= 3 && styles.timelineBarActive,
                    ]}
                  />

                  {/* Step 2: قيد التحضير */}
                  <View style={styles.timelineStep}>
                    <View
                      style={[
                        styles.timelineCircle,
                        order.statusStep >= 2 && styles.timelineCircleActive,
                      ]}
                    >
                      <UtensilsCrossed
                        size={12}
                        color={order.statusStep >= 2 ? Colors.white : Colors.muted}
                        strokeWidth={2.2}
                      />
                    </View>
                    <Text
                      style={[
                        styles.timelineLabel,
                        order.statusStep === 2 && styles.timelineLabelActive,
                      ]}
                    >
                      قيد التحضير
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.timelineBar,
                      order.statusStep >= 2 && styles.timelineBarActive,
                    ]}
                  />

                  {/* Step 1: Right is استلام الطلب */}
                  <View style={styles.timelineStep}>
                    <View
                      style={[
                        styles.timelineCircle,
                        order.statusStep >= 1 && styles.timelineCircleDone,
                      ]}
                    >
                      <Check
                        size={12}
                        color={order.statusStep >= 1 ? Colors.white : Colors.muted}
                        strokeWidth={2.5}
                      />
                    </View>
                    <Text style={styles.timelineLabel}>استلام الطلب</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* My Account Section Header */}
        <View style={styles.accountHeaderRow}>
          <View style={{ flex: 1 }} />
          <View style={styles.headerTitleBox}>
            <UserCircle2 size={20} color={Colors.vibrantPink} strokeWidth={2.2} />
            <Text style={styles.accountMainTitle}>حسابي</Text>
          </View>
        </View>

        {/* Quick Actions Grid matching wazeer-app.png */}
        <View style={styles.actionsGrid}>
          {/* Row 1: Right to Left: عناويني (pink highlight) | المفضلة | الدعم والمساعدة | التنبيهات */}
          <View style={styles.actionsGridRow}>
            <TouchableOpacity
              style={styles.actionGridCard}
              onPress={() => setNotificationsOpen(true)}
              activeOpacity={0.85}
            >
              <Bell size={22} color={Colors.deepPurple} strokeWidth={2.2} />
              <Text style={styles.actionGridLabel}>التنبيهات</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionGridCard}
              onPress={() => setSupportOpen(true)}
              activeOpacity={0.85}
            >
              <Headphones size={22} color={Colors.deepPurple} strokeWidth={2.2} />
              <Text style={styles.actionGridLabel}>الدعم والمساعدة</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionGridCard}
              onPress={() => setFavoritesOpen(true)}
              activeOpacity={0.85}
            >
              <Heart size={22} color={Colors.deepPurple} strokeWidth={2.2} />
              <Text style={styles.actionGridLabel}>المفضلة</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionGridCard, styles.actionCardHighlighted]}
              onPress={() => setLocationModalVisible(true)}
              activeOpacity={0.85}
            >
              <MapPin size={22} color={Colors.vibrantPink} strokeWidth={2.2} />
              <Text style={[styles.actionGridLabel, { color: Colors.vibrantPink }]}>
                عناويني
              </Text>
            </TouchableOpacity>
          </View>

          {/* Row 2: Right to Left: معلومات الحساب | الإعدادات */}
          <View style={styles.actionsWideRow}>
            <TouchableOpacity
              style={styles.actionWideBtn}
              onPress={() => setSettingsOpen(true)}
              activeOpacity={0.85}
            >
              <Settings size={18} color={Colors.deepPurple} strokeWidth={2.2} />
              <Text style={styles.actionWideLabel}>الإعدادات</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionWideBtn}
              onPress={() => setEditProfileOpen(true)}
              activeOpacity={0.85}
            >
              <CreditCard size={18} color={Colors.deepPurple} strokeWidth={2.2} />
              <Text style={styles.actionWideLabel}>معلومات الحساب</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Account Feature Modals */}
      <EditProfileModal
        visible={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
      />
      <FavoritesModal
        visible={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
      />
      <SupportModal
        visible={supportOpen}
        onClose={() => setSupportOpen(false)}
      />
      <SettingsModal
        visible={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  scrollContent: {
    paddingBottom: 34,
  },
  profileCard: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    marginTop: 14,
    borderRadius: 20,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#EDEBF7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pencilCircle: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.vibrantPink,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
  profileInfoWrap: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 12,
  },
  welcomeName: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.deepPurple,
    marginBottom: 2,
  },
  phoneNumber: {
    fontSize: 12,
    color: Colors.subText,
    fontWeight: '600',
  },
  dessertThumbWrap: {
    width: 50,
    height: 50,
    borderRadius: 12,
    overflow: 'hidden',
  },
  dessertThumb: {
    width: '100%',
    height: '100%',
  },
  pointsBanner: {
    backgroundColor: Colors.goldenYellowLight,
    marginHorizontal: Spacing.lg,
    marginTop: 12,
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#FBE694',
  },
  pointsTextWrap: {
    alignItems: 'flex-end',
    flex: 1,
  },
  pointsScoreRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
  },
  starBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.deepPurple,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.vibrantPink,
  },
  pointsWord: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.deepPurple,
  },
  pointsSub: {
    fontSize: 10,
    color: Colors.subText,
    marginTop: 2,
    textAlign: 'right',
  },
  redeemBtn: {
    backgroundColor: Colors.vibrantPink,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  redeemBtnText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  ordersHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginTop: 20,
    marginBottom: 8,
  },
  headerTitleBox: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
  },
  ordersMainTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.deepPurple,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: 10,
    marginBottom: 12,
  },
  tabPill: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 9,
    borderRadius: BorderRadius.full,
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tabPillActive: {
    backgroundColor: Colors.vibrantPink,
    borderColor: Colors.vibrantPink,
  },
  tabPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.subText,
  },
  tabPillTextActive: {
    color: Colors.white,
  },
  ordersList: {
    paddingHorizontal: Spacing.lg,
    gap: 12,
  },
  noOrdersCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  noOrdersText: {
    fontSize: 13,
    color: Colors.subText,
  },
  orderCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 14,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  orderCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderThumb: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginLeft: 10,
  },
  orderMetaBox: {
    flex: 1,
    alignItems: 'flex-end',
  },
  orderNumberText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: Colors.deepPurple,
    marginBottom: 3,
  },
  orderDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  orderDateText: {
    fontSize: 11,
    color: Colors.subText,
  },
  orderPriceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  orderPriceText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.vibrantPink,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.softGray,
  },
  timelineStep: {
    alignItems: 'center',
    minWidth: 50,
  },
  timelineCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.softGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  timelineCircleDone: {
    backgroundColor: '#D1D5DB',
  },
  timelineCircleActive: {
    backgroundColor: Colors.vibrantPink,
  },
  timelineLabel: {
    fontSize: 9,
    color: Colors.subText,
    fontWeight: '600',
    textAlign: 'center',
  },
  timelineLabelActive: {
    color: Colors.vibrantPink,
    fontWeight: '800',
  },
  timelineBar: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.border,
    marginBottom: 16,
  },
  timelineBarActive: {
    backgroundColor: Colors.vibrantPink,
  },
  accountHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginTop: 20,
    marginBottom: 8,
  },
  accountMainTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.deepPurple,
  },
  actionsGrid: {
    paddingHorizontal: Spacing.lg,
    gap: 10,
  },
  actionsGridRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionGridCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  actionCardHighlighted: {
    backgroundColor: Colors.vibrantPinkLight,
    borderWidth: 1,
    borderColor: '#FCCCD9',
  },
  actionGridLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.deepPurple,
    marginTop: 6,
    textAlign: 'center',
  },
  actionsWideRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionWideBtn: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 14,
    paddingVertical: 12,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  actionWideLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.deepPurple,
  },
});
