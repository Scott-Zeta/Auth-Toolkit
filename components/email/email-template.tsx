import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  content: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  content,
}) => (
  <div>
    <h1>Welcome, {name}!</h1>
    <p>{content}</p>
  </div>
);
