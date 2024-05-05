import { Metadata } from 'next';

import SignUp from './_components/signup';

export const metadata: Metadata = {
  title: 'Invitation Sign up | Central Sync Hub',
};

const SignUpPage = ({ params }: { params: { token: string } }) => {
  return (
    <SignUp token={params.token}/>
  );
};

export default SignUpPage;