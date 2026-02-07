import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { welcomeStyles as styles } from '../styles/welcome.styles';

export default function Welcome() {
  const [isSplash, setIsSplash] = useState(true);
  const fadeAnim = new Animated.Value(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplash(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isSplash) {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>Your brand.</Text>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1606741965509-717b9fdd6549?q=80&w=1000' }} 
        style={styles.backgroundImage} 
      />
      
      <View style={styles.bottomCard}>
        <Text style={styles.welcomeTitle}>welcome to{"\n"}Your Brand.</Text>
        <Text style={styles.welcomeSub}>
          Get exclusive limited apparel that only you have! Made by famous brands in the world
        </Text>
        
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.btnOutline} onPress={() => router.push('/signin')}>
            <Text style={styles.btnTextBlack}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnPrimary} onPress={() => router.push('/signup')}> 
            <Text style={styles.btnTextWhite}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}