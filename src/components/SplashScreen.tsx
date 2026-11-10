import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Colors } from '../theme/colors';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;
  const badgeTranslate = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Sequence of smooth animations
    Animated.sequence([
      // 1. Logo fades in and zooms slightly to normal scale
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      // 2. Slogan and badge appear
      Animated.parallel([
        Animated.timing(textFadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(badgeTranslate, {
          toValue: 0,
          friction: 5,
          useNativeDriver: true,
        }),
      ]),
      // 3. Short pause for brand absorption
      Animated.delay(900),
      // 4. Fade out transition
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onFinish();
    });
  }, [fadeAnim, scaleAnim, textFadeAnim, badgeTranslate, onFinish]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.turquoise}
        translucent={false}
      />

      {/* Decorative Background Circles */}
      <View style={styles.decorCircleTop} />
      <View style={styles.decorCircleBottom} />

      {/* Main Animated Content */}
      <Animated.View
        style={[
          styles.contentWrap,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Brand Logo Card */}
        <View style={styles.logoCard}>
          <Image
            source={require('../../assets/logo.webp')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Brand Slogan */}
        <Animated.View
          style={[
            styles.textWrap,
            {
              opacity: textFadeAnim,
              transform: [{ translateY: badgeTranslate }],
            },
          ]}
        >
          <View style={styles.sloganPill}>
            <Text style={styles.sloganText}>حلويات شرقية وغربية .. طعم لا يُقاوم</Text>
          </View>

          <Text style={styles.welcomeSubtitle}>
            أشهى الحلويات والوجبات الطازجة إلى باب بيتك 🍰✨
          </Text>
        </Animated.View>
      </Animated.View>

      {/* Footer Branding */}
      <View style={styles.footerWrap}>
        <Text style={styles.footerBrand}>وزير الحلو © 2026</Text>
        <Text style={styles.footerTag}>Wazeer El Helw • Premium Taste</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.turquoise,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  decorCircleTop: {
    position: 'absolute',
    top: -width * 0.35,
    right: -width * 0.25,
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: (width * 0.9) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  decorCircleBottom: {
    position: 'absolute',
    bottom: -width * 0.4,
    left: -width * 0.3,
    width: width * 1.1,
    height: width * 1.1,
    borderRadius: (width * 1.1) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  contentWrap: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoCard: {
    backgroundColor: Colors.white,
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 24,
  },
  logoImage: {
    width: 170,
    height: 72,
  },
  textWrap: {
    alignItems: 'center',
  },
  sloganPill: {
    backgroundColor: Colors.vibrantPink,
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 20,
    shadowColor: Colors.vibrantPink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 10,
  },
  sloganText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },
  welcomeSubtitle: {
    color: '#E0F8FA',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  footerWrap: {
    position: 'absolute',
    bottom: 24,
    alignItems: 'center',
  },
  footerBrand: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
    opacity: 0.9,
    marginBottom: 2,
  },
  footerTag: {
    color: '#B6EFF4',
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});

