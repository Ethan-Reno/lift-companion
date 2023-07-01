import React from 'react';
import { DropdownMenu, Avatar, Button, ChevronDownIcon } from 'good-nice-ui';
import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import logo from '../../public/barbell.png';
import { useSession } from 'next-auth/react';
import { LogOut, Moon, Sun } from 'lucide-react';

export const NavMenu = () => {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  return (
    <div className="flex p-6 justify-between items-center border-b">
      <div className="flex items-center mr-4 gap-3 align-middle">
        <Image 
          src={logo}
          alt="logo"
          width={32}
          height={32}
          priority
        />
        <h1 className="text-lg font-medium">Lift Companion</h1>
      </div>
      {session &&
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <Button
              variant="ghost"
              className='flex items-center gap-2 hover:bg-transparent'
            >
              <Avatar>
                <Avatar.Image src={session?.user.image as string} alt='alt'/>
                <Avatar.Fallback>{session?.user.name?.charAt(0) as string}</Avatar.Fallback>
              </Avatar>
              <ChevronDownIcon size={36} className="pr-2" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item
              onSelect={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Moon className="pr-2"/> : <Sun className="pr-2"/>}
              Theme
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onSelect={() => signOut()}
            >
              <LogOut className="pr-2" />
              Logout
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      }
    </div>
  );
};
