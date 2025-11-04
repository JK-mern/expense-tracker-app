import { supabase } from '@/lib/supabase/supabase';
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL_WEB
});

httpClient.interceptors.request.use(
  async (config) => {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    const accessToken = session?.access_token;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
