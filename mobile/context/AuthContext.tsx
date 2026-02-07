import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store'; 
import { jwtDecode } from "jwt-decode"; // Install npm install jwt-decode

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        if (token) {
          setUserToken(token);
          const decoded: any = jwtDecode(token);
          setUser(decoded); 
        }
      } catch (e) {
        console.log('Failed to fetch token from storage', e);
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);

  const login = async (token: string) => {
    try {
      const decoded: any = jwtDecode(token);
      console.log("Isi Token Decoded:", decoded); 
      setUser(decoded); 
      setUserToken(token);
      await SecureStore.setItemAsync('userToken', token);
    } catch (error) {
      console.error("Token decode error:", error);
    }
  };

  const logout = async () => {
    setUserToken(null);
    setUser(null); 
    await SecureStore.deleteItemAsync('userToken');
  };

  return (
    <AuthContext.Provider value={{ userToken, user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);