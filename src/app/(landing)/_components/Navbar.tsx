import { Button } from '@/components/ui/button';
import { Megaphone } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';

const Navbar = async () => {
  const session = await getServerSession();

  return (
    <header className='w-full flex justify-between max-w-screen-xl mx-auto mt-4 items-center px-3'>
      <div className='flex gap-10 '>
        <div className="flex ">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <Megaphone className="h-6 w-6" />
            <span className='text-xl leading-none'>Central Sync Hub</span>
          </Link>
        </div>
        <nav className='hidden md:flex'>
          <ul>
            <li>Pricing</li>
          </ul>
        </nav>
      </div>

      <div>
        {session?.user ?
          <Button className=''>
            <Link href={'/dashboard'}>
              Dashboard
            </Link>
          </Button>
          :
          <Button className=''>
            <Link href={'/signup'}>
              Try it
            </Link>
          </Button>
        }
      </div>
    </header>
  );
};

export default Navbar;