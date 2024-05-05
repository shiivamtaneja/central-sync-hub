import { Metadata } from 'next';

import SignIn from './_components/signin';

export const metadata: Metadata = {
  title: 'Invitation Sign in | Central Sync Hub',
};

const page = ({ params }: { params: { token: string } }) => {
  return (
    <SignIn token={params.token} />
  );
};

export default page;