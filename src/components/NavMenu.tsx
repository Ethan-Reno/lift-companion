import React from 'react';
import {
  DropdownMenu,
  Button,
  Avatar,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
    <div className="flex p-2 justify-between">
      <div className="flex items-center py-2 mx-2 gap-3 align-middle">
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
          <DropdownMenuTrigger>
            <Button>
              <>
                <Avatar>
                  <AvatarImage src={session?.user.image as string} alt='alt'/>
                  <AvatarFallback>{session?.user.name?.charAt(0) as string}</AvatarFallback>
                </Avatar>
                <ChevronDownIcon className="h-9 w-9 pl-2" />
              </>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
              <span>Theme</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => signOut()}
            >
              <ExitIcon />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      }
    </div>
  );
};

export default NavMenu;
