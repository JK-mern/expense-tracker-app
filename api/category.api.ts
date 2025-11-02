import { ExpenseCategories } from '@/types/expense/expense';
import { httpClient } from './httpClient';
import { API_ROUTES } from '@/constants/route';

export type GetAllCategoriesResponse = {
  success: true;
  categories: {
    id: number;
    name: string;
  };
};

export const getAllCategories = async (): Promise<ExpenseCategories[]> => {
  try {
    const result = await httpClient.get(API_ROUTES.getAllCategories.getPath());
    const data = result.data.categories;
    return data;
  } catch (error) {
    throw error;
  }
};
