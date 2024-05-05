'use client';

import React, { ElementRef, useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useMediaQuery } from 'usehooks-ts';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NavLinks } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ChevronsLeft, Megaphone, MenuIcon, SearchIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';

const Navigation = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const isResizingRef = useRef(false);
  const sideBarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const resetWidth = () => {
    if (sideBarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sideBarRef.current.style.width = isMobile ? '100%' : '240px';
      navbarRef.current.style.setProperty("width", isMobile ? "0" : "calc(100% - 240px)");
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sideBarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sideBarRef.current.style.width = '0';
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return;

    let newWidth = e.clientX;

    if (newWidth < 240) newWidth = 240;

    if (newWidth > 480) newWidth = 480;

    if (sideBarRef.current && navbarRef.current) {
      sideBarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty('left', `${newWidth}px`);
      navbarRef.current.style.setProperty('width', `calc(100% - ${newWidth}px)`);
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseMove);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [isMobile, pathname]);

  return (
    <>
      <aside
        ref={sideBarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex flex-col z-[999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && 'w-0'
        )}
      >
        <div className='flex flex-col gap-2 justify-between h-full'>
          <div className='flex flex-col'>
            <div className="flex h-[60px] items-center border-b px-6">
              <Link className="flex items-center gap-2 font-semibold" href="/dashboard">
                <Megaphone className="h-6 w-6" />
                <span>Central Sync Hub</span>
              </Link>
            </div>

            <div className="flex-1 overflow-auto py-2">
              <nav className="flex flex-col items-start px-4 text-sm font-medium">
                {NavLinks.map((data, index) => (
                  <Link
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-primary/50 transition-all hover:text-primary w-full",
                      pathname === data.path && "bg-gray-300 rounded-lg text-primary"
                    )}
                    href={data.path}
                    key={index}
                  >
                    <data.icon className='h-4 w-4' />
                    {data.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className='px-6 py-2'>
            <Button className='w-full' onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
              Sign out
            </Button>
          </div>
        </div>

        <div
          role='button'
          onClick={collapse}
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 absolute top-3 right-2 group-hover/sidebar:opacity-100 transition opacity-0",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className='h-6 w-6' />
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className='opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0'
        >
        </div>
      </aside>

      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full",
        )}
      >
        <nav className='bg-transparent px-3 py-2 w-full flex items-center gap-2'>
          {isCollapsed && <MenuIcon role='button' onClick={resetWidth} className="h-6 w-6 text-muted-foreground" />}
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                  placeholder="Search..."
                  type="search"
                />
              </div>
            </form>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navigation;