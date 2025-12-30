import z from 'zod';

export const authSchema = z.object({
  email: z.email('email is required').toLowerCase().trim(),
  password: z.string().min(8, 'Password must be at least 8 letters')
});

export const createUserSchema = z.object({
  userName: z.string('Username is required'),
  currentBalance: z.string('Enter your current balance to track your finance'),
  profilePicture: z.string().optional()
});

export const loginSchema = z.object({
  email: z.email('email is required').trim().toLowerCase(),
  password: z.string('Password is required')
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be 8 characters long'),
    confirmPassword: z.string().min(8, 'Password must be 8 characters long')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword']
  });
