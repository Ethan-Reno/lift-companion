import React, { type Dispatch, type SetStateAction } from 'react';
import clsx from "clsx";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z, type TypeOf } from 'zod';
import { api } from '../../utils/api';
import { FormInput } from '../shared/FormInput/FormInput';
import { Loader2 } from "lucide-react"


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

interface CreateExerciseFormProps {
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export const CreateExerciseForm = ({ setIsDialogOpen }: CreateExerciseFormProps) => {
  const createExercise = api.exercise.create.useMutation({
    onMutate: () => console.log('mutating'),
    onSettled: () => {setIsDialogOpen(false)},
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateExerciseInputs>(
    {
      resolver: zodResolver(createExerciseSchema),
    }
  );
  const onSubmit: SubmitHandler<CreateExerciseInputs> = data => 
    createExercise.mutate(data);

  return (
    <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
      <FormInput register={register} field='name' label='Name' error={errors.name?.message} />
      <FormInput register={register} field='primaryUnit' label='Primary Unit' error={errors.primaryUnit?.message} />
      <FormInput register={register} field='secondaryUnit' label='Secondary Unit' error={errors.secondaryUnit?.message} />
      <div className="mt-4 flex justify-end">
        {/* <Button
          type='submit'
          disabled={createExercise.isLoading}
        >
          {createExercise.isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </>
          ) : (
            <>Create</>
          )}
        </Button> */}
      </div>
    </form>
  )
};