import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  Home,
  LayoutGrid,
  ShoppingCart,
  ShoppingBag,
  User,
} from 'lucide-react-native';
import { Colors, BorderRadius } from '../theme/colors';
import { useApp } from '../context/AppContext';
import { TabType } from '../types';

export const BottomTabBar: React.FC = () => {
  const { currentTab, setCurrentTab, cartCount } = useApp();

  // Left to Right order matching wazeer-app6.png:
  // [حسابي, طلباتي, السلة, الأقسام, الرئيسية]
  const tabs = [
    {
      key: 'account' as TabType,
      label: 'حسابي',
      Icon: User,
    },
    {
      key: 'orders' as TabType,
      label: 'طلباتي',
      Icon: ShoppingBag,
    },
    {
      key: 'cart' as TabType,
      label: 'السلة',
      Icon: ShoppingCart,
      badge: cartCount,
    },
    {
      key: 'categories' as TabType,
      label: 'الأقسام',
      Icon: LayoutGrid,
    },
    {
      key: 'home' as TabType,
      label: 'الرئيسية',
      Icon: Home,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = currentTab === tab.key;
          const { Icon } = tab;

          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabButton, isActive && styles.activeTabButton]}
              onPress={() => setCurrentTab(tab.key)}
              activeOpacity={0.8}
            >
              <View style={styles.iconWrap}>
                <Icon
                  size={22}
                  color={isActive ? Colors.vibrantPink : Colors.deepPurple}
                  strokeWidth={isActive ? 2.4 : 1.9}
                  fill={isActive ? Colors.vibrantPinkLight : 'none'}
                />
                {tab.badge && tab.badge > 0 ? (
                  <View style={styles.tabBadge}>
                    <Text style={styles.tabBadgeText}>{tab.badge}</Text>
                  </View>
                ) : null}
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  isActive ? styles.activeTabLabel : styles.inactiveTabLabel,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#ECECF2',
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
    paddingTop: 8,
    paddingHorizontal: 8,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 14,
  },
  tabBar: {
    flexDirection: 'row', // Left to Right: حسابي -> طلباتي -> السلة -> الأقسام -> الرئيسية
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 6,
    borderRadius: BorderRadius.xl,
    marginHorizontal: 3,
  },
  activeTabButton: {
    backgroundColor: Colors.vibrantPinkLight,
  },
  iconWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 26,
    width: 26,
  },
  tabBadge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: Colors.vibrantPink,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
  tabBadgeText: {
    color: Colors.white,
    fontSize: 9.5,
    fontWeight: '800',
  },
  tabLabel: {
    fontSize: 11.5,
    marginTop: 3,
    fontWeight: '600',
    textAlign: 'center',
  },
  activeTabLabel: {
    color: Colors.vibrantPink,
    fontWeight: '800',
  },
  inactiveTabLabel: {
    color: Colors.deepPurple,
  },
});
