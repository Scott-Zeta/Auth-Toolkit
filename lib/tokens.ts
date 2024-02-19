import { getVerificationByEmail } from '@/data/emailVerifyToken';
import { v4 as uuidv4 } from 'uuid';

import { db } from '@/lib/db';
import { getPasswordResetTokenByEmail } from '@/data/passwordRestToken';
import { sendPasswordResetEmail } from './mail';

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  //token is going to expire in 30 minutes
  const expires = new Date(new Date().getTime() + 1800 * 1000);

  //check if there is a token for this email
  const existingToken = await getVerificationByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  //token is going to expire in 30 minutes
  const expires = new Date(new Date().getTime() + 1800 * 1000);

  //check if there is a token for this email
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return passwordResetToken;
};
