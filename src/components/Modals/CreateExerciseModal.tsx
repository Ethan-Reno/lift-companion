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

export const CreateExerciseModal = () => {
  const [ isOpen, setIsOpen ] = useState(false);

  const createExercise = api.exercise.create.useMutation({
    onMutate: () => console.log('mutating'),
    onSettled: () => {setIsOpen(false)},
  });
  
  const CreateExerciseForm = () => {
    const form = useForm<z.infer<typeof createExerciseSchema>>({
      resolver: zodResolver(createExerciseSchema),
      defaultValues: {
        name: "",
        description: "",
        measurement: "Weight",
        unit: "Pound",
      },
    });
    
    const onSubmit = (values: z.infer<typeof createExerciseSchema>) => {
      createExercise.mutate(values);
    }
  
    return (
      <FormProvider {...form}>
        <Form>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    <Select onValueChange={field.onChange} defaultValue="Weight">
                      <Form.Control>
                        <Select.Trigger>
                          <Select.Value placeholder="Pick a measurement" />
                        </Select.Trigger>
                      </Form.Control>
                      <Select.Content>
                        <Select.Item value="Weight">Weight</Select.Item>
                        <Select.Item value="Distance">Distance</Select.Item>
                        <Select.Item value="Time">Time</Select.Item>
                      </Select.Content>
                    </Select>
                    <span className="whitespace-nowrap">x Reps</span>
                  </div>
                  <Form.Message />
                </Form.Item>
              )}
            />
            {/* TODO: Refactor to display only units for selected measurement */}
            <Form.Field
              control={form.control}
              name="unit"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Unit</Form.Label>
                    <Select onValueChange={field.onChange} defaultValue="Pound">
                      <Form.Control>
                        <Select.Trigger>
                          <Select.Value placeholder="Pick a unit" />
                        </Select.Trigger>
                      </Form.Control>
                      <Select.Content>
                        <Select.Item value="Pound">Pound</Select.Item>
                        <Select.Item value="Kilogram">Kilogram</Select.Item>
                        <Select.Item value="Meter">Meter</Select.Item>
                        <Select.Item value="Mile">Mile</Select.Item>
                        <Select.Item value="Kilometer">Kilometer</Select.Item>
                        <Select.Item value="Second">Second</Select.Item>
                        <Select.Item value="Minute">Minute</Select.Item>
                        <Select.Item value="Hour">Hour</Select.Item>
                      </Select.Content>
                    </Select>
                  <Form.Message />
                </Form.Item>
              )}
            />
            <Button
              variant='primary'
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
            </Button>
          </form>
        </Form>
      </FormProvider>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button onClick={() => setIsOpen(true)}>Create Exercise</Button>
      </Dialog.Trigger>
      <Dialog.Content className="sm:max-w-[425px]">
        <Dialog.Header>
          <Dialog.Title>Create Exercise</Dialog.Title>
        </Dialog.Header>
        <div className="grid gap-4 py-4">
          <CreateExerciseForm />
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
