import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// 1. Import useCart để lấy dữ liệu từ kho chung
import { useCart } from '../../context/CartContext';

export default function CartScreen() {
  // 2. Lấy danh sách sản phẩm và hàm cập nhật từ Context
  // Không dùng useState([ banana ]) ở đây nữa vì nó sẽ làm giỏ hàng luôn chỉ có chuối
  const { cartItems, updateQuantity } = useCart();

  // 3. Tính tổng tiền dựa trên dữ liệu thực tế trong giỏ
  const totalPrice = cartItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

  const renderItem = ({ item }: any) => (
    <View style={styles.cartItem}>
      <Image source={typeof item.image === 'number' ? item.image : item.image} style={styles.itemImage} />
      
      <View style={styles.itemDetails}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName}>{item.name}</Text>
          <TouchableOpacity>
            <Ionicons name="close" size={24} color="#7C7C7C" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.itemUnit}>Unit Price: ${item.price}</Text>

        <View style={styles.actionRow}>
          <View style={styles.quantityContainer}>
            {/* Nút trừ (-) */}
            <TouchableOpacity 
              style={styles.qtyBtn} 
              onPress={() => updateQuantity(item.id, 'minus')}
            >
              <Ionicons name="remove" size={24} color="#B3B3B3" />
            </TouchableOpacity>

            <Text style={styles.qtyText}>{item.quantity}</Text>

            {/* Nút cộng (+) */}
            <TouchableOpacity 
              style={[styles.qtyBtn, { borderColor: '#53B175' }]} 
              onPress={() => updateQuantity(item.id, 'plus')}
            >
              <Ionicons name="add" size={24} color="#53B175" />
            </TouchableOpacity>
          </View>

          <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>
      
      {/* Hiển thị thông báo nếu giỏ hàng trống */}
      {cartItems.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="cart-outline" size={100} color="#E2E2E2" />
          <Text style={{ color: '#7C7C7C', fontSize: 18, marginTop: 10 }}>Your cart is empty</Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity style={styles.checkoutBtn} disabled={cartItems.length === 0}>
        <View style={{ flex: 1 }} />
        <Text style={styles.checkoutText}>Go to Checkout</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceTagText}>${totalPrice.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#E2E2E2', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  listContent: { paddingHorizontal: 25 },
  cartItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 25, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  itemImage: { width: 80, height: 70, resizeMode: 'contain' },
  itemDetails: { flex: 1, marginLeft: 20 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  itemUnit: { color: '#7C7C7C', fontSize: 14, marginTop: 5 },
  actionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { width: 45, height: 45, borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 17, justifyContent: 'center', alignItems: 'center' },
  qtyText: { fontSize: 18, fontWeight: '600', marginHorizontal: 15, minWidth: 20, textAlign: 'center' },
  itemPrice: { fontSize: 18, fontWeight: '600', color: '#181725' },
  checkoutBtn: { backgroundColor: '#53B175', margin: 25, height: 67, borderRadius: 19, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
  checkoutText: { color: '#fff', fontSize: 18, fontWeight: '600', flex: 2, textAlign: 'center' },
  priceContainer: { backgroundColor: '#489E67', paddingVertical: 2, paddingHorizontal: 8, borderRadius: 4 },
  priceTagText: { color: '#fff', fontSize: 12, fontWeight: '600' }
});