import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
} from 'react-native';
import {
  ShoppingCart,
  Bell,
  ChevronRight,
  ChevronLeft,
  Check,
  CheckCircle2,
  MapPin,
  Home,
  Building2,
  Map,
  Clock,
  Calendar,
  Wallet,
  CreditCard,
  Banknote,
  Smartphone,
  Plus,
  Trash2,
  Info,
  FileText,
  Pencil,
} from 'lucide-react-native';
import { Colors, BorderRadius, Spacing } from '../theme/colors';
import { useApp } from '../context/AppContext';

export const CheckoutScreen: React.FC = () => {
  const {
    checkoutOpen,
    setCheckoutOpen,
    cartItems,
    subtotal,
    deliveryFee,
    discountAmount,
    finalTotal,
    addresses,
    selectedAddress,
    setSelectedAddress,
    createOrder,
    updateQuantity,
    removeFromCart,
    cartCount,
  } = useApp();

  if (!checkoutOpen) return null;

  const [deliveryTime, setDeliveryTime] = useState<'now' | 'scheduled'>('now');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'wallet'>('cash');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      createOrder(deliveryTime, paymentMethod, orderNotes);
    }, 600);
  };

  return (
    <Modal
      visible={checkoutOpen}
      animationType="slide"
      onRequestClose={() => setCheckoutOpen(false)}
    >
      <View style={styles.container}>
        {/* Top Header matching wazeer-app1.png */}
        <View style={styles.topHeader}>
          {/* Left: Cart with badge + Bell */}
          <View style={styles.actionsGroup}>
            <View style={styles.circleBtn}>
              <ShoppingCart size={20} color={Colors.deepPurple} strokeWidth={2.2} />
              {cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </View>
            <View style={styles.circleBtn}>
              <Bell size={20} color={Colors.deepPurple} strokeWidth={2.2} />
              <View style={styles.dotIndicator} />
            </View>
          </View>

          {/* Center: Logo */}
          <View style={styles.headerLogoWrap}>
            <Image
              source={require('../../assets/logo.webp')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
          </View>

          {/* Right: Back button pill */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => setCheckoutOpen(false)}
            activeOpacity={0.8}
          >
            <ChevronRight size={16} color={Colors.vibrantPink} strokeWidth={2.5} />
            <Text style={styles.backBtnText}>إتمام الطلب</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Progress Stepper matching wazeer-app1.png */}
          <View style={styles.stepperCard}>
            {/* Left: تأكيد الطلب */}
            <View style={styles.stepItem}>
              <View style={styles.stepCircle}>
                <Check size={14} color={Colors.muted} strokeWidth={2.5} />
              </View>
              <Text style={styles.stepLabel}>تأكيد الطلب</Text>
            </View>

            <View style={styles.stepLine} />

            {/* Middle: الدفع */}
            <View style={styles.stepItem}>
              <View style={[styles.stepCircle, styles.stepCircleActive]}>
                <ShoppingCart size={14} color={Colors.white} strokeWidth={2.5} />
              </View>
              <Text style={[styles.stepLabel, styles.stepLabelActive]}>الدفع</Text>
            </View>

            <View style={[styles.stepLine, styles.stepLineActive]} />

            {/* Right: عنوان التوصيل */}
            <View style={styles.stepItem}>
              <View style={[styles.stepCircle, styles.stepCircleActive]}>
                <MapPin size={14} color={Colors.white} strokeWidth={2.5} />
              </View>
              <Text style={[styles.stepLabel, styles.stepLabelActive]}>
                عنوان التوصيل
              </Text>
            </View>
          </View>

          {/* Section 1: Delivery Address */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <TouchableOpacity>
                <Text style={styles.changeAddressLink}>&lt; تغيير العنوان</Text>
              </TouchableOpacity>
              <View style={styles.sectionTitleBox}>
                <MapPin size={18} color={Colors.vibrantPink} strokeWidth={2.2} />
                <Text style={styles.sectionTitle}>عنوان التوصيل</Text>
              </View>
            </View>

            <View style={styles.addressOptionsList}>
              {addresses.map((addr) => {
                const isSelected = selectedAddress.id === addr.id;
                return (
                  <TouchableOpacity
                    key={addr.id}
                    style={[
                      styles.addressItem,
                      isSelected && styles.addressItemSelected,
                    ]}
                    onPress={() => setSelectedAddress(addr)}
                    activeOpacity={0.85}
                  >
                    <View style={styles.radioIndicator}>
                      <View
                        style={[
                          styles.radioDotOuter,
                          isSelected && styles.radioDotOuterActive,
                        ]}
                      >
                        {isSelected && <View style={styles.radioDotInner} />}
                      </View>
                    </View>

                    <View style={styles.addressInfoWrap}>
                      <Text style={styles.addressTitle}>{addr.title}</Text>
                      <Text style={styles.addressDetail}>
                        {addr.street}، {addr.details}
                      </Text>
                    </View>

                    <View style={styles.addressIconCircle}>
                      {addr.type === 'home' ? (
                        <Home
                          size={18}
                          color={isSelected ? Colors.vibrantPink : Colors.deepPurple}
                          strokeWidth={2.2}
                        />
                      ) : (
                        <Building2
                          size={18}
                          color={isSelected ? Colors.vibrantPink : Colors.deepPurple}
                          strokeWidth={2.2}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}

              {/* Map Selection Option */}
              <TouchableOpacity style={styles.mapPickerCard} activeOpacity={0.85}>
                <ChevronLeft size={16} color={Colors.muted} strokeWidth={2.4} />
                <View style={styles.mapInfoText}>
                  <Text style={styles.mapTitle}>تحديد على الخريطة</Text>
                  <Text style={styles.mapSubtitle}>اختيار موقع دقيق للتوصيل</Text>
                </View>
                <View style={styles.mapIconCircle}>
                  <Map size={18} color={Colors.vibrantPink} strokeWidth={2.2} />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Section 2: Delivery Time */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <View style={{ flex: 1 }} />
              <View style={styles.sectionTitleBox}>
                <Clock size={18} color={Colors.vibrantPink} strokeWidth={2.2} />
                <Text style={styles.sectionTitle}>موعد التوصيل</Text>
              </View>
            </View>

            <View style={styles.deliveryTimeRow}>
              <TouchableOpacity
                style={[
                  styles.timePill,
                  deliveryTime === 'scheduled' && styles.timePillActive,
                ]}
                onPress={() => setDeliveryTime('scheduled')}
                activeOpacity={0.85}
              >
                <Calendar size={16} color={Colors.subText} strokeWidth={2.2} />
                <Text style={styles.timePillText}>تحديد موعد لاحق</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.timePill,
                  deliveryTime === 'now' && styles.timePillActive,
                ]}
                onPress={() => setDeliveryTime('now')}
                activeOpacity={0.85}
              >
                <CheckCircle2
                  size={16}
                  color={deliveryTime === 'now' ? Colors.vibrantPink : Colors.muted}
                  strokeWidth={2.2}
                />
                <Text
                  style={[
                    styles.timePillText,
                    deliveryTime === 'now' && styles.timePillTextActive,
                  ]}
                >
                  الآن (خلال 30 – 45 دقيقة) ⚡
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Section 3: Payment Method */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <View style={{ flex: 1 }} />
              <View style={styles.sectionTitleBox}>
                <Wallet size={18} color={Colors.vibrantPink} strokeWidth={2.2} />
                <Text style={styles.sectionTitle}>طريقة الدفع</Text>
              </View>
            </View>

            <View style={styles.paymentMethodsGrid}>
              {/* Wallet */}
              <TouchableOpacity
                style={[
                  styles.paymentCard,
                  paymentMethod === 'wallet' && styles.paymentCardActive,
                ]}
                onPress={() => setPaymentMethod('wallet')}
                activeOpacity={0.85}
              >
                <View style={styles.paymentRadio}>
                  {paymentMethod === 'wallet' && (
                    <CheckCircle2 size={16} color={Colors.vibrantPink} strokeWidth={2.4} />
                  )}
                </View>
                <Smartphone size={24} color={Colors.deepPurple} strokeWidth={2} />
                <Text style={styles.paymentName}>المحفظة الإلكترونية</Text>
              </TouchableOpacity>

              {/* Card */}
              <TouchableOpacity
                style={[
                  styles.paymentCard,
                  paymentMethod === 'card' && styles.paymentCardActive,
                ]}
                onPress={() => setPaymentMethod('card')}
                activeOpacity={0.85}
              >
                <View style={styles.paymentRadio}>
                  {paymentMethod === 'card' && (
                    <CheckCircle2 size={16} color={Colors.vibrantPink} strokeWidth={2.4} />
                  )}
                </View>
                <CreditCard size={24} color={Colors.deepPurple} strokeWidth={2} />
                <Text style={styles.paymentName}>بطاقة بنكية</Text>
              </TouchableOpacity>

              {/* Cash */}
              <TouchableOpacity
                style={[
                  styles.paymentCard,
                  paymentMethod === 'cash' && styles.paymentCardActive,
                ]}
                onPress={() => setPaymentMethod('cash')}
                activeOpacity={0.85}
              >
                <View style={styles.paymentRadio}>
                  {paymentMethod === 'cash' && (
                    <CheckCircle2 size={16} color={Colors.vibrantPink} strokeWidth={2.4} />
                  )}
                </View>
                <Banknote size={24} color={Colors.vibrantPink} strokeWidth={2} />
                <Text style={styles.paymentName}>الدفع عند الاستلام</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Section 4: Order Summary */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <View style={{ flex: 1 }} />
              <View style={styles.sectionTitleBox}>
                <ShoppingCart size={18} color={Colors.vibrantPink} strokeWidth={2.2} />
                <Text style={styles.sectionTitle}>ملخص الطلب</Text>
              </View>
            </View>

            <View style={styles.orderItemsSummaryList}>
              {cartItems.map((item) => (
                <View key={item.cartItemId} style={styles.summaryItemRow}>
                  <View style={styles.summaryItemPriceBox}>
                    <Text style={styles.summaryItemPrice}>{item.totalPrice} EGP</Text>
                    <View style={styles.miniStepper}>
                      <TouchableOpacity
                        onPress={() => updateQuantity(item.cartItemId, 1)}
                      >
                        <Plus size={12} color={Colors.deepPurple} strokeWidth={2.5} />
                      </TouchableOpacity>
                      <Text style={styles.miniQty}>{item.quantity}</Text>
                      <TouchableOpacity
                        onPress={() => removeFromCart(item.cartItemId)}
                      >
                        <Trash2 size={12} color={Colors.muted} strokeWidth={2.2} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.summaryItemDetails}>
                    <Text style={styles.summaryItemName}>{item.product.name}</Text>
                    <Text style={styles.summaryItemVariant}>
                      {item.selectedSize?.name || 'قطعة متوسطة'}
                    </Text>
                  </View>

                  <Image
                    source={item.product.image}
                    style={styles.summaryThumb}
                  />
                </View>
              ))}
            </View>

            <View style={styles.calcDivider} />

            <View style={styles.summaryRow}>
              <Text style={styles.calcVal}>{subtotal} EGP</Text>
              <Text style={styles.calcLabel}>إجمالي المنتجات</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.calcVal}>{deliveryFee} EGP</Text>
              <View style={styles.infoLabelWrap}>
                <Info size={13} color={Colors.muted} strokeWidth={2.2} />
                <Text style={styles.calcLabel}>رسوم التوصيل</Text>
              </View>
            </View>

            {discountAmount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={[styles.calcVal, { color: Colors.successGreen }]}>
                  -{discountAmount} EGP
                </Text>
                <Text style={styles.calcLabel}>الخصم</Text>
              </View>
            )}

            <View style={styles.finalBoxHighlight}>
              <Text style={styles.finalPriceBold}>{finalTotal} EGP</Text>
              <Text style={styles.finalLabelBold}>الإجمالي النهائي</Text>
            </View>
          </View>

          {/* Section 5: Order Notes */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <View style={{ flex: 1 }} />
              <View style={styles.sectionTitleBox}>
                <FileText size={18} color={Colors.vibrantPink} strokeWidth={2.2} />
                <Text style={styles.sectionTitle}>ملاحظات على الطلب</Text>
              </View>
            </View>

            <View style={styles.notesBox}>
              <Pencil size={16} color={Colors.muted} strokeWidth={2.2} />
              <TextInput
                style={styles.notesInput}
                placeholder="مثال: بدون مكسرات / كتابة تهنئة على الكيك ..."
                placeholderTextColor={Colors.muted}
                value={orderNotes}
                onChangeText={setOrderNotes}
                multiline
                textAlign="right"
              />
            </View>
          </View>

          {/* Confirm Button */}
          <TouchableOpacity
            style={[styles.confirmBtn, isSubmitting && styles.confirmBtnDisabled]}
            onPress={handleConfirmOrder}
            disabled={isSubmitting}
            activeOpacity={0.85}
          >
            <CheckCircle2 size={22} color={Colors.white} strokeWidth={2.2} />
            <Text style={styles.confirmBtnText}>
              {isSubmitting ? 'جاري إرسال الطلب...' : 'تأكيد الطلب'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  topHeader: {
    backgroundColor: Colors.turquoise,
    paddingTop: Platform.OS === 'ios' ? 48 : (Platform.OS === 'android' ? 24 : 14),
    paddingBottom: 16,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },
  actionsGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: Colors.vibrantPink,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 9.5,
    fontWeight: '700',
  },
  dotIndicator: {
    position: 'absolute',
    top: 6,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Colors.vibrantPink,
  },
  headerLogoWrap: {
    alignItems: 'center',
  },
  headerLogo: {
    width: 95,
    height: 44,
  },
  backBtn: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  backBtnText: {
    color: Colors.vibrantPink,
    fontSize: 12,
    fontWeight: '700',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  stepperCard: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    marginTop: 14,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  stepItem: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.softGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepCircleActive: {
    backgroundColor: Colors.vibrantPink,
  },
  stepLabel: {
    fontSize: 11,
    color: Colors.subText,
    fontWeight: '600',
  },
  stepLabelActive: {
    color: Colors.vibrantPink,
    fontWeight: '700',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.border,
    marginHorizontal: 8,
    marginBottom: 16,
  },
  stepLineActive: {
    backgroundColor: Colors.vibrantPink,
  },
  sectionCard: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    marginTop: 14,
    borderRadius: 18,
    padding: 16,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleBox: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.deepPurple,
  },
  changeAddressLink: {
    fontSize: 11.5,
    fontWeight: '700',
    color: Colors.vibrantPink,
  },
  addressOptionsList: {
    gap: 10,
  },
  addressItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  addressItemSelected: {
    borderColor: Colors.vibrantPink,
    backgroundColor: Colors.vibrantPinkLight,
  },
  addressIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.softGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  addressInfoWrap: {
    flex: 1,
    alignItems: 'flex-end',
  },
  addressTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.deepPurple,
    marginBottom: 2,
  },
  addressDetail: {
    fontSize: 11,
    color: Colors.subText,
  },
  radioIndicator: {
    marginRight: 6,
  },
  radioDotOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: Colors.muted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioDotOuterActive: {
    borderColor: Colors.vibrantPink,
  },
  radioDotInner: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: Colors.vibrantPink,
  },
  mapPickerCard: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FAFBFD',
  },
  mapIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.vibrantPinkLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  mapInfoText: {
    flex: 1,
    alignItems: 'flex-end',
  },
  mapTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.deepPurple,
  },
  mapSubtitle: {
    fontSize: 11,
    color: Colors.subText,
  },
  deliveryTimeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  timePill: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    gap: 6,
  },
  timePillActive: {
    borderColor: Colors.vibrantPink,
    backgroundColor: Colors.vibrantPinkLight,
  },
  timePillText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.subText,
  },
  timePillTextActive: {
    color: Colors.vibrantPink,
    fontWeight: '700',
  },
  paymentMethodsGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  paymentCard: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    alignItems: 'center',
    position: 'relative',
    gap: 6,
  },
  paymentCardActive: {
    borderColor: Colors.vibrantPink,
    backgroundColor: Colors.vibrantPinkLight,
  },
  paymentRadio: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  paymentName: {
    fontSize: 10.5,
    fontWeight: '700',
    color: Colors.deepPurple,
    textAlign: 'center',
  },
  orderItemsSummaryList: {
    gap: 10,
  },
  summaryItemRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 6,
  },
  summaryThumb: {
    width: 44,
    height: 44,
    borderRadius: 10,
    marginLeft: 10,
  },
  summaryItemDetails: {
    flex: 1,
    alignItems: 'flex-end',
  },
  summaryItemName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: Colors.deepPurple,
  },
  summaryItemVariant: {
    fontSize: 10.5,
    color: Colors.subText,
  },
  summaryItemPriceBox: {
    alignItems: 'flex-start',
    marginRight: 6,
  },
  summaryItemPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.vibrantPink,
    marginBottom: 2,
  },
  miniStepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.softGray,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    gap: 6,
  },
  miniQty: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.deepPurple,
  },
  calcDivider: {
    height: 1,
    backgroundColor: Colors.softGray,
    marginVertical: 10,
  },
  summaryRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 3,
  },
  calcLabel: {
    fontSize: 12.5,
    color: Colors.subText,
  },
  infoLabelWrap: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
  },
  calcVal: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.deepPurple,
  },
  finalBoxHighlight: {
    marginTop: 10,
    backgroundColor: Colors.vibrantPinkLight,
    padding: 10,
    borderRadius: 12,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FCCCD9',
  },
  finalLabelBold: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.vibrantPink,
  },
  finalPriceBold: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.vibrantPink,
  },
  notesBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.softGray,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  notesInput: {
    flex: 1,
    fontSize: 12,
    color: Colors.darkText,
    minHeight: 40,
    textAlign: 'right',
    paddingLeft: 6,
  },
  confirmBtn: {
    marginHorizontal: Spacing.lg,
    marginTop: 18,
    backgroundColor: Colors.vibrantPink,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: BorderRadius.full,
    gap: 8,
    shadowColor: Colors.vibrantPink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
  confirmBtnDisabled: {
    opacity: 0.6,
  },
  confirmBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
