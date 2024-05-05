import * as React from 'react';

interface AuthEmailTemplateProps {
  otp: string;
}

export const AuthEmailTemplate = ({
  otp,
}: AuthEmailTemplateProps) => (
  <div>
    <h2>Use the following credentials to access the website!</h2>
    <h3>OTP: {otp}</h3>
  </div>
);
