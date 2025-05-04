import axios from 'axios';
import { toast } from 'sonner';

const baseURL = import.meta.env.VITE_API_URL

if (!baseURL) {
  throw new Error('VITE_API_URL is not set');
}

// Create a custom axios instance with default config
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor to handle 429 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      // (AI) Show a toast notification for rate limiting
      toast.error('Too many requests. Please try again later.');
    }
    return Promise.reject(error);
  }
);

export default api;
