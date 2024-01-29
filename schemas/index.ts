import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Valid Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: 'Valid Email is required' }),
  password: z
    .string()
    .min(8, { message: 'Password is required at least 8 characters' }),
  name: z.string().min(1, { message: 'Username is required' }),
});
