import z from 'zod';

export const authSchema = z.object({
  email: z.email('email is required'),
  password: z.string().min(8, 'Password must be atleast 8 letters')
});

export const createUserSchema = z.object({
  userName: z.string('Username is required'),
  currentBalance: z.string('Enter your current balance to track your finance'),
  profilePicture: z.string().optional()
});

export const loginSchema = z.object({
  email: z.email('email is required'),
  password: z.string('Password is required')
});
