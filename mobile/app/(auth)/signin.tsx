import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native'; 
import { authStyles as styles } from '../../styles/auth.styles'; 
import InputField from '../../components/InputField';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { authService } from '../../services/authService'; 
import { useAuth } from '../../context/AuthContext';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Authentication Failed", "Please enter both email and password.");
      return;
    }

    try {
      const response = await authService.login(email, password);
      if (response && response.token) {
        await login(response.token);
        
        router.replace('/(tabs)/home'); 
      }
    } catch (error: any) {
      Alert.alert(
        "Login Error", 
        error.response?.data?.message || "Invalid credentials or server connection issue."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>Please Sign In</Text>
        <Text style={styles.subtitle}>
          Enter your Brand account details for a{"\n"}personalised experience
        </Text>
      </View>

      <View>
        <InputField 
          placeholder="marion@gmail.com" 
          value={email} 
          onChangeText={setEmail}
          iconName="mail-outline"
          keyboardType="email-address"
        />
        <InputField 
          placeholder="••••••" 
          value={password} 
          onChangeText={setPassword}
          secureTextEntry
          iconName="lock-closed-outline"
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotPass}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin}>
        <Text style={styles.primaryBtnText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Or Sign In with</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity style={styles.socialBtn}>
        <Ionicons name="logo-google" size={20} color="#DB4437" />
        <Text style={{ marginLeft: 10, fontWeight: '600' }}>Sign In with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialBtn}>
        <Ionicons name="logo-apple" size={20} color="black" />
        <Text style={{ marginLeft: 10, fontWeight: '600' }}>Sign In with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/signup')} style={{ marginTop: 25 }}>
        <Text style={{ textAlign: 'center' }}>
          Don't have an account? <Text style={{ color: '#005D47', fontWeight: 'bold' }}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}