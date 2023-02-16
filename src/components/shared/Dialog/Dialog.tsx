import { Transition } from "@headlessui/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { clsx } from "clsx";
import React, { Fragment, useState } from "react";
import { Button } from "../../ui/Button";
import { deriveDialogContent } from "./DialogContent";

export enum DIALOG_TYPES {
  CREATE_EXERCISE = 'createExercise',
  TEST_ENUM = 'testEnum',
}

export enum DIALOG_CONTENT_TYPES {
  FORM = 'form'
}

interface DialogProps {
  triggerButton?: React.ReactElement;
  type: DIALOG_TYPES;
}

const Dialog = ({ triggerButton, type }: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    title,
    description,
    content,
  } = deriveDialogContent(type, setIsOpen);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        {triggerButton || <Button variant='link'>Click</Button>}
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal forceMount>
        <Transition.Root show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPrimitive.Overlay
              forceMount
              className="fixed inset-0 z-20 bg-black/50"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPrimitive.Content
              forceMount
              className={clsx(
                "fixed z-50",
                "w-[95vw] max-w-md rounded-lg p-6 md:w-full",
                "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
                "bg-white dark:bg-zinc-800",
                "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
              )}
            >
              {title && 
                <DialogPrimitive.Title className="text-m font-bold text-zinc-900 dark:text-zinc-100">
                  {title}
                </DialogPrimitive.Title>
              }
              {description &&
                <DialogPrimitive.Description className="mt-2 text-m text-zinc-700 dark:text-zinc-400">
                  {description}
                </DialogPrimitive.Description>
              }
              {content}
              <DialogPrimitive.Close
                className={clsx(
                  "absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1",
                  "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                )}
              >
                <Cross1Icon className="h-4 w-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-500" />
              </DialogPrimitive.Close>
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Dialog;
