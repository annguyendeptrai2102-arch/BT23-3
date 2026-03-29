import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image as RNImage } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function NumberScreen() {
  const router = useRouter();
  // 1. Tạo State để lưu và kiểm tra số điện thoại
  const [phoneNumber, setPhoneNumber] = useState('');

  // 2. Hàm kiểm tra: Chỉ cho phép nhập số
  const handleTextChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, ''); // Loại bỏ tất cả ký tự không phải số
    setPhoneNumber(cleaned);
  };

  // 3. Điều kiện để nút "Tiếp tục" hoạt động (Ví dụ: phải đủ 9-10 số)
  const isValid = phoneNumber.length >= 9 && phoneNumber.length <= 11;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Ionicons name="chevron-back" size={28} color="#181725" />
      </TouchableOpacity>

      <Text style={styles.title}>Enter your mobile number</Text>
      
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.inputContainer}>
          <RNImage 
            source={require('../../assets/images/flag-bd.png')} 
            style={styles.flag} 
          />
          <Text style={styles.countryCode}>+880</Text>
          <TextInput 
            style={styles.input}
            keyboardType="phone-pad"
            autoFocus={true}
            placeholder="0123456789"
            value={phoneNumber} // Gán giá trị từ State
            onChangeText={handleTextChange} // Cập nhật State khi gõ
            maxLength={11} // Giới hạn tối đa 11 số
          />
        </View>
      </View>

      {/* Nút chỉ bấm được khi số điện thoại hợp lệ */}
      <TouchableOpacity 
        style={[styles.fab, { opacity: isValid ? 1 : 0.5 }]} 
        onPress={() => router.push('/auth/verification')}
        disabled={!isValid} // Khóa nút nếu chưa đúng định dạng
      >
        <Ionicons name="chevron-forward" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 25, paddingTop: 60 },
  backBtn: { marginBottom: 30 },
  title: { fontSize: 26, fontWeight: '600', marginBottom: 40 },
  inputWrapper: { marginBottom: 20 },
  label: { color: '#7C7C7C', fontSize: 16, marginBottom: 5 },
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: '#53B175', 
    paddingBottom: 10 
  },
  flag: { width: 30, height: 20, marginRight: 15 },
  countryCode: { fontSize: 18, color: '#181725', marginRight: 10 },
  input: { flex: 1, fontSize: 18, color: '#181725', outlineStyle: 'none' } as any, 
  fab: {
    position: 'absolute',
    right: 25,
    bottom: 50,
    width: 67,
    height: 67,
    borderRadius: 33.5,
    backgroundColor: '#53B175',
    justifyContent: 'center',
    alignItems: 'center',
  }
});