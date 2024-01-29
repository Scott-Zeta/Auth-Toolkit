//makr as a server actions, equal feature to traditional API route
'use server';
import * as z from 'zod';
import bcrypt from 'bcrypt';

import { RegisterSchema } from '@/schemas';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  //validation on server side
  const validateFields = RegisterSchema.safeParse(values);

  if (validateFields.success) {
    console.log(validateFields.data);
    const { email, password, name } = validateFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    return { success: 'Server validation success' };
  }

  return { error: 'Server validation failed' };
};
