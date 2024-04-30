import React from 'react';

import Navigation from './_components/Navigation';

const MainLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className='h-full flex'>
      <Navigation />
      <main className='h-full overflow-y-auto flex-1'>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;