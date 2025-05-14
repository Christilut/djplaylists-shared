import axios, { InternalAxiosRequestConfig, CreateAxiosDefaults } from 'axios';
import { toast } from 'sonner';
import { supabase } from '../../../integrations/supabase/client';

// Extend Axios types to include our custom properties
declare module 'axios' {
  interface AxiosRequestConfig {
    waitForMinimumDelay?: number;
    metadata?: {
      startTime: number;
    };
  }
  
  interface CreateAxiosDefaults {
    waitForMinimumDelay?: number;
  }
}

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
  // Add minimum delay configuration (in milliseconds)
  waitForMinimumDelay: 0
});

// Add an interceptor to add the auth token to requests
api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  
  return config;
});

// Add response interceptor to handle 429 errors and minimum delay
api.interceptors.response.use(
  async (response) => {
    // Get the minimum delay from config
    const minDelay = response.config.waitForMinimumDelay || 0
    
    if (minDelay > 0) {
      // Calculate how long the request took
      const requestTime = Date.now() - (response.config.metadata?.startTime || Date.now())
      // If request was faster than minimum delay, wait for the difference
      if (requestTime < minDelay) {
        await new Promise(resolve => setTimeout(resolve, minDelay - requestTime))
      }
    }
    
    return response
  },
  (error) => {
    if (error.response?.status === 429) {
      // (AI) Show a toast notification for rate limiting
      toast.error('Too many requests. Please try again later.');
    }
    return Promise.reject(error);
  }
);

// Add request interceptor to track request start time
api.interceptors.request.use((config) => {
  config.metadata = { startTime: Date.now() }
  return config
})

export default api;
