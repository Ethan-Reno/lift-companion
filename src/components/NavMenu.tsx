import React from 'react';
import {
  DropdownMenu,
  Button,
  Avatar,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  AvatarFallback,
  AvatarImage,
} from 'lift-companion-ui';
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
          <DropdownMenuTrigger
            asChild
          >
            <div className="flex">
              <Avatar>
                <AvatarImage src={session?.user.image as string} alt='alt'/>
                <AvatarFallback>{session?.user.name?.charAt(0) as string}</AvatarFallback>
              </Avatar>
              <ChevronDownIcon className="h-9 w-9 pl-2" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onSelect={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
              <span className="pl-2">Theme</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => signOut()}
            >
              <ExitIcon />
              <span className="pl-2">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      }
    </div>
  );
};

export default NavMenu;
