import React from 'react';
import {
  DropdownMenu,
  Button,
  Avatar,
} from 'lift-companion-ui';
import { type DropdownMenuItemGroup } from 'lift-companion-ui/dist/components/DropdownMenu/types';
import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import {
  SunIcon,
  MoonIcon,
  LightningBoltIcon,
  ExitIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import Image from 'next/image';
import logo from '../../public/barbell.png';
import { useSession } from 'next-auth/react';

const NavMenu = () => {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  const menuOptions: DropdownMenuItemGroup[] = [
    {
      type: 'default',
      items: [
        {
          children: "Start Workout",
          onSelect: () => console.log('start workout'),
          hasSeparator: true,
        },
        {
          children: "Change Theme",
          onSelect: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
          hasSeparator: false,
        },
        {
          children: "Logout",
          onSelect: () => signOut(),
          hasSeparator: false,
        },
      ]
    }
  ];

  const triggerButton = (
    <Button variant="ghost">
      <>
        <Avatar 
          src={session?.user.image as string}
          fallback={session?.user.name?.charAt(0) as string}
          alt='alt'
        />
        <ChevronDownIcon className="h-9 w-9 pl-2" />
      </>
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
      {session &&
        <DropdownMenu
          groupedMenuItems={menuOptions}
          trigger={triggerButton}
          contentProps={{
            align: 'end'
          }}
        />
      }
    </div>
  )
}

export default NavMenu;
