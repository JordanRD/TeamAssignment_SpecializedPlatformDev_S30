import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext'; 
import { CartProvider } from '../context/CartContext'; 

function RootLayoutNav() {
  const { user } = useAuth();

  return (
    <CartProvider key={user?._id}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen 
          name="products/[id]" 
          options={{ 
            headerShown: false, 
            title: 'Product Detail',
            presentation: 'card' 
          }} 
        />
      </Stack>
    </CartProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}