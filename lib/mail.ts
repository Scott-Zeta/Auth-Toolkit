// import { EmailTemplate } from '@/components/email/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string
) => {
  const confirmationLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  const content = `
  <div>
    <h1>Welcome, ${name}!</h1>
    <p>Click <a href="${confirmationLink}">here</a> to verify your account.</p>
  </div>`;
  await resend.emails.send({
    from: 'NoReply <onboarding@resend.dev>',
    to: email,
    subject: 'Please verify your email address',
    html: content,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: 'NoReply <onboarding@resend.dev>',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};
