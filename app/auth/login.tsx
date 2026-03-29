import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image as RNImage, 
  ScrollView, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // SỬA TẠI ĐÂY: Từ Login bấm nút xong phải sang Signup
    if (email && password) {
      router.replace('/auth/signup'); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={28} color="#181725" />
          </TouchableOpacity>

          <RNImage 
            source={require('../../assets/images/logo-nectar-color.png')} 
            style={styles.logo} 
          />

          <View style={styles.header}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>Enter your email and password</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput 
              style={styles.input}
              placeholder="example@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput 
                style={[styles.input, { flex: 1, borderBottomWidth: 0 }]}
                placeholder="********"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons 
                  name={showPassword ? "eye-outline" : "eye-off-outline"} 
                  size={24} 
                  color="#7C7C7C" 
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Nút Log In - Bây giờ bấm vào sẽ sang trang Đăng ký */}
          <TouchableOpacity 
            style={[styles.loginBtn, { opacity: email && password ? 1 : 0.6 }]} 
            onPress={handleLogin}
            disabled={!email || !password}
          >
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.noAccountText}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/signup')}>
              <Text style={styles.signupText}>Signup</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { paddingHorizontal: 25, alignItems: 'center', paddingBottom: 40 },
  backBtn: { alignSelf: 'flex-start', marginTop: 10 },
  logo: { width: 47, height: 55, marginBottom: 60, marginTop: 30, resizeMode: 'contain' },
  header: { width: '100%', marginBottom: 40 },
  title: { fontSize: 26, fontWeight: '600', color: '#181725', marginBottom: 15 },
  subtitle: { fontSize: 16, color: '#7C7C7C' },
  inputGroup: { width: '100%', marginBottom: 30, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  label: { fontSize: 16, color: '#7C7C7C', marginBottom: 10 },
  input: { fontSize: 18, color: '#181725', paddingBottom: 10, outlineStyle: 'none' } as any,
  passwordWrapper: { flexDirection: 'row', alignItems: 'center' },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 30 },
  forgotText: { color: '#181725', fontSize: 14, fontWeight: '500' },
  loginBtn: { 
    backgroundColor: '#53B175', 
    width: '100%', 
    height: 67, 
    borderRadius: 19, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 25 
  },
  loginText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  signupContainer: { flexDirection: 'row', marginBottom: 20 },
  noAccountText: { color: '#181725', fontWeight: '600' },
  signupText: { color: '#53B175', fontWeight: '600' }
});