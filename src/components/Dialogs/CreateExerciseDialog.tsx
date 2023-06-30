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
import { createExerciseSchema } from '../../schemas/ExerciseSchema';
import { api } from '../../utils/api';
import { Loader2 } from "lucide-react"
import { useStore } from '../../store/store';
import { useToast } from '../Toaster/useToast';

export const CreateExerciseDialog = () => {
  const { toast } = useToast();
  const [ isOpen, setIsOpen ] = useState(false);
  const { setShouldRefetch } = useStore();
  const [submittedValues, setSubmittedValues] = useState<z.infer<typeof createExerciseSchema> | null>(null);

  const { mutate, isLoading } = api.exercise.create.useMutation({
    onSettled: () => {
      setIsOpen(false);
      setShouldRefetch(true);
      setSubmittedValues(null);
    },
    onError: (error) => {
      toast({
        title: 'Error!',
        description: error.message,
        variant: 'destructive',
      })
    }
  });
  
  const CreateExerciseForm = () => {
    const form = useForm<z.infer<typeof createExerciseSchema>>({
      resolver: zodResolver(createExerciseSchema),
      defaultValues: submittedValues || {
        name: "",
        description: "",
        measurement: "weight",
      },
    });
    
    const onSubmit = (values: z.infer<typeof createExerciseSchema>) => {
      setSubmittedValues(values);
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
                <Form.Label>Name</Form.Label>
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
          <Form.Field
            control={form.control}
            name="measurement"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Measurement</Form.Label>
                <div className='flex items-center gap-2'>
                  <Select onValueChange={field.onChange} defaultValue="weight">
                    <Form.Control>
                      <Select.Trigger>
                        <Select.Value placeholder="Pick a measurement" />
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
                <Form.Message />
              </Form.Item>
            )}
          />
        </Form>
      </FormProvider>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button onClick={() => setIsOpen(true)}>Create New</Button>
      </Dialog.Trigger>
      <Dialog.Content className="sm:max-w-[425px]">
        <Dialog.Header>
          <Dialog.Title>Create Exercise</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-8">
          <CreateExerciseForm />
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
                <>Create</>
              )}
            </Button>
          </Dialog.Footer>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
