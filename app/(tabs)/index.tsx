import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image as RNImage, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
// 1. Import useCart để sử dụng kho dữ liệu chung
import { useCart } from '../../context/CartContext';

export default function HomeScreen() {
  // 2. Lấy hàm addToCart từ Context
  const { addToCart } = useCart();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* 1. Header: Logo & Vị trí */}
        <View style={styles.header}>
          <RNImage 
            source={require('../../assets/images/logo-nectar-color.png')} 
            style={styles.logoHeader} 
          />
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={18} color="#4C4C4C" />
            <Text style={styles.locationText}>Dhaka, Banani</Text>
          </View>
        </View>

        {/* 2. Thanh tìm kiếm */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#181725" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Search Store" 
            placeholderTextColor="#7C7C7C"
          />
        </View>

        {/* 3. Banner Quảng cáo */}
        <View style={styles.bannerContainer}>
          <RNImage 
            source={{ uri: 'https://img.freepik.com/free-vector/fresh-vegetables-banner-template_23-2148766157.jpg' }} 
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        {/* 4. Section: Exclusive Offer */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Exclusive Offer</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productScroll}>
          {/* 3. Gắn id và hàm onAdd cho sản phẩm */}
          <ProductCard 
            id="1"
            name="Organic Bananas" 
            price={4.99} // Để dạng số để dễ tính toán
            unit="7pcs, Price" 
            image={require('../../assets/images/bananas.png')} 
            onAdd={addToCart}
          />
          <ProductCard 
            id="2"
            name="Red Apple" 
            price={1.99} 
            unit="1kg, Price" 
            image={{ uri: "https://cdn.pixabay.com/photo/2016/11/18/12/27/apple-1834328_1280.jpg" }} 
            onAdd={addToCart}
          />
        </ScrollView>

      </ScrollView>
    </SafeAreaView>
  );
}

// Component con cho từng sản phẩm
function ProductCard({ id, name, price, unit, image, onAdd }: any) {
  return (
    <View style={styles.card}>
      <RNImage source={typeof image === 'string' ? { uri: image } : image} style={styles.productImage} />
      <Text style={styles.productName} numberOfLines={1}>{name}</Text>
      <Text style={styles.productUnit}>{unit}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.productPrice}>${price.toFixed(2)}</Text>
        
        {/* 4. Khi nhấn nút +, gọi hàm onAdd truyền dữ liệu sản phẩm lên Context */}
        <TouchableOpacity 
          style={styles.addBtn} 
          onPress={() => onAdd({ id, name, price, image })}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { alignItems: 'center', marginTop: 10, marginBottom: 20 },
  logoHeader: { width: 30, height: 35, resizeMode: 'contain', marginBottom: 5 },
  locationContainer: { flexDirection: 'row', alignItems: 'center' },
  locationText: { fontSize: 18, fontWeight: '600', color: '#4C4C4C', marginLeft: 5 },
  
  searchContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#F2F3F2', 
    marginHorizontal: 25, 
    borderRadius: 15, 
    alignItems: 'center', 
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16 } as any,

  bannerContainer: { marginHorizontal: 25, borderRadius: 15, overflow: 'hidden', height: 115, marginBottom: 25 },
  bannerImage: { width: '100%', height: '100%' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, marginBottom: 15 },
  sectionTitle: { fontSize: 24, fontWeight: '600', color: '#181725' },
  seeAll: { fontSize: 16, color: '#53B175', fontWeight: '600' },

  productScroll: { paddingLeft: 25, marginBottom: 30 },
  card: { 
    width: 173, 
    borderWidth: 1, 
    borderColor: '#E2E2E2', 
    borderRadius: 18, 
    padding: 15, 
    marginRight: 15 
  },
  productImage: { width: '100%', height: 80, resizeMode: 'contain', marginBottom: 15 },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  productUnit: { fontSize: 14, color: '#7C7C7C', marginBottom: 10 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productPrice: { fontSize: 18, fontWeight: '600' },
  addBtn: { backgroundColor: '#53B175', width: 45, height: 45, borderRadius: 17, justifyContent: 'center', alignItems: 'center' }
});