import { API_ROUTES } from '@/constants/route';
import { httpClient } from './httpClient';

export const getCurrentBalance = async (): Promise<number> => {
  try {
    const result = await httpClient.get(API_ROUTES.currentBalance.getPath());
    const data = result.data;
    return data.data.balance ?? 0;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
