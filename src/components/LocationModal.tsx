import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {
  X,
  Home,
  Building2,
  MapPin,
  Plus,
  Check,
} from 'lucide-react-native';
import { Colors, BorderRadius, Spacing } from '../theme/colors';
import { useApp } from '../context/AppContext';
import { Address } from '../types';

export const LocationModal: React.FC = () => {
  const {
    locationModalVisible,
    setLocationModalVisible,
    addresses,
    selectedAddress,
    setSelectedAddress,
    addAddress,
  } = useApp();

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [addrType, setAddrType] = useState<'home' | 'work' | 'other'>('home');
  const [title, setTitle] = useState('');
  const [street, setStreet] = useState('');
  const [details, setDetails] = useState('');

  const handleSaveNewAddress = () => {
    if (!title.trim() || !street.trim()) {
      Alert.alert('تنبيه', 'يرجى إدخال اسم المنطقة والشارع.');
      return;
    }

    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      title: title.trim(),
      street: street.trim(),
      details: details.trim() || 'شارع رئيسي',
      type: addrType,
      isDefault: true,
    };

    addAddress(newAddr);
    setIsAddingNew(false);
    setTitle('');
    setStreet('');
    setDetails('');
    setLocationModalVisible(false);
  };

  const handleClose = () => {
    setIsAddingNew(false);
    setLocationModalVisible(false);
  };

  return (
    <Modal
      visible={locationModalVisible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
              {/* Header */}
              <View style={styles.headerRow}>
                <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
                  <X size={18} color={Colors.deepPurple} strokeWidth={2.5} />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>
                  {isAddingNew ? 'إضافة عنوان جديد 📍' : 'اختر عنوان التوصيل'}
                </Text>
              </View>

              {!isAddingNew ? (
                <>
                  <Text style={styles.subTitle}>
                    حدد العنوان المناسب لتوصيل أسرع وأطباق طازجة من أقرب فرع
                  </Text>

                  {/* Address List */}
                  <ScrollView style={{ maxHeight: 280 }} showsVerticalScrollIndicator={false}>
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
                            handleClose();
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
                  </ScrollView>

                  {/* Add New Address Button */}
                  <TouchableOpacity
                    style={styles.addNewBtn}
                    onPress={() => setIsAddingNew(true)}
                    activeOpacity={0.85}
                  >
                    <Plus size={18} color={Colors.turquoise} strokeWidth={2.5} />
                    <Text style={styles.addNewText}>إضافة عنوان جديد للتوصيل</Text>
                  </TouchableOpacity>
                </>
              ) : (
                /* Add New Address Form */
                <View style={styles.formContainer}>
                  {/* Address Type Selector */}
                  <View style={styles.typeSelectorRow}>
                    <TouchableOpacity
                      style={[styles.typeBtn, addrType === 'other' && styles.typeBtnActive]}
                      onPress={() => setAddrType('other')}
                    >
                      <MapPin size={16} color={addrType === 'other' ? Colors.white : Colors.deepPurple} />
                      <Text style={[styles.typeBtnText, addrType === 'other' && styles.typeBtnTextActive]}>أخرى</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.typeBtn, addrType === 'work' && styles.typeBtnActive]}
                      onPress={() => setAddrType('work')}
                    >
                      <Building2 size={16} color={addrType === 'work' ? Colors.white : Colors.deepPurple} />
                      <Text style={[styles.typeBtnText, addrType === 'work' && styles.typeBtnTextActive]}>العمل</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.typeBtn, addrType === 'home' && styles.typeBtnActive]}
                      onPress={() => setAddrType('home')}
                    >
                      <Home size={16} color={addrType === 'home' ? Colors.white : Colors.deepPurple} />
                      <Text style={[styles.typeBtnText, addrType === 'home' && styles.typeBtnTextActive]}>المنزل</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Location Area Field */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>المنطقة / الحي (مثال: المعادي، التجمع، الشيخ زايد)</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="اسم المنطقة"
                      placeholderTextColor={Colors.muted}
                      value={title}
                      onChangeText={setTitle}
                      textAlign="right"
                    />
                  </View>

                  {/* Street Field */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>اسم الشارع</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="الشارع ورقم العمارة"
                      placeholderTextColor={Colors.muted}
                      value={street}
                      onChangeText={setStreet}
                      textAlign="right"
                    />
                  </View>

                  {/* Details Field */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>تفاصيل إضافية (الدور، الشقة، علامة مميزة)</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="شقة رقم .. بجوار .."
                      placeholderTextColor={Colors.muted}
                      value={details}
                      onChangeText={setDetails}
                      textAlign="right"
                    />
                  </View>

                  {/* Action Buttons */}
                  <View style={styles.formActionRow}>
                    <TouchableOpacity
                      style={styles.cancelBtn}
                      onPress={() => setIsAddingNew(false)}
                    >
                      <Text style={styles.cancelBtnText}>رجوع</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.saveBtn}
                      onPress={handleSaveNewAddress}
                    >
                      <Check size={16} color={Colors.white} />
                      <Text style={styles.saveBtnText}>حفظ العنوان</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: Spacing.xl,
    paddingBottom: 32,
    maxHeight: '90%',
  },
  headerRow: {
    flexDirection: 'row',
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
    fontSize: 12.5,
    color: Colors.subText,
    textAlign: 'right',
    marginBottom: 16,
    lineHeight: 18,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: '#ECECF2',
  },
  addressCardSelected: {
    borderColor: Colors.turquoise,
    backgroundColor: '#F0FAFB',
  },
  radioWrap: {
    marginRight: 12,
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
    borderColor: Colors.turquoise,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.turquoise,
  },
  addrTextWrap: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 12,
  },
  addrTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.deepPurple,
    marginBottom: 2,
  },
  addrDetails: {
    fontSize: 12,
    color: Colors.subText,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F2F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBoxActive: {
    backgroundColor: '#FDEDF2',
  },
  addNewBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDF9FA',
    borderRadius: BorderRadius.lg,
    paddingVertical: 13,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.turquoise,
    marginTop: 8,
    gap: 8,
  },
  addNewText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: Colors.turquoise,
  },
  formContainer: {
    marginTop: 8,
  },
  typeSelectorRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  typeBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: '#F5F6FA',
    borderWidth: 1,
    borderColor: '#E8E9F2',
    gap: 6,
  },
  typeBtnActive: {
    backgroundColor: Colors.deepPurple,
    borderColor: Colors.deepPurple,
  },
  typeBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.deepPurple,
  },
  typeBtnTextActive: {
    color: Colors.white,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.deepPurple,
    textAlign: 'right',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F7F8FC',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#ECECF2',
    color: Colors.darkText,
  },
  formActionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#F0F1F6',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.deepPurple,
  },
  saveBtn: {
    flex: 2,
    backgroundColor: Colors.vibrantPink,
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  saveBtnText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: Colors.white,
  },
});
