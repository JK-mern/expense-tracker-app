import {
  GetAllCategoriesResponse,
  GetCategoryAggregatedExpensesResponse
} from '@/api/category.api';
import { TransactionHistoryResult } from '@/api/expense.api';

export type TransactionHistoryList = TransactionHistoryResult['data'];
export type ExpenseCategories = GetAllCategoriesResponse['categories'];
export type ExprenseCategoryAggregatedList =
  GetCategoryAggregatedExpensesResponse['data'];
