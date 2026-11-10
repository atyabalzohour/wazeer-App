import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert,
  Linking,
  Switch,
} from 'react-native';
import {
  X,
  User,
  Phone,
  Mail,
  Check,
  Bell,
  Heart,
  Headphones,
  Settings,
  ShoppingCart,
  MessageCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Globe,
  Trash2,
} from 'lucide-react-native';
import { Colors, BorderRadius, Spacing } from '../theme/colors';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/mockData';

// ----------------------------------------------------
// 1. Edit Profile Modal
// ----------------------------------------------------
export const EditProfileModal: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = ({ visible, onClose }) => {
  const { userProfile, updateUserProfile } = useApp();
  const [name, setName] = useState(userProfile.name);
  const [phone, setPhone] = useState(userProfile.phone);
  const [email, setEmail] = useState(userProfile.email);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    updateUserProfile({ name, phone, email });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 700);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.sheetCard}>
          <View style={styles.sheetHeader}>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={18} color={Colors.muted} />
            </TouchableOpacity>
            <Text style={styles.sheetTitle}>تعديل البيانات الشخصية</Text>
          </View>

          <View style={styles.avatarEditRow}>
            <View style={styles.avatarLarge}>
              <User size={36} color={Colors.deepPurple} />
            </View>
            <Text style={styles.avatarChangeText}>أحمد محمود • عميل مميز ⭐</Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.fieldLabel}>الاسم بالكامل</Text>
            <View style={styles.inputWrap}>
              <User size={18} color={Colors.muted} />
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                textAlign="right"
                placeholder="أدخل اسمك"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.fieldLabel}>رقم الهاتف</Text>
            <View style={styles.inputWrap}>
              <Phone size={18} color={Colors.muted} />
              <TextInput
                style={styles.textInput}
                value={phone}
                onChangeText={setPhone}
                textAlign="right"
                keyboardType="phone-pad"
                placeholder="رقم الهاتف"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.fieldLabel}>البريد الإلكتروني</Text>
            <View style={styles.inputWrap}>
              <Mail size={18} color={Colors.muted} />
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                textAlign="right"
                keyboardType="email-address"
                placeholder="example@mail.com"
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.primaryActionBtn, savedSuccess && styles.btnSuccess]}
            onPress={handleSave}
            activeOpacity={0.85}
          >
            {savedSuccess ? (
              <Check size={18} color={Colors.white} />
            ) : null}
            <Text style={styles.primaryActionBtnText}>
              {savedSuccess ? 'تم الحفظ بنجاح ✓' : 'حفظ التغييرات'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// ----------------------------------------------------
// 2. Notifications Modal
// ----------------------------------------------------
export const NotificationsModal: React.FC = () => {
  const { notificationsOpen, setNotificationsOpen } = useApp();

  const notifications = [
    {
      id: '1',
      title: 'طلبك قيد التوصيل 🛵',
      body: 'المندوب في طريقه إليك لتسليم طلبك رقم #4892. طازج ولذيذ!',
      time: 'منذ 15 دقيقة',
      icon: 'order',
    },
    {
      id: '2',
      title: 'عرض الويك إند الساحر 🎉',
      body: 'خصم 30% على جميع أصناف الآيس كريم والفرابيه اليوم فقط.',
      time: 'منذ ساعتين',
      icon: 'offer',
    },
    {
      id: '3',
      title: 'مكافأة نقاط وزير الحلو ⭐',
      body: 'تمت إضافة 150 نقطة مكافأة إلى محفظتك الذهبية بنجاح.',
      time: 'أمس',
      icon: 'points',
    },
    {
      id: '4',
      title: 'صنف جديد متاح الآن! 🍰',
      body: 'تذوق كيكة شوكولاتة البندق البلجيكية الفاخرة بطعم خيالي.',
      time: 'منذ يومين',
      icon: 'product',
    },
  ];

  return (
    <Modal
      visible={notificationsOpen}
      animationType="slide"
      transparent
      onRequestClose={() => setNotificationsOpen(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.sheetCard}>
          <View style={styles.sheetHeader}>
            <TouchableOpacity
              onPress={() => setNotificationsOpen(false)}
              style={styles.closeBtn}
            >
              <X size={18} color={Colors.muted} />
            </TouchableOpacity>
            <Text style={styles.sheetTitle}>التنبيهات والإشعارات</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 420 }}>
            {notifications.map((item) => (
              <View key={item.id} style={styles.notifCard}>
                <View style={styles.notifTextWrap}>
                  <View style={styles.notifHeaderRow}>
                    <Text style={styles.notifTime}>{item.time}</Text>
                    <Text style={styles.notifTitle}>{item.title}</Text>
                  </View>
                  <Text style={styles.notifBody}>{item.body}</Text>
                </View>
                <View style={styles.notifIconCircle}>
                  <Bell size={18} color={Colors.vibrantPink} />
                </View>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={styles.secondaryActionBtn}
            onPress={() => setNotificationsOpen(false)}
          >
            <Text style={styles.secondaryActionBtnText}>إغلاق</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// ----------------------------------------------------
// 3. Favorites Modal
// ----------------------------------------------------
export const FavoritesModal: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = ({ visible, onClose }) => {
  const { favorites, toggleFavorite, addToCart } = useApp();

  const favoriteProducts = PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.sheetCard}>
          <View style={styles.sheetHeader}>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={18} color={Colors.muted} />
            </TouchableOpacity>
            <Text style={styles.sheetTitle}>الأصناف المفضلة ({favoriteProducts.length})</Text>
          </View>

          {favoriteProducts.length === 0 ? (
            <View style={styles.emptyWrap}>
              <Heart size={44} color={Colors.muted} />
              <Text style={styles.emptyTitle}>قائمة المفضلة فارغة</Text>
              <Text style={styles.emptySub}>
                اضغط على أيقونة القلب على أي منتج لحفظه في قائمتك المفضلة!
              </Text>
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 380 }}>
              {favoriteProducts.map((p) => (
                <View key={p.id} style={styles.favItemRow}>
                  <TouchableOpacity
                    style={styles.addFavCartBtn}
                    onPress={() => {
                      addToCart(p, p.flavors?.[0], p.sizes?.[0], 1);
                      Alert.alert('تمت الإضافة', `تمت إضافة ${p.name} إلى السلة بنجاح!`);
                    }}
                  >
                    <ShoppingCart size={14} color={Colors.white} />
                    <Text style={styles.addFavCartText}>أضف للسلة</Text>
                  </TouchableOpacity>

                  <View style={styles.favDetails}>
                    <Text style={styles.favName}>{p.name}</Text>
                    <Text style={styles.favPrice}>{p.price} EGP</Text>
                  </View>

                  <Image source={p.image} style={styles.favThumb} />

                  <TouchableOpacity
                    style={styles.trashFavBtn}
                    onPress={() => toggleFavorite(p.id)}
                  >
                    <Trash2 size={16} color={Colors.muted} />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}

          <TouchableOpacity style={styles.secondaryActionBtn} onPress={onClose}>
            <Text style={styles.secondaryActionBtnText}>إغلاق</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// ----------------------------------------------------
// 4. Help & Support Modal
// ----------------------------------------------------
export const SupportModal: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = ({ visible, onClose }) => {
  const handleCall = () => {
    Linking.openURL('tel:19888').catch(() => {
      Alert.alert('خدمة العملاء', 'اتصل على الخط الساخن: 19888');
    });
  };

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/201112345678').catch(() => {
      Alert.alert('واتساب', 'تواصل عبر واتساب على: +201112345678');
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.sheetCard}>
          <View style={styles.sheetHeader}>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={18} color={Colors.muted} />
            </TouchableOpacity>
            <Text style={styles.sheetTitle}>الدعم والمساعدة 🤝</Text>
          </View>

          <Text style={styles.supportIntro}>
            فريق خدمة عملاء وزير الحلو في خدمتكم دائماً لضمان أفضل تجربة حلا!
          </Text>

          <View style={styles.contactButtonsRow}>
            <TouchableOpacity style={styles.contactCard} onPress={handleCall} activeOpacity={0.85}>
              <Phone size={22} color={Colors.vibrantPink} />
              <Text style={styles.contactCardTitle}>الخط الساخن</Text>
              <Text style={styles.contactCardSub}>19888</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactCard} onPress={handleWhatsApp} activeOpacity={0.85}>
              <MessageCircle size={22} color={Colors.successGreen} />
              <Text style={styles.contactCardTitle}>محادثة واتساب</Text>
              <Text style={styles.contactCardSub}>رد فوري</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.faqBlock}>
            <Text style={styles.faqHeading}>الأسئلة الأكثر شيوعاً</Text>
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>🕒 ما هي أوقات عمل التوصيل؟</Text>
              <Text style={styles.faqAnswer}>نعمل يومياً من الساعة 9:00 صباحاً حتى 2:00 بعد منتصف الليل.</Text>
            </View>
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>💳 ما هي طرق الدفع المتاحة؟</Text>
              <Text style={styles.faqAnswer}>الدفع نقداً عند الاستلام، بطاقات الفيزا والماستركارد، ومحافظ إلكترونية (فودافون كاش وغيرها).</Text>
            </View>
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>⭐ كيف استبدل نقاط الولاء؟</Text>
              <Text style={styles.faqAnswer}>من صفحة "حسابي"، اضغط على زر "استبدل النقاط" لتحويلها إلى رصيد خصم فوري.</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.secondaryActionBtn} onPress={onClose}>
            <Text style={styles.secondaryActionBtnText}>إغلاق</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// ----------------------------------------------------
// 5. Settings Modal
// ----------------------------------------------------
export const SettingsModal: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = ({ visible, onClose }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.sheetCard}>
          <View style={styles.sheetHeader}>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={18} color={Colors.muted} />
            </TouchableOpacity>
            <Text style={styles.sheetTitle}>إعدادات التطبيق ⚙️</Text>
          </View>

          <View style={styles.settingsList}>
            <View style={styles.settingRow}>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#D1D5DB', true: Colors.vibrantPink }}
                thumbColor={Colors.white}
              />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>إشعارات العروض والطلبات</Text>
                <Text style={styles.settingSub}>تنبيهك بمستجدات طلبك والعروض الحصرية</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <View style={styles.langBadge}>
                <Text style={styles.langText}>العربية (مصر)</Text>
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>لغة التطبيق</Text>
                <Text style={styles.settingSub}>اللغة المختارة حالياً</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <ShieldCheck size={22} color={Colors.deepPurple} />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>الشروط وسياسة الخصوصية</Text>
                <Text style={styles.settingSub}>بياناتك وأمان حسابك في أمان تام</Text>
              </View>
            </View>
          </View>

          <View style={styles.aboutCard}>
            <Text style={styles.aboutTitle}>وزير الحلو • Wazeer ElHelw</Text>
            <Text style={styles.aboutVersion}>الإصدار 1.0.0 (Build 2026)</Text>
            <Text style={styles.aboutDev}>تصميم وتطوير بواسطة م/ حافظ رحيم</Text>
          </View>

          <TouchableOpacity style={styles.secondaryActionBtn} onPress={onClose}>
            <Text style={styles.secondaryActionBtnText}>إغلاق</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// ----------------------------------------------------
// Styles for All Modals
// ----------------------------------------------------
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  sheetCard: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 28,
    maxHeight: '88%',
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
    paddingBottom: 12,
  },
  sheetTitle: {
    fontSize: 16.5,
    fontWeight: '800',
    color: Colors.deepPurple,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEditRow: {
    alignItems: 'center',
    marginBottom: 18,
  },
  avatarLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0EFF9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: Colors.turquoise,
  },
  avatarChangeText: {
    fontSize: 13,
    color: Colors.deepPurple,
    fontWeight: '700',
  },
  formGroup: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 12,
    color: Colors.subText,
    marginBottom: 6,
    textAlign: 'right',
    fontWeight: '600',
  },
  inputWrap: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#F7F8FC',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ECEEF5',
    height: 46,
  },
  textInput: {
    flex: 1,
    fontSize: 13.5,
    color: Colors.darkText,
    textAlign: 'right',
    marginRight: 8,
  },
  primaryActionBtn: {
    backgroundColor: Colors.vibrantPink,
    borderRadius: 14,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  btnSuccess: {
    backgroundColor: Colors.successGreen,
  },
  primaryActionBtnText: {
    color: Colors.white,
    fontSize: 14.5,
    fontWeight: '800',
  },
  secondaryActionBtn: {
    backgroundColor: '#F0F1F6',
    borderRadius: 12,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  secondaryActionBtnText: {
    color: Colors.deepPurple,
    fontSize: 13.5,
    fontWeight: '700',
  },
  notifCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FAFBFD',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EFF0F7',
  },
  notifIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FDEDF2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  notifTextWrap: {
    flex: 1,
    alignItems: 'flex-end',
  },
  notifHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 4,
  },
  notifTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: Colors.deepPurple,
  },
  notifTime: {
    fontSize: 10.5,
    color: Colors.muted,
  },
  notifBody: {
    fontSize: 11.5,
    color: Colors.subText,
    textAlign: 'right',
    lineHeight: 17,
  },
  emptyWrap: {
    alignItems: 'center',
    paddingVertical: 36,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.deepPurple,
    marginTop: 12,
    marginBottom: 4,
  },
  emptySub: {
    fontSize: 12,
    color: Colors.subText,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  favItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFBFD',
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ECEEF5',
  },
  trashFavBtn: {
    padding: 6,
  },
  favThumb: {
    width: 52,
    height: 52,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  favDetails: {
    flex: 1,
    alignItems: 'flex-end',
  },
  favName: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.deepPurple,
    marginBottom: 4,
  },
  favPrice: {
    fontSize: 12,
    color: Colors.vibrantPink,
    fontWeight: '700',
  },
  addFavCartBtn: {
    backgroundColor: Colors.vibrantPink,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addFavCartText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  supportIntro: {
    fontSize: 12.5,
    color: Colors.subText,
    textAlign: 'right',
    marginBottom: 14,
    lineHeight: 18,
  },
  contactButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  contactCard: {
    flex: 1,
    backgroundColor: '#F7F8FC',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8EAF2',
  },
  contactCardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.deepPurple,
    marginTop: 6,
    marginBottom: 2,
  },
  contactCardSub: {
    fontSize: 11,
    color: Colors.subText,
  },
  faqBlock: {
    backgroundColor: '#FAFBFD',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EAEBF3',
  },
  faqHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.deepPurple,
    marginBottom: 8,
    textAlign: 'right',
  },
  faqItem: {
    marginBottom: 8,
  },
  faqQuestion: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.deepPurple,
    textAlign: 'right',
    marginBottom: 2,
  },
  faqAnswer: {
    fontSize: 11,
    color: Colors.subText,
    textAlign: 'right',
    lineHeight: 16,
  },
  settingsList: {
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingText: {
    alignItems: 'flex-end',
    flex: 1,
    marginRight: 10,
  },
  settingTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: Colors.deepPurple,
    marginBottom: 2,
  },
  settingSub: {
    fontSize: 11,
    color: Colors.subText,
  },
  langBadge: {
    backgroundColor: '#EDF9FA',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.turquoise,
  },
  langText: {
    fontSize: 11.5,
    color: Colors.turquoise,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F6',
  },
  aboutCard: {
    backgroundColor: '#F9FAFC',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#EEEEF5',
  },
  aboutTitle: {
    fontSize: 12.5,
    fontWeight: '800',
    color: Colors.deepPurple,
    marginBottom: 2,
  },
  aboutVersion: {
    fontSize: 11,
    color: Colors.subText,
    marginBottom: 2,
  },
  aboutDev: {
    fontSize: 10.5,
    color: Colors.muted,
  },
});

