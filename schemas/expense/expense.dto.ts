import z from 'zod';
import { createExpenseSchema } from './expense.schema';

export type CreateExpense = z.infer<typeof createExpenseSchema>;
