import React, { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CreateWorkoutInputs, createWorkoutSchema } from '../../schemas/WorkoutSchema';
import { Button, Dialog, Form, FormProvider, Separator, Tabs } from 'good-nice-ui';
import { SetsFormSection } from './SetsFormSection';
import { Exercise } from '../../schemas/ExerciseSchema';
import { useStore } from '../../store/store';
import { api } from '../../utils/api';
import { Loader2 } from 'lucide-react';
import { MetricsFormSection } from './MetricsFormSection';

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
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);

  // Define default values for the workout form
  const defaultFormValues = {
    sets: [{ reps: 0, value: 0, rpe: 1 }],
    workoutMetrics: [],
  };
  // Use the existing form state if it exists, otherwise use the default values
  const initialFormState = workoutFormState[exercise.id] || { ...defaultFormValues, exerciseId: exercise.id };

  const form = useForm<CreateWorkoutInputs>({
    resolver: zodResolver(createWorkoutSchema),
    defaultValues: initialFormState,
  });
  const values: CreateWorkoutInputs = form.watch();
  console.log(values);
  const onSubmit = () => {
    mutate(values);
  };
  const onError = (errors: any) => console.log('errors:',errors);

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
              // clearSetValues={}
            />
          </Tabs.Content>
          <Tabs.Content className='w-full' value="metrics">
            <MetricsFormSection
              form={form}
            />
          </Tabs.Content>
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
              <>Submit</>
            )}
          </Button>
          {/* <div className='border-t w-full flex gap-2 p-2 justify-end'>
            <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
              <Dialog.Trigger asChild>
                <Button
                  variant='secondary'
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
              </Dialog.Trigger>
              <Dialog.Content className='bg-background'>
                <Dialog.Title>Submit Workout</Dialog.Title>
                <Dialog.Description>
                  Are you sure you want to submit this workout?
                </Dialog.Description>
                <Dialog.Footer className="gap-y-4">
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => setIsSubmitDialogOpen(false)}
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
                      <>Submit</>
                    )}
                  </Button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog>
          </div> */}
        </Tabs>
      </Form>
    </FormProvider>
  );
};
