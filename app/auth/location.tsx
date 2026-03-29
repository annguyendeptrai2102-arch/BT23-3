import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image as RNImage, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

export default function LocationScreen() {
  const router = useRouter();
  
  const [zone, setZone] = useState('');
  const [area, setArea] = useState('');

  const isValid = zone !== '' && area !== '';

  const handleNext = () => {
    if (isValid) {
      // BƯỚC 1: Từ Location chuyển sang Login
      router.replace('/auth/login'); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color="#181725" />
        </TouchableOpacity>

        <RNImage 
          source={require('../../assets/images/location-illustration.png')} 
          style={styles.illustration} 
        />

        <View style={styles.textHeader}>
          <Text style={styles.title}>Select Your Location</Text>
          <Text style={styles.subtitle}>
            Switch on your location to stay in tune with what’s happening in your area
          </Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Your Zone</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={zone}
              onValueChange={(item) => {
                setZone(item);
                setArea(''); 
              }}
              style={styles.picker}
            >
              <Picker.Item label="Select your zone" value="" color="#7C7C7C" />
              <Picker.Item label="Banani" value="banani" />
              <Picker.Item label="Dhaka" value="dhaka" />
              <Picker.Item label="Hanoi" value="hanoi" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Your Area</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={area}
              onValueChange={(item) => setArea(item)}
              style={styles.picker}
              enabled={zone !== ''}
            >
              <Picker.Item label="Select your area" value="" color="#7C7C7C" />
              <Picker.Item label="Block A" value="block-a" />
              <Picker.Item label="Block B" value="block-b" />
              <Picker.Item label="District 1" value="dist-1" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.submitBtn, { opacity: isValid ? 1 : 0.5 }]} 
          onPress={handleNext}
          disabled={!isValid}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { paddingHorizontal: 25, alignItems: 'center', paddingBottom: 40 },
  backBtn: { alignSelf: 'flex-start', marginTop: 20, marginBottom: 20 },
  illustration: { width: 225, height: 170, resizeMode: 'contain', marginVertical: 30 },
  textHeader: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 26, fontWeight: '600', color: '#181725', textAlign: 'center', marginBottom: 15 },
  subtitle: { fontSize: 16, color: '#7C7C7C', textAlign: 'center', lineHeight: 22 },
  inputGroup: { width: '100%', marginBottom: 30 },
  label: { fontSize: 16, color: '#7C7C7C', marginBottom: 10 },
  pickerWrapper: { borderBottomWidth: 1, borderBottomColor: '#E2E2E2', justifyContent: 'center' },
  picker: { height: 50, width: '100%', backgroundColor: 'transparent', ...({ outlineStyle: 'none' } as any) },
  submitBtn: { backgroundColor: '#53B175', width: '100%', height: 67, borderRadius: 19, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  submitText: { color: '#fff', fontSize: 18, fontWeight: '600' }
});