import { db } from '@/lib/db';
import email from 'next-auth/providers/email';

export const getVerificationByEmail = async (email: string) => {
  try {
    const verifi_Token = await db.verificationToken.findFirst({
      where: { email },
    });
    return verifi_Token;
  } catch {
    return null;
  }
};

export const getVerificationByToken = async (token: string) => {
  try {
    const verifi_Token = await db.verificationToken.findUnique({
      where: { token },
    });
    return verifi_Token;
  } catch {
    return null;
  }
};
