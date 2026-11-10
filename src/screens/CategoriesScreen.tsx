import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Search, ArrowUpDown, ChevronLeft } from 'lucide-react-native';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { Colors, BorderRadius, Spacing } from '../theme/colors';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/mockData';
import { CategoryId } from '../types';

export const CategoriesScreen: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<'rating' | 'priceAsc' | 'priceDesc'>('rating');

  const categories = [
    { id: 'all', name: 'الكل', image: require('../../assets/pos-terminal.jpg') },
    { id: 'meals', name: 'وجبات', image: require('../../assets/cat-main.jpg') },
    { id: 'drinks', name: 'مشروبات', image: require('../../assets/cat-drinks.jpg') },
    { id: 'icecream', name: 'آيس كريم', image: require('../../assets/cat-icecream.jpg') },
    { id: 'sweets', name: 'حلويات', image: require('../../assets/cat-cake.jpg') },
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchCat = selectedCategory === 'all' || p.categoryId === selectedCategory;
    const matchSearch =
      !searchTerm ||
      p.name.includes(searchTerm) ||
      p.description.includes(searchTerm);
    return matchCat && matchSearch;
  }).sort((a, b) => {
    if (sortOption === 'priceAsc') return a.price - b.price;
    if (sortOption === 'priceDesc') return b.price - a.price;
    return b.rating - a.rating;
  });

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'sweets':
        return 'حلويات 🍰';
      case 'icecream':
        return 'آيس كريم 🍨';
      case 'drinks':
        return 'مشروبات 🥤';
      case 'meals':
        return 'وجبات 🍔';
      default:
        return 'كل الأصناف ✨';
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Banner Section */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerCard}>
            <View style={styles.bannerImageWrap}>
              <Image
                source={require('../../assets/cat-cake.jpg')}
                style={styles.bannerImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.bannerTextContent}>
              <Text style={styles.bannerTitle}>القائمة</Text>
              <Text style={styles.bannerSub}>
                اكتشف كل منتجات وزير الحلو اللذيذة
              </Text>
            </View>
          </View>
        </View>

        {/* Search Bar matching wazeer-app3.png */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Search size={20} color={Colors.vibrantPink} strokeWidth={2.4} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="ابحث عن حلويات، آيس كريم، مشروبات، وجبات ..."
              placeholderTextColor={Colors.muted}
              value={searchTerm}
              onChangeText={setSearchTerm}
              textAlign="right"
            />
          </View>
        </View>

        {/* Filter Toolbar */}
        <View style={styles.toolbarRow}>
          <View style={styles.sortButtons}>
            <TouchableOpacity
              style={styles.toolBtn}
              onPress={() => {
                setSortOption(
                  sortOption === 'rating'
                    ? 'priceAsc'
                    : sortOption === 'priceAsc'
                    ? 'priceDesc'
                    : 'rating'
                );
              }}
              activeOpacity={0.8}
            >
              <ArrowUpDown size={14} color={Colors.deepPurple} strokeWidth={2.4} />
              <Text style={styles.toolBtnText}>
                {sortOption === 'rating'
                  ? 'الأعلى تقييماً'
                  : sortOption === 'priceAsc'
                  ? 'الأقل سعراً'
                  : 'الأعلى سعراً'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.countText}>
            عرض {filteredProducts.length} منتج
          </Text>
        </View>

        {/* Horizontal Category Selector */}
        <View style={styles.categoryBarWrap}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryBarScroll}
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.catPill,
                    isActive && styles.catPillActive,
                  ]}
                  onPress={() => setSelectedCategory(cat.id as CategoryId)}
                  activeOpacity={0.85}
                >
                  <View style={styles.catImageCircle}>
                    <Image source={cat.image} style={styles.catImg} />
                  </View>
                  <Text
                    style={[
                      styles.catPillText,
                      isActive && styles.catPillTextActive,
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Category Header */}
        <View style={styles.sectionHeader}>
          <TouchableOpacity onPress={() => setSelectedCategory('all')}>
            <Text style={styles.showAllLink}>&lt; عرض الكل</Text>
          </TouchableOpacity>
          <Text style={styles.sectionHeading}>{getCategoryTitle()}</Text>
        </View>

        {/* Product Grid */}
        <View style={styles.grid}>
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
  bannerContainer: {
    paddingHorizontal: Spacing.lg,
    marginTop: 12,
  },
  bannerCard: {
    backgroundColor: '#0EA2B1',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    overflow: 'hidden',
  },
  bannerImageWrap: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerTextContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 12,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.white,
    marginBottom: 4,
  },
  bannerSub: {
    fontSize: 12,
    color: '#D7F5F8',
    textAlign: 'right',
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    marginTop: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 10,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: Colors.darkText,
    textAlign: 'right',
  },
  toolbarRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginTop: 14,
  },
  countText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.deepPurple,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  toolBtn: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    gap: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  toolBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.deepPurple,
  },
  categoryBarWrap: {
    marginTop: 12,
  },
  categoryBarScroll: {
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row-reverse',
    gap: 10,
  },
  catPill: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    minWidth: 70,
    borderWidth: 1.5,
    borderColor: '#ECECF0',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  catPillActive: {
    backgroundColor: Colors.vibrantPinkLight,
    borderColor: Colors.vibrantPink,
  },
  catImageCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    overflow: 'hidden',
    backgroundColor: Colors.softGray,
    marginBottom: 4,
  },
  catImg: {
    width: '100%',
    height: '100%',
  },
  catPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.deepPurple,
  },
  catPillTextActive: {
    color: Colors.vibrantPink,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginTop: 16,
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.deepPurple,
  },
  showAllLink: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.vibrantPink,
  },
  grid: {
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
