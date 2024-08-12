import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const createApiInstance = (baseURL: string) => {
  const api = axios.create({ baseURL });

  api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};

export default createApiInstance;
