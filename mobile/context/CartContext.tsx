import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';
import React, { createContext, useState, useContext, useEffect } from 'react';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any) => void;
  minusQuantity: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  clearSelectedItems: (selectedIds: string[]) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user } = useAuth(); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const initCart = async () => {
      setIsLoading(true); 
      if (user?.id) {
        const savedCart = await AsyncStorage.getItem(`cart_${user.id}`);
        if (isMounted) {
          setCartItems(savedCart ? JSON.parse(savedCart) : []);
        }
      } else {
        setCartItems([]);
      }
      setIsLoading(false); 
    };

    initCart();
    return () => { isMounted = false; };
  }, [user?.id]); 

  useEffect(() => {
    const persistCart = async () => {
      if (user?.id && !isLoading) {
        await AsyncStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems));
      }
    };

    const timeoutId = setTimeout(persistCart, 500);
    return () => clearTimeout(timeoutId);
  }, [cartItems, user?.id, isLoading]);

  const addToCart = (product: any) => {
    setCartItems((prevItems) => {
      const isExist = prevItems.find((item) => item._id === product._id);
      if (isExist) {
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const minusQuantity = (productId: string) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((i) => i._id === productId);
      if (item?.quantity === 1) {
        return prevItems.filter((i) => i._id !== productId);
      }
      return prevItems.map((i) =>
        i._id === productId ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const clearSelectedItems = async (selectedIds: string[]) => {
    const updatedCart = cartItems.filter((item) => !selectedIds.includes(item._id));
    setCartItems(updatedCart);
    if (user?.id) {
      await AsyncStorage.setItem(`cart_${user.id}`, JSON.stringify(updatedCart));
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      minusQuantity,
      removeFromCart,
      clearCart,
      clearSelectedItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};