import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { listStyles as styles } from '../../styles/product-list.styles';
import { productService } from '../../services/productService';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const renderProduct = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.9}
      onPress={() => router.push(`/products/${item.id || item._id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      
      {item.discount && (
        <View style={styles.discountTag}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.price}>Rp{item.price.toLocaleString('id-ID')}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 5 }}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Products</Text>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#004d40" />
          <Text style={{ marginTop: 10, color: '#666' }}>Loading collection...</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => (item.id || item._id).toString()}
          numColumns={2}
          columnWrapperStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}

          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 50, color: '#aaa' }}>
              No products available in database.
            </Text>
          }
        />
      )}
    </View>
  );
}