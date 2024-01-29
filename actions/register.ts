//makr as a server actions, equal feature to traditional API route
'use server';
import * as z from 'zod';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';

import { RegisterSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  //validation on server side
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Server validation failed' };
  }

  const { email, password, name } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: 'Email already in use.' };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  return { success: 'User created!' };
};
