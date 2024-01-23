//makr as a server actions, equal feature to traditional API route
'use server';
import * as z from 'zod';

import { LoginSchema } from '@/schemas';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  //validation on server side
  const validateFields = LoginSchema.safeParse(values);

  if (validateFields.success) {
    return { success: 'Server validation success' };
  }

  return { error: 'Server validation failed' };
};
