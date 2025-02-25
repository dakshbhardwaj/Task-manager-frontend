import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://task-manager-backend-wxdz.onrender.com';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  },

  signup: async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password
      });
      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Signup failed';
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('token');
  },

  forgotPassword: async (email) => {
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to send reset code';
    }
  },

  resetPassword: async (email, resetCode, newPassword) => {
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, {
        email,
        resetCode,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to reset password';
    }
  }
};