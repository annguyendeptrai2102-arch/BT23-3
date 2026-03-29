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

export default function SignupScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Kiểm tra điều kiện nhập liệu
  const isInputValid = username.length > 0 && email.includes('@') && password.length >= 6;

  const handleSignup = () => {
    if (isInputValid) {
      // BƯỚC CUỐI: Đăng ký xong vào thẳng trang chủ Shop
      router.replace('/(tabs)'); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Giúp bàn phím không che mất ô nhập liệu */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Nút Back quay lại trang Login */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={28} color="#181725" />
          </TouchableOpacity>

          {/* Logo Nectar */}
          <RNImage 
            source={require('../../assets/images/logo-nectar-color.png')} 
            style={styles.logo} 
          />

          <View style={styles.headerText}>
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.subtitle}>Enter your credentials to continue</Text>
          </View>

          {/* Username */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Nguyen Van A" 
              value={username}
              onChangeText={setUsername}
              autoCorrect={false}
            />
          </View>

          {/* Email */}
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

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput 
                style={[styles.input, { flex: 1, borderBottomWidth: 0 }]} 
                placeholder="********" 
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons 
                  name={showPassword ? "eye-outline" : "eye-off-outline"} 
                  size={22} 
                  color="#7C7C7C" 
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.terms}>
            By continuing you agree to our <Text style={styles.greenText}>Terms of Service</Text> and <Text style={styles.greenText}>Privacy Policy.</Text>
          </Text>

          {/* Nút Sign Up */}
          <TouchableOpacity 
            style={[styles.signupBtn, { opacity: isInputValid ? 1 : 0.6 }]} 
            onPress={handleSignup}
            disabled={!isInputValid}
          >
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.alreadyText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text style={styles.loginNow}>Login Now</Text>
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
  backBtn: { alignSelf: 'flex-start', marginTop: 10, marginBottom: 10 },
  logo: { width: 47, height: 55, marginTop: 20, marginBottom: 50, resizeMode: 'contain' },
  headerText: { width: '100%', marginBottom: 30 },
  title: { fontSize: 26, fontWeight: '600', color: '#181725', marginBottom: 15 },
  subtitle: { fontSize: 16, color: '#7C7C7C' },
  inputGroup: { width: '100%', marginBottom: 25, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  label: { fontSize: 16, color: '#7C7C7C', marginBottom: 5 },
  input: { fontSize: 18, paddingBottom: 10, color: '#181725', outlineStyle: 'none' } as any,
  passwordContainer: { flexDirection: 'row', alignItems: 'center' },
  terms: { fontSize: 14, color: '#7C7C7C', lineHeight: 22, marginBottom: 30, width: '100%' },
  greenText: { color: '#53B175' },
  signupBtn: { 
    backgroundColor: '#53B175', 
    width: '100%', 
    height: 67, 
    borderRadius: 19, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 10 
  },
  signupText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  footer: { flexDirection: 'row', marginTop: 25, marginBottom: 20 },
  alreadyText: { fontWeight: '600', color: '#181725' },
  loginNow: { color: '#53B175', fontWeight: 'bold' }
});