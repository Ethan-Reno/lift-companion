import React, { useState } from 'react';
import {
  Button,
  Dialog,
  Form,
  FormProvider,
  Input,
  Select,
} from 'good-nice-ui'; 
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Exercise, UpdateExerciseInputs, updateExerciseSchema, EXERCISE_STATUS, MEASUREMENT } from '../../schemas/ExerciseSchema';
import { api } from '../../utils/api';
import { Loader2 } from "lucide-react"
import { useStore } from '../../store/store';
import { useToast } from '../../hooks/useToast';

export interface UpdateExerciseDialogProps {
  data: Exercise;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UpdateExerciseDialog = ({
  data: {
    id,
    name,
    description,
    measurement,
    status,
  },
  setIsOpen,
}: UpdateExerciseDialogProps) => {
  const { toast } = useToast();
  const { setShouldRefetch } = useStore();
  const [ currentExercise, setCurrentExercise ] = useState({
    id,
    name,
    description,
    measurement,
  });

  const { mutate, isLoading } = api.exercise.update.useMutation({
    onSettled: () => {
      setIsOpen(false);
      setShouldRefetch(true);
      toast({
        variant: 'default',
        title: 'Success!',
        description: `"${name}" was updated successfully.`,
      })
    },
    onError: () => {
      // On error, revert back to original known data
      setCurrentExercise({
        id,
        name,
        description,
        measurement,
      });
      toast({
        title: 'Error!',
        description: `Something went wrong. "${name}" was not updated.`,
        variant: 'destructive',
      })
    },
  });
  
  const UpdateExerciseForm = () => {
    const form = useForm<UpdateExerciseInputs>({
      resolver: zodResolver(updateExerciseSchema),
      defaultValues: currentExercise,
    });
    
    const onSubmit = (values: UpdateExerciseInputs) => {
      // Optimistically update the form values
      setCurrentExercise(values);
      mutate(values);
    }
  
    return (
      <FormProvider {...form}>
        <Form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Form.Field
            control={form.control}
            name="name"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>
                  Name
                </Form.Label>
                <Form.Control>
                  <Input {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
          <Form.Field
            control={form.control}
            name="description"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Description</Form.Label>
                <Form.Control>
                  <Input {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
          {/* TODO: Only allow measurement editing on exercises without completed workouts */}
          <Form.Field
            control={form.control}
            name="measurement"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Measurement</Form.Label>
                <div className='flex items-center gap-2'>
                  <Select onValueChange={() => field.onChange} defaultValue={currentExercise.measurement}>
                    <Form.Control>
                      <Select.Trigger className='capitalize'>
                        <Select.Value/>
                      </Select.Trigger>
                    </Form.Control>
                    <Select.Content>
                      {Object.keys(MEASUREMENT.enum).map(measurement => (
                        <Select.Item key={measurement} value={measurement} className="capitalize">
                          {measurement}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select>
                  <span className="whitespace-nowrap">x Reps</span>
                </div>
                <Form.Message/>
              </Form.Item>
            )}
          />
          <Dialog.Footer className='gap-y-4'>
            <Button
              variant="secondary"
              type="button"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant='default'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                <>Update</>
              )}
            </Button>
          </Dialog.Footer>
        </Form>
      </FormProvider>
    );
  };

  return (
    <Dialog.Content className="sm:max-w-[425px]">
      <Dialog.Title>Update Exercise</Dialog.Title>
      {/* TODO prevent measurement updates on exercises with completed workouts */}
        <Dialog.Description>
          The measurement type can't be updated because this exercise already has saved data.
        </Dialog.Description>
      <UpdateExerciseForm />
    </Dialog.Content>
  );
};
