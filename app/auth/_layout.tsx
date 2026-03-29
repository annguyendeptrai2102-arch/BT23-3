import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        // Ẩn thanh header mặc định của hệ thống để dùng UI tự chế giống Figma
        headerShown: false,
        // Hiệu ứng chuyển trang mượt mà
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#fff' },
      }}
    >
      {/* Định nghĩa các màn hình con trong nhóm Auth */}
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="number" />
      <Stack.Screen name="verification" />
      <Stack.Screen name="location" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}