import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { cartStyles as styles } from '../../styles/cart.styles';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CartScreen() {
  const { cartItems, addToCart, minusQuantity, removeFromCart } = useCart();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const router = useRouter();
  const { user } = useAuth();

  React.useEffect(() => {
    setSelectedItems([]);
  }, [user?.id]);

  const toggleSelect = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      const allIds = cartItems.map(item => item._id);
      setSelectedItems(allIds);
    }
  };
  
  const handleCheckout = () => {
    if (selectedItems.length === 0) { 
      Alert.alert("No Items Selected", "Please select at least one item to checkout.");
      return;
    }

    const itemsToCheckout = cartItems.filter(item => selectedItems.includes(item._id));

    router.push({
      pathname: '/checkout',
      params: { 
        items: JSON.stringify(itemsToCheckout) 
      }
    });
  };

  const totalPrice = cartItems.reduce((total, item) => {
      if (selectedItems.includes(item._id)) {
        return total + (item.price * item.quantity);
      }
      return total;
    }, 0);

  const handleRemove = (id: string, name: string) => {
    Alert.alert(
      "Remove Item",
      `Are you sure you want to remove ${name} from cart?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Remove", 
          style: "destructive", 
          onPress: () => {
            removeFromCart(id); // Hapus dari data cart
            setSelectedItems(prev => prev.filter(itemId => itemId !== id)); // Hapus dari daftar centang
          } 
        }
      ]
    );
  };

  const removeSelected = () => {
    if (selectedItems.length === 0) return;

    Alert.alert(
      "Remove Selected",
      "Remove all selected items from cart?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Remove All", 
          style: "destructive", 
          onPress: () => {
            selectedItems.forEach(id => removeFromCart(id));
            setSelectedItems([]); 
          } 
        }
      ]
    );
  };

const renderItem = ({ item }: { item: any }) => {
    const isSelected = selectedItems.includes(item._id);

    return (
      <View style={styles.cartItem}>
        <TouchableOpacity 
          style={[styles.checkbox, isSelected && styles.checkboxActive]}
          onPress={() => toggleSelect(item._id)}
        >
          {isSelected && <Feather name="check" size={14} color="white" />}
        </TouchableOpacity>
        
        <Image source={{ uri: item.image }} style={styles.productImage} />
        
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>Rp{item.price.toLocaleString('id-ID')}</Text>
          
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => minusQuantity(item._id)}>
              <Feather name="minus-circle" size={22} color="#004d40" />
            </TouchableOpacity>
            
            <Text style={styles.quantityText}>{item.quantity}</Text>
            
            <TouchableOpacity onPress={() => addToCart(item)}>
              <Feather name="plus-circle" size={22} color="#004d40" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.deleteBtn} 
          onPress={() => handleRemove(item._id, item.name)}
        >
          <Feather name="trash-2" size={18} color="#FF5252" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SafeAreaView edges={['top']} />

      <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Cart</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 150 }}>
          <Feather name="shopping-bag" size={80} color="#F5F5F5" />
          <Text style={{ marginTop: 15, fontSize: 16, color: '#aaa', fontWeight: '500' }}>
            Your cart is empty
          </Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => item._id || index.toString()}
          contentContainerStyle={[
          styles.listContent, 
          { paddingBottom: 180 }]}
          showsVerticalScrollIndicator={false}
        />
      )}

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <View>
            <Text style={styles.totalLabel}>Total Payment</Text>
            <Text style={styles.totalAmount}>Rp{totalPrice.toLocaleString('id-ID')}</Text>
          </View>
          <TouchableOpacity onPress={toggleSelectAll}>
             <Text style={{color: '#004d40', fontWeight: 'bold'}}>
               {selectedItems.length === cartItems.length && cartItems.length > 0 
                 ? 'Unselect all' 
                 : 'Choose all'}
             </Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.checkoutBtn}
          onPress={handleCheckout}
          activeOpacity={0.8}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}