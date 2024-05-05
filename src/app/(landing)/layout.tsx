import React from 'react';

import type { Metadata } from "next";

import Navbar from './_components/Navbar';

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const LandingLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <Navbar />
      <main className='flex justify-center items-center h-full w-full'>
        {children}
      </main>
    </>
  );
};

export default LandingLayout;