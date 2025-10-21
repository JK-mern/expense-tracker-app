import z from 'zod';
import { authSchema, createUserSchema } from './auth.schema';

export type AuthSchemaType = z.infer<typeof authSchema>;
export type CreateUserType = z.infer<typeof createUserSchema>;
