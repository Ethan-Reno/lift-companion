import React, { type ReactElement } from 'react';
import clsx from "clsx";
import { DIALOG_TYPES } from "./Dialog";

interface DialogOptions {
  title?: string;
  description?: string;
  content: ReactElement;
  submitAction: {
    copy: string;
    action: () => void;
  };
  closeAction: () => void;
}

export const deriveDialogOptions = (type: DIALOG_TYPES): DialogOptions => {
  switch (type) {
    case DIALOG_TYPES.NEW_WORKOUT:
      return {
        title: 'Start New Workout',
        description: 'Select which exercises to include in your workout',
        content: newWorkoutContent,
        submitAction: {
          copy: 'Start',
          action: () => console.log('submitted'),
        },
        closeAction: () => console.log('closed'),
      }
    default:
      return {
        title: 'Default',
        description: 'Default',
        content: newWorkoutContent,
        submitAction: {
          copy: 'Start',
          action: () => console.log('submitted'),
        },
        closeAction: () => console.log('default closed'),
      }
  }
}

const newWorkoutContent = (
  <form className="mt-2 space-y-2">
    <fieldset>
      {/* <legend>Choose your favorite monster</legend> */}
      <label
        htmlFor="firstName"
        className="text-xs font-medium text-gray-700 dark:text-gray-400"
      >
        First Name
      </label>
      <input
        id="firstName"
        type="text"
        placeholder="Tim"
        autoComplete="given-name"
        className={clsx(
          "mt-1 block w-full rounded-md",
          "text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-600",
          "border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800",
          "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
        )}
      />
    </fieldset>
    <fieldset>
      <label
        htmlFor="familyName"
        className="text-xs font-medium text-gray-700 dark:text-gray-400"
      >
        Family Name
      </label>
      <input
        id="familyName"
        type="text"
        placeholder="Cook"
        autoComplete="family-name"
        className={clsx(
          "mt-1 block w-full rounded-md",
          "text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-600",
          "border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800",
          "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
        )}
      />
    </fieldset>
  </form>
);