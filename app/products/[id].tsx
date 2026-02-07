import React, { useState, useEffect } from 'react'; 
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native'; 
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { detailStyles as styles } from '../../styles/detail.styles';
import { useCart } from '../../context/CartContext'; 
import { productService } from '../../services/productService'; 

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart(); 

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (id) {
          const data = await productService.getProductById(id as string);
          setProduct(data);
        }
      } catch (error: any) {
        console.log("Detail Fetch Error:", error.message);
        Alert.alert("Error", "Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      Alert.alert("Success", `${product.name} added to cart!`);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#004d40" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImg} />
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.priceRow}>
              <Text style={styles.price}>Rp{product.price.toLocaleString('id-ID')}</Text>
              {product.discount && (
                <View style={styles.discountTag}>
                  <Text style={styles.discountText}>{product.discount}</Text>
                </View>
              )}
            </View>
          </View>

          <Text style={styles.description}>
            {product.description}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomAction}>
        <TouchableOpacity 
          style={styles.cartBtn} 
          onPress={() => router.push('/(tabs)/cart')}
        >
          <Feather name="shopping-cart" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.addBtn} 
          activeOpacity={0.8}
          onPress={handleAddToCart} 
        >
          <Text style={styles.addBtnText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}