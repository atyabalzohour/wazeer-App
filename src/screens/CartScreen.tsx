import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {
  ChevronRight,
  ChevronLeft,
  ShoppingCart,
  X,
  Plus,
  Minus,
  Tag,
  Receipt,
  Info,
  CreditCard,
} from 'lucide-react-native';
import { Header } from '../components/Header';
import { Colors, BorderRadius, Spacing } from '../theme/colors';
import { useApp } from '../context/AppContext';

export const CartScreen: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartCount,
    subtotal,
    deliveryFee,
    discountAmount,
    couponCode,
    couponApplied,
    applyCoupon,
    finalTotal,
    setCheckoutOpen,
    setCurrentTab,
  } = useApp();

  const [inputCode, setInputCode] = useState('');
  const [couponMsg, setCouponMsg] = useState('');

  const handleApply = () => {
    if (!inputCode.trim()) return;
    const ok = applyCoupon(inputCode);
    if (ok) {
      setCouponMsg('تم تطبيق الخصم بنجاح! 🎉');
    } else {
      setCouponMsg('كود الخصم غير صالح');
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title Header */}
        <View style={styles.cartTitleRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => setCurrentTab('home')}
          >
            <ChevronRight size={18} color={Colors.deepPurple} strokeWidth={2.4} />
          </TouchableOpacity>
          <View style={styles.cartTitleBox}>
            <Text style={styles.cartTitle}>سلة مشترياتك</Text>
            <ShoppingCart size={20} color={Colors.vibrantPink} strokeWidth={2.4} />
          </View>
        </View>

        {/* Empty State */}
        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <ShoppingCart size={48} color={Colors.muted} strokeWidth={1.8} />
            </View>
            <Text style={styles.emptyTitle}>سلتك فارغة حالياً</Text>
            <Text style={styles.emptySub}>
              تصفح أشهى الحلويات والوجبات من وزير الحلو وأضفها لسلتك الآن!
            </Text>
            <TouchableOpacity
              style={styles.exploreBtn}
              onPress={() => setCurrentTab('categories')}
            >
              <Text style={styles.exploreBtnText}>تصفح القائمة</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Cart Items List */}
            <View style={styles.itemsList}>
              {cartItems.map((item) => (
                <View key={item.cartItemId} style={styles.itemCard}>
                  {/* Remove Button */}
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => removeFromCart(item.cartItemId)}
                    activeOpacity={0.7}
                  >
                    <X size={16} color={Colors.muted} strokeWidth={2.4} />
                  </TouchableOpacity>

                  {/* Quantity and Price */}
                  <View style={styles.leftColumn}>
                    <Text style={styles.itemPrice}>{item.totalPrice} EGP</Text>
                    <View style={styles.stepperWrap}>
                      <TouchableOpacity
                        style={styles.stepBtn}
                        onPress={() => updateQuantity(item.cartItemId, 1)}
                      >
                        <Plus size={14} color={Colors.vibrantPink} strokeWidth={2.5} />
                      </TouchableOpacity>
                      <Text style={styles.qtyText}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.stepBtn}
                        onPress={() => updateQuantity(item.cartItemId, -1)}
                      >
                        <Minus size={14} color={Colors.vibrantPink} strokeWidth={2.5} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Title & Variant Details */}
                  <View style={styles.detailsColumn}>
                    <Text style={styles.itemName} numberOfLines={1}>
                      {item.product.name}
                    </Text>
                    <Text style={styles.itemVariant}>
                      {item.selectedSize?.name || 'قطعة واحدة'}
                      {item.selectedFlavor ? ` • ${item.selectedFlavor.name}` : ''}
                    </Text>
                  </View>

                  {/* Product Image Thumbnail */}
                  <View style={styles.thumbWrap}>
                    <Image
                      source={item.product.image}
                      style={styles.itemThumb}
                      resizeMode="cover"
                    />
                  </View>
                </View>
              ))}
            </View>

            {/* Coupon Code Section */}
            <View style={styles.couponContainer}>
              <View style={styles.couponBox}>
                <TouchableOpacity
                  style={styles.applyBtn}
                  onPress={handleApply}
                  activeOpacity={0.85}
                >
                  <Text style={styles.applyBtnText}>تطبيق</Text>
                </TouchableOpacity>

                <TextInput
                  style={styles.couponInput}
                  placeholder="أدخل كود الخصم %"
                  placeholderTextColor={Colors.muted}
                  value={inputCode}
                  onChangeText={setInputCode}
                  textAlign="right"
                />

                <Tag
                  size={18}
                  color={Colors.vibrantPink}
                  strokeWidth={2.2}
                />
              </View>
              {couponApplied && (
                <Text style={styles.couponSuccessMsg}>
                  تم تطبيق كود الخصم (-30 EGP) ✓
                </Text>
              )}
            </View>

            {/* Order Summary Card */}
            <View style={styles.summaryCard}>
              <View style={styles.summaryTitleRow}>
                <Receipt size={18} color={Colors.vibrantPink} strokeWidth={2.2} />
                <Text style={styles.summaryTitle}>ملخص الطلب</Text>
              </View>

              <View style={styles.summaryLine}>
                <Text style={styles.lineVal}>{subtotal} EGP</Text>
                <Text style={styles.lineLabel}>
                  إجمالي المنتجات ({cartCount} قطع)
                </Text>
              </View>

              <View style={styles.summaryLine}>
                <Text style={styles.lineVal}>{deliveryFee} EGP</Text>
                <View style={styles.deliveryLabelWrap}>
                  <Info size={14} color={Colors.muted} strokeWidth={2.2} />
                  <Text style={styles.lineLabel}>رسوم التوصيل</Text>
                </View>
              </View>

              {couponApplied && (
                <View style={styles.summaryLine}>
                  <Text style={[styles.lineVal, { color: Colors.successGreen }]}>
                    -{discountAmount} EGP
                  </Text>
                  <Text style={styles.lineLabel}>خصم الكوبون</Text>
                </View>
              )}

              {/* Final Highlighted Total */}
              <View style={styles.finalTotalHighlight}>
                <Text style={styles.finalTotalVal}>{finalTotal} EGP</Text>
                <Text style={styles.finalTotalLabel}>الإجمالي النهائي</Text>
              </View>
            </View>

            {/* Checkout Action Button */}
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => setCheckoutOpen(true)}
              activeOpacity={0.88}
            >
              <ChevronLeft size={18} color={Colors.white} strokeWidth={2.5} />
              <Text style={styles.checkoutBtnText}>متابعة الدفع</Text>
              <CreditCard size={20} color={Colors.white} strokeWidth={2.2} />
            </TouchableOpacity>
          </>
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
    paddingBottom: 30,
  },
  cartTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginTop: 14,
    marginBottom: 8,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cartTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.deepPurple,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
    marginTop: 40,
  },
  emptyIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#EAEBF2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.deepPurple,
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 13,
    color: Colors.subText,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  exploreBtn: {
    backgroundColor: Colors.vibrantPink,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: BorderRadius.full,
  },
  exploreBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  itemsList: {
    paddingHorizontal: Spacing.lg,
    gap: 12,
    marginTop: 6,
  },
  itemCard: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 12,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  thumbWrap: {
    width: 65,
    height: 65,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: Colors.softGray,
  },
  itemThumb: {
    width: '100%',
    height: '100%',
  },
  detailsColumn: {
    flex: 1,
    paddingRight: 10,
    alignItems: 'flex-end',
  },
  itemName: {
    fontSize: 13.5,
    fontWeight: '800',
    color: Colors.deepPurple,
    marginBottom: 4,
    textAlign: 'right',
  },
  itemVariant: {
    fontSize: 11,
    color: Colors.subText,
  },
  leftColumn: {
    alignItems: 'flex-start',
    marginRight: 6,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.vibrantPink,
    marginBottom: 6,
  },
  stepperWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.softGray,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 4,
    paddingVertical: 2,
    gap: 6,
  },
  stepBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.deepPurple,
    minWidth: 16,
    textAlign: 'center',
  },
  removeBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  couponContainer: {
    paddingHorizontal: Spacing.lg,
    marginTop: 16,
  },
  couponBox: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.full,
    padding: 6,
    paddingRight: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  couponInput: {
    flex: 1,
    fontSize: 13,
    color: Colors.darkText,
    paddingRight: 8,
  },
  applyBtn: {
    backgroundColor: Colors.vibrantPink,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
  },
  applyBtnText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  couponSuccessMsg: {
    fontSize: 12,
    color: Colors.successGreen,
    fontWeight: '700',
    textAlign: 'right',
    marginTop: 6,
    paddingRight: 12,
  },
  summaryCard: {
    marginHorizontal: Spacing.lg,
    marginTop: 18,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },
  summaryTitleRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.softGray,
    paddingBottom: 8,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.deepPurple,
  },
  summaryLine: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  lineLabel: {
    fontSize: 13,
    color: Colors.subText,
  },
  deliveryLabelWrap: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
  },
  lineVal: {
    fontSize: 13.5,
    fontWeight: '700',
    color: Colors.deepPurple,
  },
  finalTotalHighlight: {
    marginTop: 12,
    backgroundColor: Colors.goldenYellowLight,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FBE89E',
  },
  finalTotalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.deepPurple,
  },
  finalTotalVal: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.vibrantPink,
  },
  checkoutBtn: {
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
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  checkoutBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
});

