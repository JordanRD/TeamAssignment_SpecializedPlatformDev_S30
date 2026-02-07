import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';

interface ProductProps {
  product: {
    id: string;
    name: string;
    price: string;
    discount?: string;
    image: string;
  };
  onPress: () => void;
}

export default function ProductCard({ product, onPress }: ProductProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: product.image }} 
          style={styles.image} 
          resizeMode="cover"
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.price}>{product.price}</Text>
          {product.discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{product.discount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    marginRight: 15,
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    marginTop: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.black,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  discountBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
});