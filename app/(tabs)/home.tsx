import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router'; 
import { homeStyles as styles } from '../../styles/home.styles';
import { productService } from '../../services/productService';

export default function Home() {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const router = useRouter(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts(); 
        setProducts(data);
      } catch (error: any) {
        console.error("Fetch Error:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SafeAreaView edges={['top']} style={{ flex: 0 }} />

      <View style={styles.header}>
        <Text style={styles.greetText}>Your brand.</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Feather name="bell" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={styles.promoCard}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?q=80&w=1000' }} style={styles.promoImage} />
          <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          />
          <View style={styles.promoTextGroup}>
            <Text style={styles.promoTitle}>2026{"\n"}Collections.</Text>
            <TouchableOpacity style={styles.shopBtn} onPress={() => router.push('/products')}>
              <Text style={styles.shopText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular products</Text>
          <TouchableOpacity onPress={() => router.push('/products')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.productGrid}>
          {loading ? (
            <ActivityIndicator size="small" color="#004d40" style={{ marginTop: 20 }} />
          ) : products.length > 0 ? (
            products.map((item: any) => (
              <TouchableOpacity 
                key={item.id || item._id} 
                style={styles.productCard}
                onPress={() => router.push(`/products/${item.id || item._id}`)}
              >
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: item.image }} style={styles.productImg} />
                </View>
                <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.productPrice}>
                  Rp{item.price.toLocaleString('id-ID')}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyText}>No products found.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}