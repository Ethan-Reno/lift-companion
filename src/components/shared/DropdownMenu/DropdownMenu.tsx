import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { clsx } from "clsx";
import React, { type ReactNode } from "react";
import Button from "../Button/Button";

interface DropdownMenuItem {
  label: string;
  action: () => void;
  shortcut?: string;
  icon?: ReactNode;
  hasSeparator?: boolean;
}

interface DropdownMenuProps {
  triggerButton?: React.ReactElement;
  menuOptions: DropdownMenuItem[];
}

const DropdownMenu = ({ triggerButton, menuOptions }: DropdownMenuProps) => {
  return (
    <div className="relative inline-block text-left">
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger asChild>
          {triggerButton || <Button>Click</Button>}
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            align="end"
            sideOffset={5}
            className={clsx(
              "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
              "w-fit rounded-lg px-2 py-2 shadow-md",
              "bg-white dark:bg-neutral-800"
            )}
          >
            {menuOptions.map(({ label, icon, hasSeparator, action }, i) => (
              <React.Fragment key={`${label}-${i}`}>
                <DropdownMenuPrimitive.Item
                  key={`${label}-${i}`}
                  className={clsx(
                    "flex cursor-default select-none items-center rounded-md px-3 py-3 text-m outline-none",
                    "text-neutral-400 focus:bg-neutral-50 dark:text-neutral-500 dark:focus:bg-neutral-900"
                  )}
                  onClick={action}
                >
                  {icon}
                  <span className="flex-grow text-neutral-700 dark:text-neutral-300">
                    {label}
                  </span>
                </DropdownMenuPrimitive.Item>
                {hasSeparator &&
                  <DropdownMenuPrimitive.Separator className="my-1 h-px bg-neutral-200 dark:bg-neutral-700" />
                }
              </React.Fragment>
            ))}

          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </div>
  );
};

export default DropdownMenu;
