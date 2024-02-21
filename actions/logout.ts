'use server';

import { signOut } from '@/auth';

export const logout = async () => {
  // can add more server action before sign out
  await signOut();
};
