import React from 'react';
import { DropdownMenu, Avatar } from 'good-nice-ui';
import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import {
  SunIcon,
  MoonIcon,
  ExitIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import Image from 'next/image';
import logo from '../../public/barbell.png';
import { useSession } from 'next-auth/react';

const NavMenu = () => {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  return (
    <div className="flex p-6 justify-between items-center">
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
          <DropdownMenu.Trigger
            asChild
          >
            <div className="flex">
              <Avatar>
                <Avatar.Image src={session?.user.image as string} alt='alt'/>
                <Avatar.Fallback>{session?.user.name?.charAt(0) as string}</Avatar.Fallback>
              </Avatar>
              <ChevronDownIcon className="h-9 w-9 pl-2" />
            </div>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item
              onSelect={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
              <span className="pl-2">Theme</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onSelect={() => signOut()}
            >
              <ExitIcon />
              <span className="pl-2">Logout</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      }
    </div>
  );
};

export default NavMenu;
