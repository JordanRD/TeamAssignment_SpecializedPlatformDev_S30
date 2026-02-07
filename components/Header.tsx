import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>Your brand.</Text>
      <TouchableOpacity>
        <Ionicons name="notifications-outline" size={24} color={COLORS.black} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingTop: 50, 
    paddingBottom: 10,
    backgroundColor: COLORS.white 
  },
  brand: { fontSize: 20, fontWeight: 'bold' },
});