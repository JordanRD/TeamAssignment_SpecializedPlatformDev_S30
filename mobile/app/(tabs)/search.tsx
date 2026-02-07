import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import api from '../../services/api'; 
import { useRouter } from 'expo-router';

interface Item {
  id?: string;
  _id?: string;
  name: string;
  price: number;
  image?: string;
}

export default function SearchPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [filteredResults, setFilteredResults] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await api.get('/products');
        if (response.data) {
          setAllItems(response.data);
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to load products.');
      } finally {
        setIsLoading(false);
      }
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredResults([]);
    } else {
      const filtered = allItems.filter((item: Item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(filtered);
    }
  }, [searchQuery, allItems]);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} />

      <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Search</Text>
      </View>
      
      <View style={styles.searchBarWrapper}>
        <Ionicons name="search" size={20} color={COLORS.gray} />
        <TextInput 
          placeholder="Search items..." 
          style={styles.input}
          autoFocus={true} 
          value={searchQuery}
          onChangeText={(text: string) => setSearchQuery(text)}
        />
        {isLoading && <ActivityIndicator size="small" color={COLORS.primary} />}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        <View style={styles.recentWrapper}>
          {searchQuery.length > 0 ? (
            <>
              <Text style={styles.subTitle}>Search Results</Text>
              {filteredResults.length > 0 ? (
                filteredResults.map((item: Item) => {
                  const targetId = item.id || item._id;
                  
                  return (
                    <TouchableOpacity 
                      key={targetId || Math.random().toString()} 
                      style={styles.itemCard}
                      onPress={() => {
                        if (targetId) {
                          router.push({
                            pathname: "/products/[id]", 
                            params: { id: targetId }
                          } as any);
                        }
                      }}
                    >
                      <View style={styles.cardContent}>
                        <Image 
                          source={{ uri: item.image || 'https://via.placeholder.com/150' }} 
                          style={styles.productImage} 
                        />
                        <View style={styles.textDetails}>
                          <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                          <Text style={styles.itemPrice}>Rp {item.price?.toLocaleString('id-ID')}</Text>
                        </View>
                      </View>
                      <Ionicons name="chevron-forward" size={18} color={COLORS.gray} />
                    </TouchableOpacity>
                  );
                })
              ) : (
                <Text style={styles.emptyText}>No items found for "{searchQuery}"</Text>
              )}
            </>
          ) : (
            <>
              <Text style={styles.subTitle}>Recent Searches</Text>
              <Text style={styles.emptyText}>Type to search from {allItems.length} items.</Text>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  searchBarWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F5F5F5', 
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 12, 
    borderRadius: 12 
  },
  input: { flex: 1, marginLeft: 10, fontSize: 16 },
  recentWrapper: { paddingHorizontal: 20 },
  subTitle: { fontWeight: 'bold', marginBottom: 10, marginTop: 10, fontSize: 16 },
  emptyText: { color: COLORS.gray, fontSize: 14 },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#EEE'
  },
  textDetails: {
    marginLeft: 15,
    flex: 1
  },
  itemName: { fontSize: 16, fontWeight: '500' },
  itemPrice: { color: COLORS.primary, marginTop: 2, fontWeight: '600' }
});