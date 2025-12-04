import { TransactionHistoryList } from '@/types/expense/expense';
import { httpClient } from './httpClient';
import { DateType } from 'react-native-ui-datepicker';
import { API_ROUTES } from '@/constants/route';
import { CreateExpense } from '@/schemas/expense/expense.dto';

export type TransactionHistoryResult = {
  success: boolean;
  data: {
    id: string;
    amount: number;
    date: Date;
    categoryName: string;
    balanceAmount: number;
    description: string;
  };
};

type TransactionHistoryRequest = {
  categoryId: number | null;
  date: DateType | null;
  page: number;
};

export const getTransactionHistory = async ({
  categoryId,
  date,
  page
}: TransactionHistoryRequest): Promise<TransactionHistoryList[]> => {
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

export const addExpense = async (data: CreateExpense) => {
  try {
    const result = await httpClient.post(
      API_ROUTES.addNewExpense.getPath(),
      data
    );
    const response = result.data;
    console.log(response);
  } catch (error) {
    throw error;
  }
};
