import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  User,
  Pencil,
  ChevronLeft,
  ChevronRight,
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
  Wallet,
  ShieldCheck,
  LogOut,
  HelpCircle,
  Plus,
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
    setCurrentTab,
    favorites,
    addresses,
  } = useApp();

  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(150);

  const handleRechargeWallet = () => {
    Alert.alert(
      'شحن المحفظة 💳',
      'اختر المبلغ المطلوب شحنه في محفظتك الإلكترونية:',
      [
        { text: '+50 EGP', onPress: () => { setWalletBalance(b => b + 50); Alert.alert('تم الشحن', 'تمت إضافة 50 EGP إلى محفظتك بنجاح!'); } },
        { text: '+100 EGP', onPress: () => { setWalletBalance(b => b + 100); Alert.alert('تم الشحن', 'تمت إضافة 100 EGP إلى محفظتك بنجاح!'); } },
        { text: 'إلغاء', style: 'cancel' },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'تسجيل الخروج',
      'هل أنت متأكد من رغبتك في تسجيل الخروج من حسابك؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        { text: 'تسجيل خروج', style: 'destructive', onPress: () => Alert.alert('تم تسجيل الخروج', 'إلى اللقاء قريباً في وزير الحلو!') },
      ]
    );
  };

  const lastOrder = orders[0];

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
            <View style={styles.vipTag}>
              <Text style={styles.vipTagText}>عميل برونزي مميز ⭐</Text>
            </View>
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

        {/* Wallet & Stats Strip */}
        <View style={styles.statsRow}>
          {/* Wallet Card */}
          <TouchableOpacity
            style={styles.walletCard}
            onPress={handleRechargeWallet}
            activeOpacity={0.85}
          >
            <View style={styles.walletPlus}>
              <Plus size={14} color={Colors.white} />
            </View>
            <View style={styles.walletTextWrap}>
              <Text style={styles.walletAmount}>{walletBalance} EGP</Text>
              <Text style={styles.walletLabel}>رصيد المحفظة</Text>
            </View>
            <View style={styles.walletIconCircle}>
              <Wallet size={18} color={Colors.vibrantPink} />
            </View>
          </TouchableOpacity>

          {/* Favorites Count */}
          <TouchableOpacity
            style={styles.statMiniCard}
            onPress={() => setFavoritesOpen(true)}
            activeOpacity={0.85}
          >
            <Text style={styles.statMiniVal}>{favorites.length}</Text>
            <Text style={styles.statMiniLabel}>المفضلة</Text>
            <Heart size={16} color={Colors.vibrantPink} fill={Colors.vibrantPink} />
          </TouchableOpacity>

          {/* Orders Count */}
          <TouchableOpacity
            style={styles.statMiniCard}
            onPress={() => setCurrentTab('orders')}
            activeOpacity={0.85}
          >
            <Text style={styles.statMiniVal}>{orders.length}</Text>
            <Text style={styles.statMiniLabel}>إجمالي الطلبات</Text>
            <ShoppingBag size={16} color={Colors.deepPurple} />
          </TouchableOpacity>
        </View>

        {/* Last Order Quick View */}
        {lastOrder && (
          <View style={styles.lastOrderCard}>
            <View style={styles.lastOrderHeader}>
              <TouchableOpacity
                onPress={() => setCurrentTab('orders')}
                style={styles.viewAllOrdersLink}
              >
                <ChevronLeft size={14} color={Colors.vibrantPink} />
                <Text style={styles.viewAllOrdersText}>عرض كل الطلبات</Text>
              </TouchableOpacity>
              <Text style={styles.lastOrderTitle}>آخر طلب لديك</Text>
            </View>

            <TouchableOpacity
              style={styles.lastOrderBody}
              onPress={() => setCurrentTab('orders')}
              activeOpacity={0.85}
            >
              <View style={styles.lastOrderPriceCol}>
                <Text style={styles.lastOrderPrice}>{lastOrder.total} EGP</Text>
                <View style={styles.statusPill}>
                  <Text style={styles.statusPillText}>
                    {lastOrder.statusStep === 4 ? 'تم التوصيل ✓' : 'جاري التوصيل 🛵'}
                  </Text>
                </View>
              </View>

              <View style={styles.lastOrderInfo}>
                <Text style={styles.lastOrderNum}>طلب {lastOrder.orderNumber}</Text>
                <Text style={styles.lastOrderItems}>
                  {lastOrder.items.map(i => i.productName).join(' • ')}
                </Text>
                <Text style={styles.lastOrderDate}>{lastOrder.dateStr}</Text>
              </View>

              <Image
                source={lastOrder.items[0]?.image || require('../../assets/cat-cake.jpg')}
                style={styles.lastOrderThumb}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* My Account Section Header */}
        <View style={styles.accountHeaderRow}>
          <View style={{ flex: 1 }} />
          <View style={styles.headerTitleBox}>
            <UserCircle2 size={20} color={Colors.vibrantPink} strokeWidth={2.2} />
            <Text style={styles.accountMainTitle}>إدارة الحساب</Text>
          </View>
        </View>

        {/* Quick Actions Grid matching wazeer-app.png */}
        <View style={styles.actionsGrid}>
          {/* Row 1: Right to Left: عناويني | المفضلة | الدعم والمساعدة | التنبيهات */}
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
                عناويني ({addresses.length})
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
              <Text style={styles.actionWideLabel}>الإعدادات العامة</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionWideBtn}
              onPress={() => setEditProfileOpen(true)}
              activeOpacity={0.85}
            >
              <CreditCard size={18} color={Colors.deepPurple} strokeWidth={2.2} />
              <Text style={styles.actionWideLabel}>البيانات الشخصية</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
          activeOpacity={0.85}
        >
          <LogOut size={16} color="#E0245E" />
          <Text style={styles.logoutBtnText}>تسجيل الخروج</Text>
        </TouchableOpacity>
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
    backgroundColor: Colors.softGray,
  },
  scrollContent: {
    paddingBottom: 28,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    marginTop: 14,
    borderRadius: BorderRadius.xl,
    padding: 14,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  dessertThumbWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.goldenYellow,
  },
  dessertThumb: {
    width: '100%',
    height: '100%',
  },
  profileInfoWrap: {
    flex: 1,
    alignItems: 'flex-end',
    paddingHorizontal: 12,
  },
  welcomeName: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.deepPurple,
    marginBottom: 2,
  },
  phoneNumber: {
    fontSize: 12,
    color: Colors.subText,
    marginBottom: 4,
  },
  vipTag: {
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFEBA3',
  },
  vipTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B38A00',
  },
  avatarWrap: {
    position: 'relative',
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F2F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pencilCircle: {
    position: 'absolute',
    bottom: -2,
    left: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.vibrantPink,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
  pointsBanner: {
    backgroundColor: Colors.goldenYellow,
    marginHorizontal: Spacing.lg,
    marginTop: 12,
    borderRadius: BorderRadius.xl,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: Colors.goldenYellow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  redeemBtn: {
    backgroundColor: Colors.deepPurple,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  redeemBtnText: {
    color: Colors.white,
    fontSize: 11.5,
    fontWeight: '800',
  },
  pointsTextWrap: {
    alignItems: 'flex-end',
  },
  pointsScoreRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
  },
  pointsNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.deepPurple,
  },
  pointsWord: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.deepPurple,
  },
  starBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsSub: {
    fontSize: 10.5,
    color: '#6E5800',
    marginTop: 2,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: Spacing.lg,
    marginTop: 12,
    gap: 10,
  },
  walletCard: {
    flex: 2,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ECECF2',
    elevation: 2,
  },
  walletPlus: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.vibrantPink,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletTextWrap: {
    alignItems: 'flex-end',
    flex: 1,
    marginRight: 8,
  },
  walletAmount: {
    fontSize: 14,
    fontWeight: '900',
    color: Colors.deepPurple,
  },
  walletLabel: {
    fontSize: 10.5,
    color: Colors.subText,
  },
  walletIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FDEDF2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statMiniCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ECECF2',
    elevation: 2,
  },
  statMiniVal: {
    fontSize: 15,
    fontWeight: '900',
    color: Colors.deepPurple,
    marginBottom: 2,
  },
  statMiniLabel: {
    fontSize: 10,
    color: Colors.subText,
    marginBottom: 4,
  },
  lastOrderCard: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    marginTop: 14,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ECECF2',
    elevation: 2,
  },
  lastOrderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5FA',
    paddingBottom: 8,
  },
  lastOrderTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.deepPurple,
  },
  viewAllOrdersLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  viewAllOrdersText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: Colors.vibrantPink,
  },
  lastOrderBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastOrderPriceCol: {
    alignItems: 'flex-start',
  },
  lastOrderPrice: {
    fontSize: 14.5,
    fontWeight: '800',
    color: Colors.vibrantPink,
    marginBottom: 4,
  },
  statusPill: {
    backgroundColor: '#E6F8FA',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0A7F8D',
  },
  lastOrderInfo: {
    flex: 1,
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  lastOrderNum: {
    fontSize: 12.5,
    fontWeight: '800',
    color: Colors.deepPurple,
    marginBottom: 2,
  },
  lastOrderItems: {
    fontSize: 11,
    color: Colors.subText,
    textAlign: 'right',
  },
  lastOrderDate: {
    fontSize: 10,
    color: Colors.muted,
    marginTop: 2,
  },
  lastOrderThumb: {
    width: 44,
    height: 44,
    borderRadius: 10,
  },
  accountHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginTop: 18,
    marginBottom: 8,
  },
  headerTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  accountMainTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.deepPurple,
  },
  actionsGrid: {
    paddingHorizontal: Spacing.lg,
    gap: 10,
  },
  actionsGridRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionGridCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ECECF2',
  },
  actionCardHighlighted: {
    borderWidth: 1.5,
    borderColor: Colors.vibrantPink,
  },
  actionGridLabel: {
    fontSize: 11.5,
    fontWeight: '700',
    color: Colors.deepPurple,
    marginTop: 6,
  },
  actionsWideRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionWideBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    paddingVertical: 12,
    gap: 8,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ECECF2',
  },
  actionWideLabel: {
    fontSize: 12.5,
    fontWeight: '700',
    color: Colors.deepPurple,
  },
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF0F3',
    marginHorizontal: Spacing.lg,
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 14,
    gap: 6,
    borderWidth: 1,
    borderColor: '#FFDCE2',
  },
  logoutBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#E0245E',
  },
});
