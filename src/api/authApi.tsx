import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_AUTH_SERVICE } from '@env';

export const baseURL = REACT_APP_AUTH_SERVICE;

const authApi = axios.create({ baseURL });
console.log(baseURL);
authApi.interceptors.request.use(async(config) => {
    const token = await AsyncStorage.getItem('token');

    // Si tienes un token, lo agregamos a la cabecera Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }
);

export default authApi;
