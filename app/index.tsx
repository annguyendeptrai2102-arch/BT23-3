import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, StatusBar, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
// Đảm bảo đường dẫn này đúng với file Button của bạn
import { Button } from '../components/ui/Button'; 

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground 
        source={require('../assets/images/onboarding-bg.png')} 
        style={styles.background}
      >
        <View style={styles.overlay}>
          {/* Logo củ cà rốt trắng */}
          <Image 
            source={require('../assets/images/logo-nectar.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          
          <View style={styles.textContainer}>
            <Text style={styles.title}>Welcome{'\n'}to our store</Text>
            <Text style={styles.subtitle}>Get your groceries in as fast as one hour</Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <Button 
              title="Get Started" 
              // ĐÃ SỬA: Bỏ dấu ngoặc đơn ở sign-in
              onPress={() => router.push('/auth/sign-in')} 
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000' 
  },
  background: { 
    flex: 1, 
    justifyContent: 'flex-end',
    alignSelf: 'center',
    // Giữ giao diện gọn ở giữa khi xem trên Web
    width: width > 500 ? 400 : '100%', 
  },
  overlay: {
    paddingHorizontal: 30,
    paddingBottom: 90,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)', 
  },
  logo: { 
    width: 48, 
    height: 56, 
    marginBottom: 35 
  },
  textContainer: { 
    marginBottom: 40 
  },
  title: {
    color: '#FFF',
    fontSize: 48,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 55,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: { 
    width: '100%' 
  }
});