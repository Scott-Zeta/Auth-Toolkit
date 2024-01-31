//makr as a server actions, equal feature to traditional API route
'use server';
import * as z from 'zod';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { LoginSchema } from '@/schemas';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  //validation on server side
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Server validation failed' };
  }

  const { email, password } = validateFields.data;
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: 'Logged in!' };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' };
        default:
          return { error: 'Unkown internal server error' };
      }
    }
    throw error;
  }
};
