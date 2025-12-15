import z from 'zod';

export const createExpenseSchema = z.object({
  amount: z.number().min(1, 'Amount must be entered'),
  categoryId: z.number('select expense category'),
  date: z.date('select date'),
  description: z.string().optional()
});
