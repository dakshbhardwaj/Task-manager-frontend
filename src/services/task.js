import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://task-manager-backend-wxdz.onrender.com';

const getAuthHeader = async () => {
  const token = await AsyncStorage.getItem('token');
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
};

export const taskService = {
  getTasks: async () => {
    try {
      const config = await getAuthHeader();
      const response = await axios.get(`${API_URL}/tasks`, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching tasks' };
    }
  },

  getTask: async (id) => {
    try {
      const config = await getAuthHeader();
      const response = await axios.get(`${API_URL}/tasks/${id}`, config);
      return response.data;
    } catch (error) {
      console.log("error",error)
      throw error.response?.data || { message: 'Error fetching task' };
    }
  },

  createTask: async (taskData) => {
    try {
      const config = await getAuthHeader();
      const response = await axios.post(`${API_URL}/tasks`, taskData, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error creating task' };
    }
  },

  updateTask: async (id, taskData) => {
    try {
      const config = await getAuthHeader();
      const response = await axios.put(`${API_URL}/tasks/${id}`, taskData, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error updating task' };
    }
  },

  deleteTask: async (id) => {
    try {
      const config = await getAuthHeader();
      const response = await axios.delete(`${API_URL}/tasks/${id}`, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error deleting task' };
    }
  }
};