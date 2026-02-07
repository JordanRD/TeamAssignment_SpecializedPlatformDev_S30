import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
}

export default function Button({ title, onPress, variant = 'primary' }: ButtonProps) {
  const isOutline = variant === 'outline';
  
  return (
    <TouchableOpacity 
      style={[styles.btn, isOutline ? styles.btnOutline : styles.btnPrimary]} 
      onPress={onPress}
    >
      <Text style={[styles.text, isOutline ? styles.textOutline : styles.textPrimary]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { padding: 16, borderRadius: 12, alignItems: 'center', marginVertical: 8, width: '100%' },
  btnPrimary: { backgroundColor: COLORS.primary },
  btnOutline: { borderWidth: 1, borderColor: COLORS.lightGray, backgroundColor: 'transparent' },
  text: { fontSize: 16, fontWeight: '600' },
  textPrimary: { color: COLORS.white },
  textOutline: { color: COLORS.black },
});