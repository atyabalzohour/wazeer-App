import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  X,
  Home,
  Building2,
  Map,
} from 'lucide-react-native';
import { Colors, BorderRadius, Spacing } from '../theme/colors';
import { useApp } from '../context/AppContext';

export const LocationModal: React.FC = () => {
  const {
    locationModalVisible,
    setLocationModalVisible,
    addresses,
    selectedAddress,
    setSelectedAddress,
  } = useApp();

  return (
    <Modal
      visible={locationModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setLocationModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setLocationModalVisible(false)}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              {/* Header */}
              <View style={styles.headerRow}>
                <TouchableOpacity
                  onPress={() => setLocationModalVisible(false)}
                  style={styles.closeBtn}
                >
                  <X size={18} color={Colors.deepPurple} strokeWidth={2.5} />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>اختر عنوان التوصيل</Text>
              </View>

              <Text style={styles.subTitle}>
                حدد العنوان المناسب لتوصيل أسرع وأطباق طازجة من أقرب فرع
              </Text>

              {/* Address List */}
              <View style={styles.addressList}>
                {addresses.map((addr) => {
                  const isSelected = selectedAddress.id === addr.id;
                  const Icon = addr.type === 'home' ? Home : Building2;

                  return (
                    <TouchableOpacity
                      key={addr.id}
                      style={[
                        styles.addressCard,
                        isSelected && styles.addressCardSelected,
                      ]}
                      onPress={() => {
                        setSelectedAddress(addr);
                        setLocationModalVisible(false);
                      }}
                      activeOpacity={0.8}
                    >
                      <View style={styles.radioWrap}>
                        <View
                          style={[
                            styles.radioCircle,
                            isSelected && styles.radioCircleActive,
                          ]}
                        >
                          {isSelected && <View style={styles.radioInner} />}
                        </View>
                      </View>

                      <View style={styles.addrTextWrap}>
                        <Text style={styles.addrTitle}>{addr.title}</Text>
                        <Text style={styles.addrDetails}>
                          {addr.street}، {addr.details}
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.iconBox,
                          isSelected && styles.iconBoxActive,
                        ]}
                      >
                        <Icon
                          size={18}
                          color={isSelected ? Colors.vibrantPink : Colors.deepPurple}
                          strokeWidth={2}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Add New Address Button */}
              <TouchableOpacity
                style={styles.addNewBtn}
                onPress={() => {
                  setLocationModalVisible(false);
                }}
                activeOpacity={0.85}
              >
                <Text style={styles.addNewText}>تحديد موقع جديد على الخريطة</Text>
                <Map size={18} color={Colors.turquoise} strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: Spacing.xl,
    paddingBottom: 34,
  },
  headerRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.deepPurple,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.softGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 13,
    color: Colors.subText,
    textAlign: 'right',
    marginBottom: 20,
    lineHeight: 18,
  },
  addressList: {
    gap: 12,
    marginBottom: 20,
  },
  addressCard: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 14,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  addressCardSelected: {
    borderColor: Colors.vibrantPink,
    backgroundColor: Colors.vibrantPinkLight,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.softGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  iconBoxActive: {
    backgroundColor: Colors.white,
  },
  addrTextWrap: {
    flex: 1,
    alignItems: 'flex-end',
  },
  addrTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.deepPurple,
    marginBottom: 2,
  },
  addrDetails: {
    fontSize: 12,
    color: Colors.subText,
  },
  radioWrap: {
    marginRight: 10,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.muted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleActive: {
    borderColor: Colors.vibrantPink,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.vibrantPink,
  },
  addNewBtn: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Colors.turquoise,
    gap: 8,
  },
  addNewText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.turquoise,
  },
});
