import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {
  Search,
  ChevronLeft,
} from 'lucide-react-native';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { Colors, BorderRadius, Spacing } from '../theme/colors';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/mockData';
import { CategoryId } from '../types';

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const { setCurrentTab, setSelectedCategory, openProductDetails } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const bestSellers = [
    PRODUCTS.find((p) => p.id === 'prod-molten-cake') || PRODUCTS[1],
    PRODUCTS.find((p) => p.id === 'prod-kunafa-nabulsia') || PRODUCTS[2],
    PRODUCTS.find((p) => p.id === 'prod-frappe-choco') || PRODUCTS[4],
  ];

  const filteredProducts = searchTerm
    ? PRODUCTS.filter((p) => p.name.includes(searchTerm) || p.description.includes(searchTerm))
    : bestSellers;

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Improved Search Bar matching wazeer-app6.png */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <View style={styles.searchIconWrap}>
              <Search size={21} color={Colors.vibrantPink} strokeWidth={2.5} />
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="ابحث عن حلويات، وجبات، مشروبات ..."
              placeholderTextColor="#8E8E93"
              value={searchTerm}
              onChangeText={setSearchTerm}
              textAlign="right"
            />
          </View>
        </View>

        {/* Hero Promotional Banner matching wazeer-app6.png */}
        <View style={styles.heroBannerWrap}>
          <View style={styles.heroCard}>
            {/* Left: Cake image */}
            <View style={styles.heroImageWrap}>
              <Image
                source={require('../../assets/hero-cake.jpg')}
                style={styles.heroImage}
                resizeMode="cover"
              />
              <View style={styles.badgeNew}>
                <Text style={styles.badgeNewText}>جديد{'\n'}لدينا</Text>
              </View>
            </View>

            {/* Right: Promotional Text */}
            <View style={styles.heroTextContent}>
              <Text style={styles.heroTitleMain}>أجمل الحلويات</Text>
              <View style={styles.heroTitleSubRow}>
                <View style={styles.brandPill}>
                  <Text style={styles.brandPillText}>وزير الحلو</Text>
                </View>
                <Text style={styles.heroTitleSubText}>من</Text>
              </View>
              <Text style={styles.heroDescription}>
                حلويات شرقية وغربية ..{'\n'}طعم لا يُقاوم
              </Text>

              <TouchableOpacity
                style={styles.heroCta}
                onPress={() => {
                  setSelectedCategory('sweets');
                  setCurrentTab('categories');
                }}
                activeOpacity={0.85}
              >
                <ChevronLeft size={15} color={Colors.white} strokeWidth={2.5} />
                <Text style={styles.heroCtaText}>اطلب الآن</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Dots pagination */}
          <View style={styles.dotsRow}>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Category Horizontal Buttons (Right to Left: حلويات, آيس كريم, مشروبات, وجبات) */}
        <View style={styles.categoriesSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {[
              { id: 'sweets', name: 'حلويات', image: require('../../assets/cat-cake.jpg') },
              { id: 'icecream', name: 'آيس كريم', image: require('../../assets/cat-icecream.jpg') },
              { id: 'drinks', name: 'مشروبات', image: require('../../assets/cat-drinks.jpg') },
              { id: 'meals', name: 'وجبات', image: require('../../assets/cat-main.jpg') },
            ].map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={styles.categoryCard}
                onPress={() => {
                  setSelectedCategory(cat.id as CategoryId);
                  setCurrentTab('categories');
                }}
                activeOpacity={0.85}
              >
                <View style={styles.categoryThumbWrap}>
                  <Image source={cat.image} style={styles.categoryThumb} />
                </View>
                <Text style={styles.categoryNameText}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Special Offers Section */}
        <View style={styles.sectionHeaderRow}>
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory('all');
              setCurrentTab('categories');
            }}
          >
            <Text style={styles.seeAllText}>&lt; عرض الكل</Text>
          </TouchableOpacity>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionIcon}>%</Text>
            <Text style={styles.sectionTitle}>عروض مميزة</Text>
          </View>
        </View>

        {/* Offers Cards: Right is Brownie (99 EGP), Left is Ice Cream (30% off) */}
        <View style={styles.offersRow}>
          {/* Left: 30% Ice Cream */}
          <TouchableOpacity
            style={[styles.offerCard, { backgroundColor: '#FFF6D6' }]}
            onPress={() => {
              const item = PRODUCTS.find((p) => p.id === 'prod-icecream-mix') || PRODUCTS[3];
              openProductDetails(item);
            }}
            activeOpacity={0.9}
          >
            <Image
              source={require('../../assets/cat-icecream.jpg')}
              style={styles.offerImage}
            />
            <View style={styles.offerBadgeBox}>
              <Text style={styles.offerSubYellow}>خصم</Text>
              <Text style={styles.offerDiscountBig}>30%</Text>
              <Text style={styles.offerTitleSmall}>على الآيس كريم</Text>
            </View>
          </TouchableOpacity>

          {/* Right: Brownie Offer */}
          <TouchableOpacity
            style={[styles.offerCard, { backgroundColor: '#FBE8E8' }]}
            onPress={() => {
              const item = PRODUCTS.find((p) => p.id === 'prod-molten-cake') || PRODUCTS[0];
              openProductDetails(item);
            }}
            activeOpacity={0.9}
          >
            <Image
              source={require('../../assets/cat-cake.jpg')}
              style={styles.offerImage}
            />
            <View style={styles.offerBadgeBox}>
              <Text style={styles.offerSub}>عرض خاص</Text>
              <Text style={styles.offerTitle}>2 قطعة براونيز</Text>
              <View style={styles.offerPricePill}>
                <Text style={styles.offerPriceText}>99 EGP</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Best Sellers Section */}
        <View style={styles.sectionHeaderRow}>
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory('all');
              setCurrentTab('categories');
            }}
          >
            <Text style={styles.seeAllText}>&lt; عرض الكل</Text>
          </TouchableOpacity>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionIcon}>👑</Text>
            <Text style={styles.sectionTitle}>الأكثر مبيعاً</Text>
          </View>
        </View>

        {/* Best Sellers Grid */}
        <View style={styles.productsGrid}>
          {filteredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </View>
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
  searchContainer: {
    paddingHorizontal: 18,
    marginTop: 14,
    marginBottom: 2,
    zIndex: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 16,
    height: 48,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#ECECF2',
  },
  searchIconWrap: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 13.5,
    color: Colors.darkText,
    textAlign: 'right',
    paddingVertical: 0,
    height: '100%',
  },
  heroBannerWrap: {
    marginTop: 14,
    paddingHorizontal: 18,
  },
  heroCard: {
    backgroundColor: '#0EA2B1',
    borderRadius: 22,
    flexDirection: 'row',
    overflow: 'hidden',
    height: 168,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  heroImageWrap: {
    width: '45%',
    height: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  badgeNew: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: Colors.goldenYellow,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-12deg' }],
  },
  badgeNewText: {
    color: Colors.deepPurple,
    fontSize: 10,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 12,
  },
  heroTextContent: {
    width: '55%',
    height: '100%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  heroTitleMain: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.white,
    textAlign: 'right',
  },
  heroTitleSubRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
    marginVertical: 2,
  },
  heroTitleSubText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
  },
  brandPill: {
    backgroundColor: Colors.vibrantPink,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  brandPillText: {
    color: Colors.white,
    fontSize: 12.5,
    fontWeight: '800',
  },
  heroDescription: {
    fontSize: 11,
    color: '#D4F4F7',
    textAlign: 'right',
    marginTop: 2,
    marginBottom: 8,
    lineHeight: 15,
  },
  heroCta: {
    backgroundColor: Colors.vibrantPink,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  heroCtaText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.muted,
  },
  dotActive: {
    width: 14,
    backgroundColor: Colors.turquoise,
  },
  categoriesSection: {
    marginTop: 16,
  },
  categoriesScroll: {
    paddingHorizontal: 18,
    flexDirection: 'row-reverse',
    gap: 12,
  },
  categoryCard: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 8,
    width: 76,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryThumbWrap: {
    width: 54,
    height: 54,
    borderRadius: 27,
    overflow: 'hidden',
    backgroundColor: Colors.softGray,
    marginBottom: 6,
  },
  categoryThumb: {
    width: '100%',
    height: '100%',
  },
  categoryNameText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.deepPurple,
    textAlign: 'center',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.deepPurple,
  },
  sectionIcon: {
    fontSize: 16,
    color: Colors.vibrantPink,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.vibrantPink,
  },
  offersRow: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    gap: 12,
  },
  offerCard: {
    flex: 1,
    borderRadius: 18,
    overflow: 'hidden',
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  offerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  offerBadgeBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerSub: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.deepPurple,
  },
  offerTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.deepPurple,
    textAlign: 'center',
    marginVertical: 2,
  },
  offerPricePill: {
    backgroundColor: Colors.vibrantPink,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 3,
  },
  offerPriceText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '800',
  },
  offerSubYellow: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.deepPurple,
  },
  offerDiscountBig: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.vibrantPink,
    lineHeight: 24,
  },
  offerTitleSmall: {
    fontSize: 9.5,
    fontWeight: '700',
    color: Colors.deepPurple,
  },
  productsGrid: {
    paddingHorizontal: 18,
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
