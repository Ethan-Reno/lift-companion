import React from 'react';
import DropdownMenu from './shared/DropdownMenu/DropdownMenu';
import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import {
  SunIcon,
  MoonIcon,
  LightningBoltIcon,
  ExitIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import { Button } from './ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import Image from 'next/image';
import logo from '../../public/barbell.png';
import { useSession } from 'next-auth/react';

const NavMenu = () => {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  const menuOptions = [
    {
      label: "Start Workout",
      action: () => console.log('start workout'),
      icon: <LightningBoltIcon className="mr-2 h-3.5 w-3.5" />,
      hasSeparator: true,
    },
    {
      label: "Change Theme",
      action: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
      icon: theme === 'dark'
        ? <MoonIcon className="mr-2 h-3.5 w-3.5"/>
        : <SunIcon className="mr-2 h-3.5 w-3.5" />,
      hasSeparator: false,
    },
    {
      label: "Logout",
      action: () => signOut(),
      icon: <ExitIcon className="mr-2 h-3.5 w-3.5" />,
      hasSeparator: false,
    },
  ];

  const triggerButton = (
    <Button variant="ghost">
      <Avatar>
        <AvatarImage src={session?.user.image as string} />
        <AvatarFallback>{session?.user.name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <ChevronDownIcon className="h-9 w-9 pl-2" />
    </Button>
  )

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
      { session &&
        <DropdownMenu
          menuOptions={menuOptions}
          triggerButton={triggerButton}
        />
      }
    </div>
  )
}

export default NavMenu;
