import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CheckoutScreen() {
  const router = useRouter();
  const { items } = useLocalSearchParams();
  const { clearSelectedItems } = useCart();
  
  const selectedProducts: CartItem[] = items ? JSON.parse(items as string) : [];
  const totalPrice = selectedProducts.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleFinalPayment = async () => {
    const selectedIds = selectedProducts.map(item => item._id);
    
    await clearSelectedItems(selectedIds);

    Alert.alert(
      "Payment Successful", 
      "Your order has been processed successfully. Thank you for shopping with us!",
      [{ 
        text: "Back to Home", 
        onPress: () => router.replace('/(tabs)/home') 
      }]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ 
        headerShown: true, 
        title: 'Checkout', 
        headerTitleAlign: 'center',
        headerShadowVisible: false 
      }} />
      
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Total Items</Text>
            <Text style={styles.value}>{selectedProducts.length} Products</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Amount</Text>
            <Text style={[styles.value, { color: '#004d40' }]}>
              Rp {totalPrice.toLocaleString('id-ID')}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity style={styles.paymentOption} activeOpacity={0.7}>
            <Feather name="credit-card" size={20} color="#004d40" />
            <Text style={styles.paymentText}>Bank Transfer (Simulation)</Text>
            <Feather name="chevron-right" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        <Text style={styles.infoText}>
          *This is a simulation page. No real transaction will be processed.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.payBtn} 
          onPress={handleFinalPayment} 
          activeOpacity={0.8}
        >
          <Text style={styles.payBtnText}>Confirm Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20 },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  label: { color: '#666', fontSize: 15 },
  value: { fontWeight: '600', fontSize: 15 },
  paymentOption: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 18, 
    borderWidth: 1, 
    borderColor: '#eee', 
    borderRadius: 15,
    backgroundColor: '#fafafa'
  },
  paymentText: { flex: 1, marginLeft: 15, fontWeight: '500', color: '#333' },
  infoText: { textAlign: 'center', color: '#aaa', fontSize: 12, marginTop: 40, paddingHorizontal: 20 },
  footer: { position: 'absolute', bottom: 40, left: 20, right: 20 },
  payBtn: { backgroundColor: '#004d40', padding: 18, borderRadius: 15, alignItems: 'center', elevation: 2 },
  payBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});