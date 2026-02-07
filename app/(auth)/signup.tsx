import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authStyles as styles } from '../../styles/auth.styles'; 
import InputField from '../../components/InputField';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { authService } from '../../services/authService'; 

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      Alert.alert("Registration Failed", "Please fill in all required fields to proceed.");
      return;
    }

    try {
      const response = await authService.register(username, email, password);
      
      if (response) {
        Alert.alert(
          "Success", 
          "Your account has been created successfully. Please sign in to continue."
        );
        router.replace('/signin');
      }
    } catch (error: any) {
      Alert.alert(
        "Registration Error", 
        error.response?.data?.message || "An error occurred while connecting to the server. Please try again."
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <View style={styles.headerSection}>
          <Text style={styles.title}>Let's Get Started</Text>
          <Text style={styles.subtitle}>Create an account to continue.</Text>
        </View>

        <View>
          <InputField 
            placeholder="Username" 
            value={username} 
            onChangeText={setUsername}
            iconName="person-outline"
          />
          <InputField 
            placeholder="Email" 
            value={email} 
            onChangeText={setEmail}
            iconName="mail-outline"
            keyboardType="email-address"
          />
          <InputField 
            placeholder="Password (at least 8 characters)" 
            value={password} 
            onChangeText={setPassword}
            secureTextEntry
            iconName="lock-closed-outline"
          />
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={handleSignUp}>
          <Text style={styles.primaryBtnText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or Continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.socialBtn}>
          <Ionicons name="logo-google" size={20} color="#DB4437" />
          <Text style={{ marginLeft: 10, fontWeight: '600' }}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialBtn}>
          <Ionicons name="logo-apple" size={20} color="black" />
          <Text style={{ marginLeft: 10, fontWeight: '600' }}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/signin')} style={{ marginTop: 40 }}>
          <Text style={{ textAlign: 'center' }}>
            Already have an account? <Text style={{ color: '#005D47', fontWeight: 'bold' }}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}