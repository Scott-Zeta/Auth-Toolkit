'use server';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { getVerificationByToken } from '@/data/emailVerifyToken';

export const newVerification = async (token: string) => {
  const verificationToken = await getVerificationByToken(token);
  if (!verificationToken) {
    return { error: 'Invalid token' };
  }

  const expired = new Date(verificationToken.expires) < new Date();

  if (expired) {
    return {
      error:
        'Token expired, try login again and we will grant you a new verification email.',
    };
  }

  const existingUser = await getUserByEmail(verificationToken.email);
  if (!existingUser) {
    return { error: "User' email not found" };
  }

  // update the user emailVerified and email(If user changed the mail then verified)
  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: verificationToken.email },
  });

  // delete the token has been used
  await db.verificationToken.delete({ where: { id: verificationToken.id } });
  return { success: 'Email verified!' };
};
