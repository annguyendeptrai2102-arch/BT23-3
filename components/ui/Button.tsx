import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';

interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
  style?: ViewStyle; // Thêm dòng này để nhận style tùy chỉnh (màu sắc, margin...)
}

export const Button = ({ title, onPress, loading, style }: Props) => (
  <TouchableOpacity 
    // Kết hợp style mặc định và style truyền vào
    style={[styles.button, style]} 
    onPress={onPress} 
    activeOpacity={0.8}
    disabled={loading}
  >
    {loading ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <Text style={styles.text}>{title}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    height: 67,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
    // Thêm shadow nhẹ cho giống Figma (tùy chọn)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});