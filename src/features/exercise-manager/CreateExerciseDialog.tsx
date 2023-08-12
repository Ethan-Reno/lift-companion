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
import { CreateExerciseInputs, MEASUREMENT, createExerciseSchema } from '../../schemas/ExerciseSchema';
import { api } from '../../utils/api';
import { Loader2 } from "lucide-react"
import { useStore } from '../../store/store';
import { useToast } from '../../hooks/useToast';

export const CreateExerciseDialog = () => {
  const { toast } = useToast();
  const [ isOpen, setIsOpen ] = useState(false);
  const { setShouldRefetch } = useStore();
  const [submittedValues, setSubmittedValues] = useState<CreateExerciseInputs | null>(null);

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
    const form = useForm<CreateExerciseInputs>({
      resolver: zodResolver(createExerciseSchema),
      defaultValues: submittedValues || {
        name: "",
        description: "",
        measurement: MEASUREMENT.enum.weight,
        // status is handled at the RPC level for now
      },
    });
    
    const onSubmit = (values: CreateExerciseInputs) => {
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
                  <Select onValueChange={() => field.onChange} defaultValue={MEASUREMENT.enum.weight}>
                    <Form.Control>
                      <Select.Trigger className='capitalize'>
                        <Select.Value />
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
                <Form.Message />
              </Form.Item>
            )}
          />
          <Dialog.Footer className="gap-y-4">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
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
        <Dialog.Title>
          Create Exercise
        </Dialog.Title>
        <CreateExerciseForm />
      </Dialog.Content>
    </Dialog>
  );
};
