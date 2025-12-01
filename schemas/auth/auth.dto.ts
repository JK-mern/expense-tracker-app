import z from 'zod';
import {
  authSchema,
  createUserSchema,
  loginSchema,
  resetPasswordSchema
} from './auth.schema';

export type AuthSchemaType = z.infer<typeof authSchema>;
export type CreateUserType = z.infer<typeof createUserSchema>;
export type Login = z.infer<typeof loginSchema>;
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
