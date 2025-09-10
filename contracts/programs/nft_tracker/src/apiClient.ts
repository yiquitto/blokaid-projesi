import axios from 'axios';
import { store } from '../store/store';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_URL,
});

// API Interceptor: Her istek gönderilmeden önce araya girer.
// Bu sayede her istekte manuel olarak token eklemek zorunda kalmayız.
apiClient.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;