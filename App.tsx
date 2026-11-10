import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, I18nManager } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider, useApp } from './src/context/AppContext';
import { Colors } from './src/theme/colors';
import { HomeScreen } from './src/screens/HomeScreen';
import { CategoriesScreen } from './src/screens/CategoriesScreen';
import { CartScreen } from './src/screens/CartScreen';
import { AccountScreen } from './src/screens/AccountScreen';
import { BottomTabBar } from './src/components/BottomTabBar';
import { LocationModal } from './src/components/LocationModal';
import { ProductDetailsModal } from './src/screens/ProductDetailsModal';
import { CheckoutScreen } from './src/screens/CheckoutScreen';
import { InvoiceScreen } from './src/screens/InvoiceScreen';
import { SplashScreen } from './src/components/SplashScreen';
import { NotificationsModal } from './src/components/AccountModals';

// Disable automatic layout flipping so UI stays pixel-perfect across all device locales
try {
  I18nManager.allowRTL(false);
  I18nManager.forceRTL(false);
} catch (e) {
  // ignore
}

const MainNavigator: React.FC = () => {
  const { currentTab, activeModalProduct, checkoutOpen, selectedInvoice } = useApp();

  const renderCurrentScreen = () => {
    switch (currentTab) {
      case 'home':
        return <HomeScreen />;
      case 'categories':
        return <CategoriesScreen />;
      case 'cart':
        return <CartScreen />;
      case 'orders':
      case 'account':
        return <AccountScreen />;
      default:
        return <HomeScreen />;
    }
  };

  // Hide bottom tab bar only during focused full-screen checkout or invoice
  const showBottomNav = !checkoutOpen && !selectedInvoice;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.turquoise}
        translucent={false}
      />
      <View style={styles.screenContainer}>
        {renderCurrentScreen()}
      </View>

      {/* Persistent Bottom Tabs on Standard Browsing */}
      {showBottomNav && <BottomTabBar />}

      {/* Global Overlays & Modals */}
      <LocationModal />
      <ProductDetailsModal />
      <CheckoutScreen />
      <InvoiceScreen />
      <NotificationsModal />
    </SafeAreaView>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <SafeAreaProvider>
      <AppProvider>
        <MainNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.turquoise,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.softGray,
  },
  loaderCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});
