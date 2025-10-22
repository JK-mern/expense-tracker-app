import z from 'zod';
import { authSchema, createUserSchema, loginSchema } from './auth.schema';

export type AuthSchemaType = z.infer<typeof authSchema>;
export type CreateUserType = z.infer<typeof createUserSchema>;
export type Login = z.infer<typeof loginSchema>;
