import axios, {AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL: string = 'http://localhost:3000';
// const baseURL: string = 'https://j1ldf49w-3000.use2.devtunnels.ms/';
// const baseURL: string = 'http://localhost:8081';


// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token: string | null = await AsyncStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
