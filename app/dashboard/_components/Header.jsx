"use client";
import { UserButton } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Header = () => {
  const router = useRouter();
  const path = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Interview', path: '/dashboard' },
    { name: 'Prepare', path: '/dashboard/prepareInterview' },
    { name: 'How it works', path: '/' },
  ];

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
      {/* Logo */}
      <div className="text-xl font-bold text-yellow-600">🤖 MockMate</div>

      {/* Navigation */}
      <ul className='hidden md:flex gap-6 ml-4'>
        {navItems.map((item) => {
          const isActive =
            path === item.path || (item.path !== '/' && path.startsWith(item.path));
          return (
            <li
              key={item.name}
              onClick={() => router.replace(item.path)}
              className={`cursor-pointer transition-all font-semibold ${
                isActive
                  ? 'text-primary underline underline-offset-4'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {item.name}
            </li>
          );
        })}
      </ul>

      {/* User profile */}
      <UserButton />
    </div>
  );
};

export default Header;
