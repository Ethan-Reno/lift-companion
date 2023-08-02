import React, { useState } from 'react';
import { Avatar, Button, ChevronDownIcon, DropdownMenu, Separator, Sheet, XIcon } from 'good-nice-ui';
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { Dumbbell, LogOut, Menu, Moon, Settings, Sun } from 'lucide-react';
import logo from '../../public/barbell.png';
import { cn } from '../utils/cn';
import { useRouter } from 'next/router';

export const NavMenu = () => {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const router = useRouter();
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);
  const mobileMenuOverlay = (
    <div className='fixed top-16 left-0 w-screen h-screen bg-background z-50'>
      <div className="flex flex-col gap-8 text-2xl items-center pt-8">
        <Link href='/' onClick={() => setIsMenuOpen(false)}>
          Dashboard
        </Link>
        <Link href='/exercises' onClick={() => setIsMenuOpen(false)}>
          Exercises
        </Link>
        <Link
          href='/exercises'
          onClick={() => {setIsMenuOpen(false)}}
        >
          Start Workout
        </Link>
        <div className="pointer-events-none text-muted">
          View Data
        </div>
        <Separator className="w-2/3" />
        <div onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          Change Theme
        </div>
        <div className="pointer-events-none text-muted">
          Settings
        </div>
        <div onClick={() => signOut()}>
          Logout
        </div>
      </div>
    </div>
  );

  return (
    <div className='mx-auto px-4 w-full max-w-5xl flex h-14 items-center justify-between'>
      <Link href="/" className='flex gap-4 items-center'>
        {/* <Image
          src={logo}
          alt="logo"
          className='w-8 h-8'
          priority
        /> */}
        <Dumbbell className='h-8 w-8 text-blue-500 border border-muted-foreground rounded-full p-1' />
        Lift Companion
      </Link>
      {session &&
        <>
          <div className='sm:hidden'>
            <Button variant="outline" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <XIcon size={20} /> : <Menu className='h-5 w-5' />}
            </Button>
            {isMenuOpen && mobileMenuOverlay}
          </div>
          <div className='max-sm:hidden'>
            <div className="flex items-center gap-8">
              <Link
                className={cn(
                  'text-lowContrast-foreground hover:text-foreground text-sm transition-colors',
                  router.pathname === '/' && 'text-foreground underline'
                )}
                href='/'
              >
                Dashboard
              </Link>
              <Link
                className={cn(
                  'text-lowContrast-foreground hover:text-foreground text-sm transition-colors',
                  router.pathname === '/exercises' && 'text-foreground underline'
                )}
                href='/exercises'
              >
                Exercises
              </Link>
              <Link
                className={cn(
                  'text-lowContrast-foreground hover:text-foreground text-sm transition-colors',
                  router.pathname === '/workout' && 'text-foreground underline'
                )}
                href='/workout'
                onClick={() => {setIsMenuOpen(false)}}
              >
                Workout
              </Link>
              <DropdownMenu>
                <DropdownMenu.Trigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      'flex items-center border border-transparent gap-2 hover:bg-surface p-1',
                      'data-[state=open]:bg-surface data-[state=open]:border-border',
                      '[&>svg]:rotate-0 [&>svg]:transition-transform [&>svg]:data-[state=open]:rotate-180 [&>svg]:data-[state=open]:transition-transform'
                    )}
                  >
                    <Avatar className='h-8 w-8 ml-1'>
                      <Avatar.Image src={session?.user.image as string} alt='alt'/>
                      <Avatar.Fallback>{session?.user.name?.charAt(0) as string}</Avatar.Fallback>
                    </Avatar>
                    <ChevronDownIcon size={32} strokeWidth={1}/>
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content className="min-w-fit" align='end'>
                  <DropdownMenu.Label className="text-lowContrast-foreground">Menu</DropdownMenu.Label>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item className='p-2' onSelect={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                    {theme === 'dark' ? <Moon className="pr-2"/> : <Sun className="pr-2"/>}
                    Theme
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className='p-2'>
                    <Settings className="pr-2" />
                    Settings
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className='p-2' onSelect={() => signOut()}>
                    <LogOut className="pr-2" />
                    Logout
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu>
            </div>
          </div>
        </>
      }
    </div>
  );
};
