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
import { type z } from 'zod';
import { ExerciseSchema, updateExerciseSchema } from '../../schemas/ExerciseSchema';
import { api } from '../../utils/api';
import { Loader2 } from "lucide-react"
import { useStore } from '../../store/store';
import { useToast } from '../Toaster/useToast';

export interface UpdateExerciseDialogProps {
  data: ExerciseSchema;
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
      // On error, revert back to original data
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
    const form = useForm<z.infer<typeof updateExerciseSchema>>({
      resolver: zodResolver(updateExerciseSchema),
      defaultValues: currentExercise,
    });
    
    const onSubmit = (values: z.infer<typeof updateExerciseSchema>) => {
      // Optimistically update the current exercise
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
          {status === 'inactive' && (
            <Form.Field
              control={form.control}
              name="measurement"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Measurement</Form.Label>
                  <div className='flex items-center gap-2'>
                    <Select onValueChange={field.onChange} defaultValue={currentExercise.measurement}>
                      <Form.Control>
                        <Select.Trigger>
                          <Select.Value/>
                        </Select.Trigger>
                      </Form.Control>
                      <Select.Content>
                        <Select.Item value="weight">Weight</Select.Item>
                        <Select.Item value="distance">Distance</Select.Item>
                        <Select.Item value="time">Time</Select.Item>
                      </Select.Content>
                    </Select>
                    <span className="whitespace-nowrap">x Reps</span>
                  </div>
                  <Form.Message/>
                </Form.Item>
              )}
            />
          )}
          <Dialog.Footer>
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
      <Dialog.Header>
        <Dialog.Title>Update Exercise</Dialog.Title>
      </Dialog.Header>
      {status !== 'inactive' && (
        <Dialog.Description>
          The measurement type can't be updated because this exercise already has saved data.
        </Dialog.Description>
      )}
      <div className="grid gap-4 py-4">
        <UpdateExerciseForm />
      </div>
    </Dialog.Content>
  );
};