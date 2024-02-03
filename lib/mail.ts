import { EmailTemplate } from '@/components/email/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string
) => {
  const confirmationLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  const content = `<p>Click <a href="${confirmationLink}">here</a> to verify your account</p>`;
  await resend.emails.send({
    from: 'NoReply <onboarding@resend.dev>',
    to: email,
    subject: 'Please verify your email address',
    react: EmailTemplate({ name: name, content: content }),
    text: 'Please verify your email address',
  });
};
