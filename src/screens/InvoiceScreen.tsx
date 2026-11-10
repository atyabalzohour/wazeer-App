import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  Share,
  Alert,
} from 'react-native';
import {
  ShoppingCart,
  Bell,
  ChevronRight,
  Receipt,
  CheckCircle2,
  Calendar,
  ShoppingBag,
  FileText,
  MapPin,
  User,
  Wallet,
  Box,
  QrCode,
  Printer,
  Share2,
  Download,
} from 'lucide-react-native';
import { Colors, BorderRadius, Spacing } from '../theme/colors';
import { useApp } from '../context/AppContext';

export const InvoiceScreen: React.FC = () => {
  const { selectedInvoice, closeInvoice, cartCount } = useApp();

  if (!selectedInvoice) return null;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `فاتورة طلب وزير الحلو #${selectedInvoice.orderNumber}\nالمبلغ الإجمالي: ${selectedInvoice.totalAmount} EGP\nشكرًا لطلبك من وزير الحلو!`,
      });
    } catch (e) {
      // ignore
    }
  };

  const handleDownloadPDF = () => {
    Alert.alert('تحميل الفاتورة', 'تم حفظ ملف الفاتورة بتنسيق PDF بنجاح.');
  };

  const handlePrint = () => {
    Alert.alert('طباعة الفاتورة', 'جاري إرسال الفاتورة إلى الطابعة...');
  };

  return (
    <Modal
      visible={!!selectedInvoice}
      animationType="slide"
      onRequestClose={closeInvoice}
    >
      <View style={styles.container}>
        {/* Custom Header matching wazeer-app2.png */}
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
            onPress={closeInvoice}
            activeOpacity={0.8}
          >
            <ChevronRight size={16} color={Colors.vibrantPink} strokeWidth={2.4} />
            <Text style={styles.backBtnText}>الطلبات السابقة</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Main Title Row */}
          <View style={styles.titleRow}>
            <Receipt size={22} color={Colors.vibrantPink} strokeWidth={2.2} />
            <Text style={styles.titleText}>تفاصيل الفاتورة</Text>
          </View>

          {/* Banner Card: Cake photo on LEFT, Text on RIGHT */}
          <View style={styles.thankYouCard}>
            <Image
              source={require('../../assets/hero-cake.jpg')}
              style={styles.cakePhoto}
            />
            <View style={styles.thankYouTextWrap}>
              <View style={styles.completedBadge}>
                <CheckCircle2 size={14} color={Colors.successGreen} strokeWidth={2.4} />
                <Text style={styles.completedBadgeText}>فاتورة مكتملة</Text>
              </View>
              <Text style={styles.thankYouHeading}>شكراً لطلبك من</Text>
              <View style={styles.wazeerTag}>
                <Text style={styles.wazeerTagText}>وزير الحلو</Text>
              </View>
            </View>
          </View>

          {/* Invoice Metadata 3-Columns: Left to Right: Date | Order# | Invoice# */}
          <View style={styles.metaCard}>
            {/* Left: Date */}
            <View style={styles.metaCol}>
              <View style={styles.metaIconRow}>
                <Calendar size={14} color={Colors.subText} strokeWidth={2.2} />
                <Text style={styles.metaColLabel}>تاريخ ووقت الطلب</Text>
              </View>
              <Text style={styles.metaColValSmall}>{selectedInvoice.dateStr}</Text>
            </View>

            <View style={styles.metaDivider} />

            {/* Middle: Order Number */}
            <View style={styles.metaCol}>
              <View style={styles.metaIconRow}>
                <ShoppingBag size={14} color={Colors.subText} strokeWidth={2.2} />
                <Text style={styles.metaColLabel}>رقم الطلب</Text>
              </View>
              <Text style={styles.metaColValPink}>{selectedInvoice.orderNumber}</Text>
            </View>

            <View style={styles.metaDivider} />

            {/* Right: Invoice Number */}
            <View style={styles.metaCol}>
              <View style={styles.metaIconRow}>
                <FileText size={14} color={Colors.subText} strokeWidth={2.2} />
                <Text style={styles.metaColLabel}>رقم الفاتورة</Text>
              </View>
              <Text style={styles.metaColValPink}>{selectedInvoice.invoiceNumber}</Text>
            </View>
          </View>

          {/* Customer & Address Details */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <View style={styles.infoIconBox}>
                  <MapPin size={16} color={Colors.vibrantPink} strokeWidth={2.2} />
                </View>
                <View style={styles.infoItemText}>
                  <Text style={styles.infoLabel}>عنوان التوصيل</Text>
                  <Text style={styles.infoVal} numberOfLines={2}>
                    {selectedInvoice.deliveryAddress}
                  </Text>
                </View>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.infoIconBox}>
                  <User size={16} color={Colors.deepPurple} strokeWidth={2.2} />
                </View>
                <View style={styles.infoItemText}>
                  <Text style={styles.infoLabel}>اسم العميل</Text>
                  <Text style={styles.infoVal}>{selectedInvoice.customerName}</Text>
                </View>
              </View>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <View style={styles.infoIconBox}>
                  <CheckCircle2
                    size={16}
                    color={Colors.successGreen}
                    strokeWidth={2.2}
                  />
                </View>
                <View style={styles.infoItemText}>
                  <Text style={styles.infoLabel}>حالة الدفع</Text>
                  <Text
                    style={[
                      styles.infoVal,
                      {
                        color:
                          selectedInvoice.paymentStatus === 'paid'
                            ? Colors.successGreen
                            : Colors.vibrantPink,
                      },
                    ]}
                  >
                    {selectedInvoice.paymentStatus === 'paid' ? 'تم الدفع ✓' : 'عند الاستلام'}
                  </Text>
                </View>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.infoIconBox}>
                  <Wallet size={16} color={Colors.deepPurple} strokeWidth={2.2} />
                </View>
                <View style={styles.infoItemText}>
                  <Text style={styles.infoLabel}>طريقة الدفع</Text>
                  <Text style={styles.infoVal}>{selectedInvoice.paymentMethodText}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Products Table Section */}
          <View style={styles.tableCard}>
            <View style={styles.tableHeaderSection}>
              <Box size={18} color={Colors.vibrantPink} strokeWidth={2.2} />
              <Text style={styles.tableHeading}>تفاصيل المنتجات</Text>
            </View>

            {/* Table Header Row */}
            <View style={styles.tableRowHeader}>
              <Text style={[styles.colHeader, { flex: 1.2, textAlign: 'left' }]}>
                الإجمالي
              </Text>
              <Text style={[styles.colHeader, { flex: 1.2, textAlign: 'center' }]}>
                سعر الوحدة
              </Text>
              <Text style={[styles.colHeader, { flex: 0.8, textAlign: 'center' }]}>
                الكمية
              </Text>
              <Text style={[styles.colHeader, { flex: 2, textAlign: 'right' }]}>
                المنتج
              </Text>
            </View>

            {/* Table Data Rows */}
            {selectedInvoice.items.map((it, idx) => (
              <View key={idx} style={styles.tableRowItem}>
                <Text style={[styles.colCellBold, { flex: 1.2, textAlign: 'left' }]}>
                  {it.totalPrice} EGP
                </Text>
                <Text style={[styles.colCell, { flex: 1.2, textAlign: 'center' }]}>
                  {it.unitPrice} EGP
                </Text>
                <Text style={[styles.colCell, { flex: 0.8, textAlign: 'center' }]}>
                  {it.quantity}
                </Text>
                <View style={[styles.tableColProduct, { flex: 2 }]}>
                  <View style={styles.itemTableDetails}>
                    <Text style={styles.itemTableName} numberOfLines={1}>
                      {it.productName}
                    </Text>
                    <Text style={styles.itemTableVariant}>{it.variant}</Text>
                  </View>
                  <Image source={it.image} style={styles.itemTableThumb} />
                </View>
              </View>
            ))}
          </View>

          {/* Financial Breakdown & QR Code Box */}
          <View style={styles.breakdownCard}>
            {/* Left: Financial Lines */}
            <View style={styles.mathColumn}>
              <View style={styles.mathLine}>
                <Text style={styles.mathVal}>{selectedInvoice.subtotal} EGP</Text>
                <Text style={styles.mathLabel}>إجمالي المنتجات</Text>
              </View>

              <View style={styles.mathLine}>
                <Text style={styles.mathVal}>{selectedInvoice.deliveryFee} EGP</Text>
                <Text style={styles.mathLabel}>رسوم التوصيل</Text>
              </View>

              <View style={styles.mathLine}>
                <Text style={styles.mathVal}>{selectedInvoice.vatAmount} EGP</Text>
                <Text style={styles.mathLabel}>الضريبة (14% VAT)</Text>
              </View>

              {selectedInvoice.discount > 0 && (
                <View style={styles.mathLine}>
                  <Text style={[styles.mathVal, { color: Colors.successGreen }]}>
                    -{selectedInvoice.discount} EGP
                  </Text>
                  <Text style={styles.mathLabel}>الخصم</Text>
                </View>
              )}

              <View style={styles.totalPinkPill}>
                <Text style={styles.totalPinkPrice}>
                  {selectedInvoice.totalAmount} EGP
                </Text>
                <Text style={styles.totalPinkLabel}>الإجمالي النهائي</Text>
              </View>
            </View>

            {/* Right: Authentic QR Code */}
            <View style={styles.qrColumn}>
              <View style={styles.qrBox}>
                <Image
                  source={require('../../assets/logo.webp')}
                  style={styles.qrCodeEmblem}
                  resizeMode="contain"
                />
                <QrCode size={78} color={Colors.deepPurple} strokeWidth={1.8} />
              </View>
              <Text style={styles.qrLabel}>رمز التحقق من الفاتورة</Text>
            </View>
          </View>

          {/* Action Buttons Row: Left is Print, Center is Share, Right is PDF */}
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity
              style={styles.actionBtnSecondary}
              onPress={handlePrint}
              activeOpacity={0.85}
            >
              <Printer size={18} color={Colors.deepPurple} strokeWidth={2.2} />
              <Text style={styles.actionBtnSecText}>طباعة</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtnSecondary}
              onPress={handleShare}
              activeOpacity={0.85}
            >
              <Share2 size={18} color={Colors.deepPurple} strokeWidth={2.2} />
              <Text style={styles.actionBtnSecText}>مشاركة</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtnPrimary}
              onPress={handleDownloadPDF}
              activeOpacity={0.85}
            >
              <Download size={18} color={Colors.white} strokeWidth={2.2} />
              <Text style={styles.actionBtnPrimText}>تحميل PDF</Text>
            </TouchableOpacity>
          </View>
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
  titleRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginTop: 14,
    marginBottom: 8,
    gap: 6,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.deepPurple,
  },
  thankYouCard: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    borderRadius: 20,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
  },
  cakePhoto: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  thankYouTextWrap: {
    flex: 1,
    alignItems: 'flex-end',
  },
  completedBadge: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: Colors.successGreenLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 4,
    marginBottom: 4,
  },
  completedBadgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: Colors.successGreen,
  },
  thankYouHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.deepPurple,
  },
  wazeerTag: {
    backgroundColor: Colors.vibrantPink,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 4,
  },
  wazeerTagText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '800',
  },
  metaCard: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    marginTop: 12,
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  metaCol: {
    flex: 1,
    alignItems: 'center',
  },
  metaIconRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  metaColLabel: {
    fontSize: 10,
    color: Colors.subText,
  },
  metaColValPink: {
    fontSize: 12.5,
    fontWeight: '800',
    color: Colors.vibrantPink,
  },
  metaColValSmall: {
    fontSize: 9.5,
    fontWeight: '600',
    color: Colors.deepPurple,
    textAlign: 'center',
  },
  metaDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.border,
  },
  infoCard: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    marginTop: 12,
    borderRadius: 16,
    padding: 14,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  infoItem: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
  },
  infoIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.softGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoItemText: {
    flex: 1,
    alignItems: 'flex-end',
  },
  infoLabel: {
    fontSize: 10,
    color: Colors.subText,
  },
  infoVal: {
    fontSize: 11.5,
    fontWeight: '700',
    color: Colors.deepPurple,
    textAlign: 'right',
  },
  infoDivider: {
    height: 1,
    backgroundColor: Colors.softGray,
    marginVertical: 10,
  },
  tableCard: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    marginTop: 12,
    borderRadius: 16,
    padding: 14,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  tableHeaderSection: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  tableHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.deepPurple,
  },
  tableRowHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.softGray,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  colHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.deepPurple,
  },
  tableRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5FA',
  },
  tableColProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  itemTableThumb: {
    width: 36,
    height: 36,
    borderRadius: 8,
  },
  itemTableDetails: {
    flex: 1,
    alignItems: 'flex-end',
  },
  itemTableName: {
    fontSize: 11.5,
    fontWeight: '700',
    color: Colors.deepPurple,
    textAlign: 'right',
  },
  itemTableVariant: {
    fontSize: 9.5,
    color: Colors.subText,
  },
  colCell: {
    fontSize: 11.5,
    color: Colors.deepPurple,
    fontWeight: '600',
  },
  colCellBold: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.vibrantPink,
  },
  breakdownCard: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    marginTop: 12,
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
  },
  mathColumn: {
    flex: 1.2,
  },
  mathLine: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  mathLabel: {
    fontSize: 11,
    color: Colors.subText,
  },
  mathVal: {
    fontSize: 11.5,
    fontWeight: '700',
    color: Colors.deepPurple,
  },
  totalPinkPill: {
    marginTop: 8,
    backgroundColor: Colors.vibrantPinkLight,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 10,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPinkLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.vibrantPink,
  },
  totalPinkPrice: {
    fontSize: 14,
    fontWeight: '900',
    color: Colors.vibrantPink,
  },
  qrColumn: {
    flex: 0.8,
    alignItems: 'center',
  },
  qrBox: {
    backgroundColor: Colors.softGray,
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  qrCodeEmblem: {
    position: 'absolute',
    width: 22,
    height: 22,
    zIndex: 2,
  },
  qrLabel: {
    fontSize: 8.5,
    fontWeight: '700',
    color: Colors.subText,
    marginTop: 4,
    textAlign: 'center',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginTop: 18,
    gap: 8,
  },
  actionBtnPrimary: {
    flex: 1.4,
    backgroundColor: Colors.vibrantPink,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: BorderRadius.full,
    gap: 6,
    shadowColor: Colors.vibrantPink,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  actionBtnPrimText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '800',
  },
  actionBtnSecondary: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: BorderRadius.full,
    gap: 6,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  actionBtnSecText: {
    color: Colors.deepPurple,
    fontSize: 13,
    fontWeight: '700',
  },
});
