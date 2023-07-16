import React from 'react';
import { Button, Separator } from 'good-nice-ui';
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { LogOut, Moon, Sun } from 'lucide-react';
import logo from '../../public/barbell.png';

export const NavMenu = () => {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  return (
    <div className='mx-auto px-4 w-full max-w-5xl flex h-14 items-center justify-between'>
      <Link href="/">
        <Image
          src={logo}
          alt="logo"
          className='w-8 h-8'
          priority
        />
      </Link>
      {session &&
        <>
          <div className='max-sm:hidden'>
            <div className='flex w-full justify-between gap-8 items-center'>
              <Link className='text-muted-foreground hover:text-foreground text-sm' href='/exercises'>Exercises</Link>
              <Separator className="h-5" orientation='vertical'/>
              <div className='flex gap-2'>
                <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                  {theme === 'light' ? <Moon className='h-5 w-5' /> : <Sun className='h-5 w-5' />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => signOut()}>
                  <LogOut className='h-5 w-5' />
                </Button>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
};
