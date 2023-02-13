import React, { type ReactElement } from 'react';
import clsx from "clsx";
import { DIALOG_TYPES } from "./Dialog";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Close } from '@radix-ui/react-dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../Button/Button';
// import { type CreateExerciseInputs, createExerciseSchema } from '../../../server/api/routers/exercise';
import { FormInput } from '../FormInput/FormInput';
import { z, type TypeOf } from 'zod';


interface DialogOptions {
  title?: string;
  description?: string;
  content: ReactElement;
  submitAction: {
    copy: string;
    action?: () => void;
  };
  closeAction?: () => void;
}

export const createExerciseSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }).min(1),
  primaryUnit: z.string({
    required_error: "primaryUnit is required",
    invalid_type_error: "primaryUnit must be a string",
  }).min(1),
  secondaryUnit: z.string({
    required_error: "secondaryUnit is required",
    invalid_type_error: "secondaryUnit must be a string",
  }).min(1)
})

export type CreateExerciseInputs = TypeOf<typeof createExerciseSchema>;

export const deriveDialogOptions = (type: DIALOG_TYPES): DialogOptions => {
  switch (type) {
    case DIALOG_TYPES.NEW_WORKOUT:
      return {
        title: 'Start New Workout',
        description: 'Select which exercises to include in your workout',
        content: <CreateExerciseForm />,
        submitAction: {
          copy: 'Start',
        },
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

const CreateExerciseForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<CreateExerciseInputs>(
    {
      resolver: zodResolver(createExerciseSchema),
    }
  );
  const onSubmit: SubmitHandler<CreateExerciseInputs> = data => console.log(data);

  return (
    <form className="flex flex-col h-full gap-10 w-80" onSubmit={handleSubmit(onSubmit)}>
      <FormInput register={register} field='name' label='Name' error={errors.name?.message} />
      <FormInput register={register} field='primaryUnit' label='Primary Unit' error={errors.primaryUnit?.message} />
      <FormInput register={register} field='secondaryUnit' label='Secondary Unit' error={errors.secondaryUnit?.message} />
      <div className="mt-4 flex justify-end">
        <Close asChild>
          <Button
            type='submit'
            onClick={() => console.log(errors)}
          >
            Create
          </Button>
        </Close>
      </div>
    </form>
  )
};

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