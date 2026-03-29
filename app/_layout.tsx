import { Stack } from 'expo-router';
// 1. Import cái giỏ hàng dùng chung vào đây
import { CartProvider } from '../context/CartContext'; 

export default function RootLayout() {
  return (
    /* 2. Bọc toàn bộ Stack bên trong CartProvider */
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Màn hình Welcome mặc định là index */}
        <Stack.Screen name="index" /> 
        
        {/* Nhóm màn hình Login/Signup */}
        <Stack.Screen name="(auth)" />
        
        {/* Nhóm màn hình chính sau khi Login */}
        <Stack.Screen name="(tabs)" />
      </Stack>
    </CartProvider>
  );
}