import React from 'react';
import { View, Text, StyleSheet, Image as RNImage, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function SignInScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <RNImage 
        source={require('../../assets/images/signin-bg.png')} 
        style={styles.topImage} 
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>Get your groceries{'\n'}with nectar</Text>
        
        <TouchableOpacity 
          style={styles.phoneInput} 
          onPress={() => router.push('/auth/number')}
        >
          {/* Dùng RNImage thay cho Image */}
          <RNImage source={require('../../assets/images/flag-bd.png')} style={styles.flag} />
          <Text style={styles.phoneText}>+880</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or connect with social media</Text>

        <TouchableOpacity 
          style={[styles.socialButton, { backgroundColor: '#5383EC' }]}
          onPress={() => router.push('/auth/number')}
        >
          <RNImage source={require('../../assets/images/google-icon.png')} style={styles.socialIcon} />
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.socialButton, { backgroundColor: '#4A66AC', marginTop: 20 }]}
          onPress={() => {}}
        >
          <RNImage source={require('../../assets/images/facebook-icon.png')} style={styles.socialIcon} />
          <Text style={styles.socialText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// ... Phần styles giữ nguyên như cũ ...
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topImage: { width: '100%', height: 300, resizeMode: 'cover' },
  content: { paddingHorizontal: 25, marginTop: -20 },
  title: { fontSize: 26, fontWeight: '600', color: '#181725', marginBottom: 25 },
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 10,
    marginBottom: 40
  },
  flag: { width: 30, height: 20, marginRight: 15 },
  phoneText: { fontSize: 18, color: '#181725' },
  orText: { textAlign: 'center', color: '#828282', marginVertical: 25, fontSize: 14 },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 67,
    borderRadius: 19,
    paddingHorizontal: 20,
  },
  socialIcon: { width: 22, height: 24, marginRight: 40, resizeMode: 'contain' },
  socialText: { color: '#FFF', fontSize: 18, fontWeight: '600' }
});