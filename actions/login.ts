//makr as a server actions, equal feature to traditional API route
'use server';
import * as z from 'zod';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { LoginSchema } from '@/schemas';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from '@/lib/tokens';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail, sendTwoFactorTokenEmail } from '@/lib/mail';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  //validation on server side
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Server validation failed' };
  }

  const { email, password } = validateFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email) {
    return { error: 'User not found' };
  }
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      existingUser.name!
    );
    return {
      error:
        'Email not verified, Please check your email box and verify the account!',
    };
  }
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    const twoFactorToken = await generateTwoFactorToken(existingUser.email);
    await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

    return { twoFactor: true };
  }
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
