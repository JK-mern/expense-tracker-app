import z from 'zod';
import { createExpenseSchema } from './expense.schema';

export type CreateExpese = z.infer<typeof createExpenseSchema>;
