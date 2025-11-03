import { TransactionHistoryList } from '@/types/expense/expense';
import { httpClient } from './httpClient';
import { DateType } from 'react-native-ui-datepicker';
import { API_ROUTES } from '@/constants/route';

export type TransactionHistoryResult = {
  success: boolean;
  data: {
    id: string;
    amount: number;
    date: Date;
    categoryName: string;
  };
};

type TrasactionHistoryRequest = {
  categoryId: number | null;
  date: DateType | null;
  page: number;
};

export const getTransactionHistory = async ({
  categoryId,
  date,
  page
}: TrasactionHistoryRequest): Promise<TransactionHistoryList[]> => {
  try {
    const result = await httpClient.get(
      API_ROUTES.getTransactionHistory.getPath(),
      {
        params: {
          categoryId,
          date,
          page
        }
      }
    );
    const data = result.data;
    return data.data;
  } catch (error) {
    throw error;
  }
};
