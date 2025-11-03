import { GetAllCategoriesResponse } from '@/api/category.api';
import { TransactionHistoryResult } from '@/api/expense.api';

export type TransactionHistoryList = TransactionHistoryResult['data'];
export type ExpenseCategories = GetAllCategoriesResponse['categories'];
