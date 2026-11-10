import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Heart,
  Star,
  ShoppingCart,
  Check,
} from 'lucide-react-native';
import { Product } from '../types';
import { Colors, BorderRadius } from '../theme/colors';
import { useApp } from '../context/AppContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

interface ProductCardProps {
  product: Product;
  cardWidth?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  cardWidth = CARD_WIDTH,
}) => {
  const { openProductDetails, addToCart } = useApp();
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 900);
  };

  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      onPress={() => openProductDetails(product)}
      activeOpacity={0.9}
    >
      {/* Top Floating Icons: Rating & Favorite */}
      <View style={styles.topActionsRow}>
        <TouchableOpacity
          style={styles.favoriteBtn}
          onPress={() => setIsFavorite(!isFavorite)}
          activeOpacity={0.8}
        >
          <Heart
            size={16}
            color={isFavorite ? Colors.vibrantPink : Colors.deepPurple}
            fill={isFavorite ? Colors.vibrantPink : 'none'}
            strokeWidth={2}
          />
        </TouchableOpacity>

        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>{product.rating}</Text>
          <Star size={13} color={Colors.goldenYellow} fill={Colors.goldenYellow} strokeWidth={1} />
        </View>
      </View>

      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image
          source={product.image}
          style={styles.productImage}
          resizeMode="cover"
        />
        {product.badge ? (
          <View style={styles.badgePill}>
            <Text style={styles.badgeText}>{product.badge}</Text>
          </View>
        ) : null}
      </View>

      {/* Content Info */}
      <View style={styles.contentWrap}>
        <Text style={styles.productName} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {product.description}
        </Text>

        {/* Price Row */}
        <View style={styles.priceRow}>
          <Text style={styles.priceText}>{product.price} EGP</Text>
          {product.oldPrice ? (
            <Text style={styles.oldPriceText}>{product.oldPrice} EGP</Text>
          ) : null}
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity
          style={[styles.addBtn, addedAnim && styles.addBtnSuccess]}
          onPress={handleAddToCart}
          activeOpacity={0.85}
        >
          <Text style={styles.addBtnText}>
            {addedAnim ? 'تمت الإضافة ✓' : 'أضف إلى السلة'}
          </Text>
          {addedAnim ? (
            <Check size={15} color={Colors.white} strokeWidth={3} />
          ) : (
            <ShoppingCart size={15} color={Colors.white} strokeWidth={2} />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: 10,
    marginBottom: 14,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ECECF2',
  },
  topActionsRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    zIndex: 2,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.deepPurple,
  },
  favoriteBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F5F5FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 110,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 4,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  badgePill: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: Colors.goldenYellow,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: Colors.deepPurple,
  },
  contentWrap: {
    marginTop: 6,
    alignItems: 'center',
  },
  productName: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.deepPurple,
    textAlign: 'center',
    marginBottom: 3,
  },
  productDescription: {
    fontSize: 10.5,
    color: Colors.subText,
    textAlign: 'center',
    lineHeight: 15,
    height: 30,
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 8,
  },
  priceText: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.vibrantPink,
  },
  oldPriceText: {
    fontSize: 11.5,
    color: Colors.muted,
    textDecorationLine: 'line-through',
  },
  addBtn: {
    backgroundColor: Colors.vibrantPink,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.md,
    width: '100%',
    gap: 6,
  },
  addBtnSuccess: {
    backgroundColor: Colors.successGreen,
  },
  addBtnText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
});
