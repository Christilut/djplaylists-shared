import axios from 'axios';
import { toast } from 'sonner';
import { supabase } from '../../../integrations/supabase/client';

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

// Add an interceptor to add the auth token to requests
api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  
  return config;
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
