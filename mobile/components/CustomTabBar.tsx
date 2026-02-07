import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { COLORS } from '../constants/colors';

export default function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  // Helper untuk cek apakah tab sedang aktif
  const isActive = (path: string) => pathname === path;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/home')} style={styles.tabItem}>
        <Ionicons 
          name={isActive('/home') ? "home" : "home-outline"} 
          size={24} 
          color={isActive('/home') ? COLORS.primary : COLORS.gray} 
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/products')} style={styles.tabItem}>
        <Ionicons 
          name={isActive('/products') ? "search" : "search-outline"} 
          size={24} 
          color={isActive('/products') ? COLORS.primary : COLORS.gray} 
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/cart')} style={styles.tabItem}>
        <Ionicons 
          name={isActive('/cart') ? "cart" : "cart-outline"} 
          size={24} 
          color={isActive('/cart') ? COLORS.primary : COLORS.gray} 
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/signup')} style={styles.tabItem}>
        <Ionicons 
          name={isActive('/signup') ? "person" : "person-outline"} 
          size={24} 
          color={isActive('/signup') ? COLORS.primary : COLORS.gray} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    height: 70,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10, 
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});