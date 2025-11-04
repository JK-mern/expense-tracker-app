import { API_ROUTES } from '@/constants/route';
import {
  ExpenseCategories,
  ExprenseCategoryAggregatedList
} from '@/types/expense/expense';
import { httpClient } from './httpClient';

export type GetAllCategoriesResponse = {
  success: true;
  categories: {
    id: number;
    name: string;
  };
};

export type GetCategoryAggregatedExpensesResponse = {
  success: true;
  data: {
    amount: string;
    categoryName: string;
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

export const getCategoryAggregatedExpenses = async (): Promise<
  ExprenseCategoryAggregatedList[]
> => {
  try {
    const result = await httpClient.get(
      API_ROUTES.getAggregatedExpenses.getPath()
    );
    const data = result.data;
    return data.data;
  } catch (error) {
    throw error;
  }
};
