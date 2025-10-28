import { httpClient } from './httpClient';

export const getCurrentBalance = async (): Promise<number> => {
  try {
    const result = await httpClient.get('balance/currentBalance');
    const data = result.data;
    return data.data.balance ?? 0;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
