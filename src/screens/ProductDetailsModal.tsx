import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  Share,
} from 'react-native';
import {
  ChevronLeft,
  Share2,
  Heart,
  Star,
  Sparkles,
  Layers,
  Leaf,
  ShoppingCart,
} from 'lucide-react-native';
import { Colors, BorderRadius, Spacing } from '../theme/colors';
import { useApp } from '../context/AppContext';
import { FlavorOption, SizeOption } from '../types';

const { width } = Dimensions.get('window');

export const ProductDetailsModal: React.FC = () => {
  const { activeModalProduct, closeProductDetails, addToCart } = useApp();

  if (!activeModalProduct) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState<FlavorOption | undefined>(
    activeModalProduct.flavors?.[1] || activeModalProduct.flavors?.[0]
  );
  const [selectedSize, setSelectedSize] = useState<SizeOption | undefined>(
    activeModalProduct.sizes?.[0]
  );
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const unitPrice = activeModalProduct.price + (selectedSize ? selectedSize.priceOffset : 0);
  const totalPrice = unitPrice * quantity;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `اطلب الآن ${activeModalProduct.name} من تطبيق وزير الحلو! طعم لا يقاوم.`,
      });
    } catch (e) {
      // ignore
    }
  };

  const handleAddToCart = () => {
    addToCart(activeModalProduct, selectedFlavor, selectedSize, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      closeProductDetails();
    }, 700);
  };

  const getFlavorEmoji = (id: string) => {
    switch (id) {
      case 'classic':
      case 'dark':
        return '🍫';
      case 'hazelnut':
      case 'nut':
        return '🌰';
      case 'vanilla':
      case 'white':
        return '🌸';
      case 'caramel':
        return '🧈';
      case 'cheese':
        return '🧀';
      case 'cream':
        return '🥛';
      case 'lotus':
        return '🍪';
      case 'mango':
        return '🥭';
      case 'berries':
        return '🍓';
      default:
        return '🧁';
    }
  };

  return (
    <Modal
      visible={!!activeModalProduct}
      animationType="slide"
      onRequestClose={closeProductDetails}
    >
      <View style={styles.container}>
        {/* Top Floating Action Buttons Bar matching wazeer-app4.png */}
        <View style={styles.navBar}>
          {/* Left: Back button circle */}
          <TouchableOpacity
            style={styles.navCircleBtn}
            onPress={closeProductDetails}
            activeOpacity={0.8}
          >
            <ChevronLeft size={20} color={Colors.deepPurple} strokeWidth={2.4} />
          </TouchableOpacity>

          {/* Right: Share + Favorite buttons */}
          <View style={styles.navActionsRight}>
            <TouchableOpacity
              style={styles.navCircleBtn}
              onPress={handleShare}
              activeOpacity={0.8}
            >
              <Share2 size={18} color={Colors.deepPurple} strokeWidth={2.2} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navCircleBtn}
              onPress={() => setIsFavorite(!isFavorite)}
              activeOpacity={0.8}
            >
              <Heart
                size={19}
                color={isFavorite ? Colors.vibrantPink : Colors.deepPurple}
                fill={isFavorite ? Colors.vibrantPink : 'transparent'}
                strokeWidth={2.2}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Main Hero Image */}
          <View style={styles.imageWrap}>
            <Image
              source={activeModalProduct.image}
              style={styles.heroImage}
              resizeMode="cover"
            />
            {activeModalProduct.badge ? (
              <View style={styles.badgeStarburst}>
                <Text style={styles.badgeStarburstText}>
                  {activeModalProduct.badge}
                </Text>
              </View>
            ) : null}

            {/* Pagination dots */}
            <View style={styles.dotsRow}>
              <View style={styles.dot} />
              <View style={[styles.dot, styles.dotActive]} />
              <View style={styles.dot} />
            </View>
          </View>

          {/* Product Info Header matching wazeer-app4.png */}
          <View style={styles.infoContainer}>
            {/* Top row: Rating Pill on Left, Title on Right */}
            <View style={styles.titleAndRatingRow}>
              {/* Left: Rating Pill */}
              <View style={styles.ratingPill}>
                <Star size={14} color={Colors.goldenYellow} fill={Colors.goldenYellow} />
                <Text style={styles.ratingNum}>{activeModalProduct.rating}</Text>
                <Text style={styles.reviewsCount}>
                  ({activeModalProduct.reviewsCount.toLocaleString()} تقييم)
                </Text>
              </View>

              {/* Right: Product Title */}
              <Text style={styles.productTitle}>{activeModalProduct.name}</Text>
            </View>

            {/* Price Row: Under title on the right */}
            <View style={styles.priceRow}>
              <Text style={styles.productPrice}>{unitPrice} EGP</Text>
            </View>

            {/* Description */}
            <Text style={styles.productDescription}>
              {activeModalProduct.longDescription || activeModalProduct.description}
            </Text>

            <View style={styles.divider} />

            {/* Flavor Selection matching wazeer-app4.png */}
            {activeModalProduct.flavors && activeModalProduct.flavors.length > 0 && (
              <View style={styles.sectionBlock}>
                <View style={styles.sectionHeaderRow}>
                  <Sparkles size={18} color={Colors.vibrantPink} strokeWidth={2.2} />
                  <Text style={styles.sectionTitle}>اختر النكهة</Text>
                </View>

                {/* Right to Left order: كلاسيك, بندق, فانيليا, كراميل */}
                <View style={styles.optionsRow}>
                  {activeModalProduct.flavors.map((flavor) => {
                    const isSelected = selectedFlavor?.id === flavor.id;
                    return (
                      <TouchableOpacity
                        key={flavor.id}
                        style={[
                          styles.flavorCard,
                          isSelected && styles.flavorCardSelected,
                        ]}
                        onPress={() => setSelectedFlavor(flavor)}
                        activeOpacity={0.85}
                      >
                        {isSelected && (
                          <View style={styles.selectedCheckBadge}>
                            <Text style={styles.checkText}>✓</Text>
                          </View>
                        )}
                        <Text style={styles.flavorEmoji}>
                          {getFlavorEmoji(flavor.id)}
                        </Text>
                        <Text
                          style={[
                            styles.flavorLabel,
                            isSelected && styles.flavorLabelSelected,
                          ]}
                        >
                          {flavor.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {/* Size Selection matching wazeer-app4.png */}
            {activeModalProduct.sizes && activeModalProduct.sizes.length > 0 && (
              <View style={styles.sectionBlock}>
                <View style={styles.sectionHeaderRow}>
                  <Layers size={18} color={Colors.vibrantPink} strokeWidth={2.2} />
                  <Text style={styles.sectionTitle}>اختر الحجم</Text>
                </View>

                {/* Right to Left order: صغير, وسط, كبير */}
                <View style={styles.sizesRow}>
                  {activeModalProduct.sizes.map((size) => {
                    const isSelected = selectedSize?.id === size.id;
                    return (
                      <TouchableOpacity
                        key={size.id}
                        style={[
                          styles.sizeCard,
                          isSelected && styles.sizeCardSelected,
                        ]}
                        onPress={() => setSelectedSize(size)}
                        activeOpacity={0.85}
                      >
                        {isSelected && (
                          <View style={styles.selectedCheckBadge}>
                            <Text style={styles.checkText}>✓</Text>
                          </View>
                        )}
                        <Text style={styles.sizeEmoji}>🧁</Text>
                        <Text
                          style={[
                            styles.sizeName,
                            isSelected && styles.sizeNameSelected,
                          ]}
                        >
                          {size.name}
                        </Text>
                        <Text style={styles.sizeServing}>({size.servingCount})</Text>
                        {size.priceOffset > 0 && (
                          <Text style={styles.sizeExtra}>+{size.priceOffset} EGP</Text>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {/* Ingredients Highlights matching wazeer-app4.png */}
            {activeModalProduct.ingredients && (
              <View style={styles.sectionBlock}>
                <View style={styles.sectionHeaderRow}>
                  <Leaf size={18} color={Colors.vibrantPink} strokeWidth={2.2} />
                  <Text style={styles.sectionTitle}>مكونات مميزة</Text>
                </View>

                <View style={styles.ingredientsRow}>
                  {activeModalProduct.ingredients.map((ing) => (
                    <View key={ing.id} style={styles.ingredientCard}>
                      <Text style={styles.ingIcon}>🍫</Text>
                      <Text style={styles.ingName}>{ing.name}</Text>
                      <Text style={styles.ingSub}>{ing.subtext}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Bottom CTA Bar matching wazeer-app4.png */}
        <View style={styles.bottomBar}>
          {/* Left: Stepper [- 1 +] */}
          <View style={styles.stepperContainer}>
            <TouchableOpacity
              style={styles.stepBtn}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={styles.stepBtnSign}>+</Text>
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantity}</Text>

            <TouchableOpacity
              style={styles.stepBtn}
              onPress={() => quantity > 1 && setQuantity(quantity - 1)}
            >
              <Text style={styles.stepBtnSign}>-</Text>
            </TouchableOpacity>
          </View>

          {/* Right: Add to Cart CTA */}
          <TouchableOpacity
            style={[styles.addCartBtn, addedSuccess && styles.addCartSuccess]}
            onPress={handleAddToCart}
            activeOpacity={0.85}
          >
            <ShoppingCart size={19} color={Colors.white} strokeWidth={2.4} />
            <Text style={styles.addCartBtnText}>
              {addedSuccess ? 'تمت الإضافة بنجاح ✓' : 'أضف إلى السلة'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  navBar: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 44 : 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    zIndex: 20,
  },
  navCircleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#ECECF2',
  },
  navActionsRight: {
    flexDirection: 'row',
    gap: 10,
  },
  scrollContent: {
    paddingBottom: 130, // Plenty of room above bottom bar
  },
  imageWrap: {
    width: width,
    height: 300,
    position: 'relative',
    backgroundColor: Colors.softGray,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  badgeStarburst: {
    position: 'absolute',
    top: 60,
    right: 18,
    backgroundColor: Colors.goldenYellow,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeStarburstText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: Colors.deepPurple,
  },
  dotsRow: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  dotActive: {
    width: 14,
    backgroundColor: Colors.vibrantPink,
  },
  infoContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: 16,
  },
  titleAndRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7FA',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: '#ECECF2',
    gap: 4,
  },
  ratingNum: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.deepPurple,
  },
  reviewsCount: {
    fontSize: 11,
    color: Colors.subText,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.deepPurple,
    textAlign: 'right',
  },
  priceRow: {
    alignItems: 'flex-end',
    marginTop: 4,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.vibrantPink,
  },
  productDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.subText,
    textAlign: 'right',
    marginVertical: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F5',
    marginVertical: 14,
  },
  sectionBlock: {
    marginBottom: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.deepPurple,
  },
  optionsRow: {
    flexDirection: 'row-reverse',
    gap: 8,
    flexWrap: 'wrap',
  },
  flavorCard: {
    flex: 1,
    minWidth: 72,
    padding: 10,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#ECECF0',
    alignItems: 'center',
    backgroundColor: Colors.white,
    position: 'relative',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  flavorCardSelected: {
    borderColor: Colors.vibrantPink,
    backgroundColor: Colors.vibrantPinkLight,
  },
  selectedCheckBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.vibrantPink,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
  checkText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '900',
    lineHeight: 12,
  },
  flavorEmoji: {
    fontSize: 22,
    marginBottom: 4,
  },
  flavorLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.deepPurple,
  },
  flavorLabelSelected: {
    color: Colors.vibrantPink,
  },
  sizesRow: {
    flexDirection: 'row-reverse',
    gap: 10,
  },
  sizeCard: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#ECECF0',
    alignItems: 'center',
    backgroundColor: Colors.white,
    position: 'relative',
  },
  sizeCardSelected: {
    borderColor: Colors.vibrantPink,
    backgroundColor: Colors.vibrantPinkLight,
  },
  sizeEmoji: {
    fontSize: 20,
    marginBottom: 2,
  },
  sizeName: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.deepPurple,
    marginBottom: 2,
  },
  sizeNameSelected: {
    color: Colors.vibrantPink,
  },
  sizeServing: {
    fontSize: 10,
    color: Colors.subText,
    textAlign: 'center',
  },
  sizeExtra: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.vibrantPink,
    marginTop: 4,
  },
  ingredientsRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    gap: 8,
  },
  ingredientCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FAFBFD',
    borderRadius: 14,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ECECF2',
  },
  ingIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  ingName: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.deepPurple,
    textAlign: 'center',
    marginBottom: 2,
  },
  ingSub: {
    fontSize: 9,
    color: Colors.muted,
    textAlign: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'android' ? 24 : 32,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#ECECF2',
    gap: 12,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 12,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5FA',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 5,
    gap: 12,
    borderWidth: 1,
    borderColor: '#ECECF2',
  },
  stepBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  stepBtnSign: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.vibrantPink,
    lineHeight: 20,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.deepPurple,
    minWidth: 20,
    textAlign: 'center',
  },
  addCartBtn: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.vibrantPink,
    paddingVertical: 14,
    borderRadius: BorderRadius.full,
    gap: 8,
    shadowColor: Colors.vibrantPink,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  addCartSuccess: {
    backgroundColor: Colors.successGreen,
  },
  addCartBtnText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
});
