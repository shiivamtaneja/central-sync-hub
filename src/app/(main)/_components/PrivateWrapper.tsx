'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Spinner from '@/components/spinner';
import Navigation from './navigation';

const PrivateWrapper = ({
  children
}: {
  children: React.ReactNode
}) => {
  const router = useRouter();
  const session = useSession();

  if (session.status === 'loading') {
    return <main className='flex h-full w-full justify-center items-center'>
      <Spinner size={'icon'} />
    </main>;
  }

  if (session.status === 'unauthenticated') {
    router.replace('/');
  }

  return (
    <main className='flex h-full'>
      <Navigation />
      <div className='flex-1 h-full overflow-y-auto px-3 pt-14 pb-4'>
        {children}
      </div>
    </main>
  );
};

export default PrivateWrapper;