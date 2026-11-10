import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import {
  ShoppingCart,
  Bell,
  MapPin,
  ChevronDown,
  ChevronRight,
} from 'lucide-react-native';
import { Colors, BorderRadius, Spacing } from '../theme/colors';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showSearch?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBack,
}) => {
  const { cartCount, setCurrentTab, setLocationModalVisible, selectedAddress, setNotificationsOpen } = useApp();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.topRow}>
        {/* Left Side: Cart with Badge + Notification Bell */}
        <View style={styles.actionsGroup}>
          <TouchableOpacity
            style={styles.circleBtn}
            onPress={() => setCurrentTab('cart')}
            activeOpacity={0.8}
          >
            <ShoppingCart size={21} color={Colors.deepPurple} strokeWidth={2} />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.circleBtn}
            onPress={() => setNotificationsOpen(true)}
            activeOpacity={0.8}
          >
            <Bell size={21} color={Colors.deepPurple} strokeWidth={2} />
            <View style={styles.dotIndicator} />
          </TouchableOpacity>
        </View>

        {/* Center: Wazeer El Helw Brand Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.webp')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Right Side: Delivery Location Pill or Back Button */}
        {showBack ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.8}
          >
            <ChevronRight size={18} color={Colors.vibrantPink} strokeWidth={2.5} />
            <Text style={styles.backButtonText}>{title || 'الرجوع'}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.locationPill}
            onPress={() => setLocationModalVisible(true)}
            activeOpacity={0.85}
          >
            <ChevronDown size={13} color={Colors.deepPurple} strokeWidth={2.5} />
            <View style={styles.locationTextWrap}>
              <Text style={styles.locationSubLabel}>التوصيل إلى</Text>
              <Text style={styles.locationLabel} numberOfLines={1}>
                {selectedAddress.title}
              </Text>
            </View>
            <MapPin size={17} color={Colors.vibrantPink} fill={Colors.vibrantPink} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.turquoise,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 20) + 10 : 12,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  circleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.vibrantPink,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10.5,
    fontWeight: '800',
  },
  dotIndicator: {
    position: 'absolute',
    top: 7,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.vibrantPink,
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 108,
    height: 48,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    maxWidth: 160,
    gap: 6,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  locationTextWrap: {
    alignItems: 'flex-end',
  },
  locationSubLabel: {
    fontSize: 9.5,
    color: Colors.subText,
    fontWeight: '600',
    lineHeight: 12,
  },
  locationLabel: {
    fontSize: 11.5,
    fontWeight: '800',
    color: Colors.deepPurple,
    lineHeight: 15,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: BorderRadius.full,
    gap: 4,
    elevation: 3,
  },
  backButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.vibrantPink,
  },
});
