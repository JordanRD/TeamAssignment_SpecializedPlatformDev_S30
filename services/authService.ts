import api from './api';
import * as SecureStore from 'expo-secure-store';

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/users/login', { email, password });
    
    if (response.data.token) {
      await SecureStore.setItemAsync('userToken', response.data.token);
      if (response.data.name) {
        await SecureStore.setItemAsync('userName', response.data.name);
      }
    }
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/users/profile'); 
    return response.data;
  },

  register: async (username: string, email: string, password: string) => {
    const response = await api.post('/users/register', { 
      name: username, 
      email, 
      password 
    });
    return response.data;
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('userName');
  }
};