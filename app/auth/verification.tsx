import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function VerificationScreen() {
  const router = useRouter();
  const [code, setCode] = useState('');

  return (
    <View style={styles.container}>
      {/* Nút quay lại */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Ionicons name="chevron-back" size={28} color="#181725" />
      </TouchableOpacity>

      <Text style={styles.title}>Enter your 4-digit code</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Code</Text>
        <TextInput 
          style={styles.input} 
          placeholder="- - - -" 
          keyboardType="number-pad"
          maxLength={4}
          autoFocus={true} // Tự động hiện bàn phím/con trỏ
          value={code}
          onChangeText={setCode}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => alert('Code resent!')}>
          <Text style={styles.resend}>Resend Code</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.fab, { opacity: code.length === 4 ? 1 : 0.5 }]} 
          onPress={() => router.push('/auth/location')}
          disabled={code.length !== 4} // Chỉ cho qua khi nhập đủ 4 số
        >
          <Ionicons name="chevron-forward" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 25, paddingTop: 60 },
  backBtn: { marginBottom: 40 },
  title: { fontSize: 26, fontWeight: '600', marginBottom: 40, color: '#181725' },
  inputGroup: { borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingBottom: 10 },
  label: { color: '#7C7C7C', fontSize: 16, marginBottom: 10 },
  input: { 
    fontSize: 24, 
    color: '#181725', 
    letterSpacing: 10, // Tạo khoảng cách giữa các con số cho đẹp
    fontWeight: '600'
  },
  footer: { 
    marginTop: 'auto', 
    marginBottom: 50, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  resend: { color: '#53B175', fontSize: 18, fontWeight: '500' },
  fab: { 
    width: 67, 
    height: 67, 
    borderRadius: 33.5, 
    backgroundColor: '#53B175', 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 3, // Tạo bóng đổ nhẹ trên Android
    shadowColor: '#000', // Bóng đổ trên iOS/Web
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  }
});