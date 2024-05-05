import { Metadata } from 'next';

import SignUp from './_components/signup';

export const metadata: Metadata = {
  title: 'Sign up | Central Sync Hub',
};

const SignUpPage = () => {
  return (
    <SignUp />
  );
};

export default SignUpPage;