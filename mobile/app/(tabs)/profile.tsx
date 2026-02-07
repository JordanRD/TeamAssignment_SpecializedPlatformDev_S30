import React, { useState, useEffect } from 'react'; 
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; 
import { profileStyles as styles } from '../../styles/profile.styles'; 
import { authService } from '../../services/authService'; 
import { useAuth } from '../../context/AuthContext'; 

export default function ProfileScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: "Guest",
    email: "-",
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000'
  });

  useEffect(() => {
    const getProfile = async () => {
      try {
        const userData = await authService.getProfile();
        if (userData) {
          setUser({
            name: userData.name || "User",
            email: userData.email || "-",
            avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000'
          });
        }
      } catch (err: any) {
        console.log("Fetch Profile Error Details:", err.response?.data || err.message);
        Alert.alert("Session Expired", "Please login again to access your profile.");
      } finally {
        setLoading(false);
      }
    };
    getProfile();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive", 
          onPress: async () => {
            try {
              await authService.logout(); 
              await logout();          
              router.replace('/' as any); 
            } catch (error) {
              Alert.alert("Error", "Failed to logout safely.");
            }
          } 
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#004d40" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SafeAreaView edges={['top']} />

      <View style={{ paddingHorizontal: 20, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Profile</Text>
        <TouchableOpacity>
          <Feather name="settings" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }} 
      >

        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <MenuItem icon="shopping-bag" title="My Orders" />
          <MenuItem icon="heart" title="Wishlist" />
          <MenuItem icon="credit-card" title="Payment Methods" />
          <MenuItem icon="map-pin" title="Shipping Address" />
          <MenuItem 
            icon="log-out" 
            title="Logout" 
            color="#FF4D4D" 
            onPress={handleLogout} 
          />
        </View>
      </ScrollView>
    </View>
  );
}

const MenuItem = ({ icon, title, color = '#333', onPress }: any) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuLeft}>
      <Feather name={icon} size={20} color={color} />
      <Text style={[styles.menuText, { color }]}>{title}</Text>
    </View>
    <Feather name="chevron-right" size={18} color="#ccc" />
  </TouchableOpacity>
);