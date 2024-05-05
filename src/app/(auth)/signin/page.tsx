import { Metadata } from 'next';

import SignIn from "./_components/signin";

export const metadata: Metadata = {
  title: 'Sign in | Central Sync Hub',
};

const SignInPage = () => {
  return (
    <SignIn />
  );
};

export default SignInPage;