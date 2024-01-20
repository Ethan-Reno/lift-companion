'use client';

import React, { useEffect, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { type CreateWorkoutInputs, createWorkoutSchema } from '../../schemas/WorkoutSchema';
import { Button, Form, Separator, Tabs } from 'good-nice-ui';
import { SetsFormSection } from './SetsFormSection';
import { type Exercise } from '../../schemas/ExerciseSchema';
import { useStore } from '../../store/store';
import { api } from '../../utils/api';
import { Loader2 } from 'lucide-react';
import { MetricsFormSection } from './MetricsFormSection';
import { calculateAll1rm } from '../../utils/calculate1rm';

interface WorkoutFormProps {
  exercise: Exercise;
}

export const WorkoutForm = ({ exercise }: WorkoutFormProps) => {
  const {
    workoutFormState,
    setWorkoutFormState,
    selectedExercises,
    setSelectedExercises
  } = useStore();
  const { mutate, isLoading } = api.workout.create.useMutation({
    onSuccess: (data, variables) => {
      setWorkoutFormState((prevState) => {
        const { [variables.exerciseId]: removed, ...rest } = prevState;
        return rest;
      });
      setSelectedExercises(selectedExercises.filter(exercise => exercise.id !== variables.exerciseId));
    },
  });
  const { data: metrics } = api.metric.getAll.useQuery();

  // Define default values for the workout form
  const defaultFormValues = {
    sets: [{ 
      reps: 0,
      value: 0,
      rpe: 1,
      epley1rm: 0,
      brzycki1rm: 0,
      wathen1rm: 0,
    }],
    workoutMetrics: [],
  };
  // Use the existing form state if it exists, otherwise use the default values
  const initialFormState = workoutFormState[exercise.id] || { ...defaultFormValues, exerciseId: exercise.id };

  const form = useForm<CreateWorkoutInputs>({
    resolver: zodResolver(createWorkoutSchema),
    defaultValues: initialFormState,
  });

  const values: CreateWorkoutInputs = form.watch();
  const onSubmit = () => {
    // Calculate 1RMs for each set
    const sets = values.sets.map((set) => {
      const { wathen1rm, epley1rm, brzycki1rm } = calculateAll1rm(set.value, set.reps);
      return { 
        ...set, 
        wathen1rm,
        epley1rm,
        brzycki1rm,
      };
    });
    const updatedValues = { ...values, sets };
    mutate(updatedValues);
  };
  const onError = (errors: any) => console.log('errors:', errors);
  
  // Save a copy of the form's current values in a ref
  const prevValues = useRef(values);
  // Only update the form state when the form values have actually changed
  useEffect(() => {
    if (JSON.stringify(prevValues.current) !== JSON.stringify(values)) {
      setWorkoutFormState((prevState) => {
        return {
          ...prevState,
          [values.exerciseId]: values  // update the state for this exerciseId
        }
      });
      prevValues.current = values;
    }
  }, [values]);

  return (
    <FormProvider {...form}>
      <Form
        className='flex flex-col gap-8 grow w-full items-center justify-center'
        id='Form'
        onSubmit={form.handleSubmit(onSubmit, onError)}
      >
        <Tabs
          className='flex flex-col items-center w-full border sm:max-w-[450px] rounded-md'
          defaultValue="sets"
        >
          <Tabs.List className='w-full border-b bg-surface rounded-t-md'>
            <Tabs.Trigger className='w-1/2 p-3' value="sets">Sets</Tabs.Trigger>
            <Separator className='h-12 bg-border' orientation="vertical"/>
            <Tabs.Trigger className='w-1/2 p-3' value="metrics">Metrics</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className='w-full' value="sets">
            <SetsFormSection
              form={form}
              measurement={exercise.measurement}
            />
          </Tabs.Content>
          <Tabs.Content className='w-full' value="metrics">
            {metrics && (
              <MetricsFormSection
                form={form}
                metrics={metrics}
              />
            )}
          </Tabs.Content>
          <div className='border-t p-3 flex w-full'>
            <Button
              type='submit'
              variant='secondary'
              className='self-end'
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                <>Submit</>
              )}
            </Button>
          </div>
        </Tabs>
      </Form>
    </FormProvider>
  );
};
