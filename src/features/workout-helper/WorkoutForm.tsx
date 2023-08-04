import React, { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CreateWorkoutInputs, WORKOUT_STATUS, createWorkoutSchema } from '../../schemas/WorkoutSchema';
import { Button, Dialog, Form, FormProvider, Separator, Tabs } from 'good-nice-ui';
import { SetsFormSection } from './SetsFormSection';
import { InsightsFormSection, SelectedInsights } from './InsightsFormSection';
import { Exercise } from '../../schemas/ExerciseSchema';
import { useStore } from '../../store/store';
import { api } from '../../utils/api';
import { Loader2 } from 'lucide-react';

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
    status: WORKOUT_STATUS.enum.started,
    sets: [{ reps: 0, value: 0, rpe: 1 }],
    insights: [{}],
  };
  // Use the existing form state if it exists, otherwise use the default values
  const initialFormState = workoutFormState[exercise.id] || { ...defaultFormValues, exerciseId: exercise.id };

  const [selectedInsights, setSelectedInsights] = useState<SelectedInsights>(initialFormState.insights[0] || {});

  const form = useForm<CreateWorkoutInputs>({
    resolver: zodResolver(createWorkoutSchema),
    defaultValues: initialFormState,
  });
  const values: CreateWorkoutInputs = form.watch();
  const onSubmit = () => {
    mutate(values);
  };
  const onError = (errors: any) => console.log(errors);

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
            <Tabs.Trigger className='w-1/2 p-3' value="insights">Insights</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className='w-full' value="sets">
            <SetsFormSection
              form={form}
              measurement={exercise.measurement}
            />
          </Tabs.Content>
          <Tabs.Content className='w-full' value="insights">
            <InsightsFormSection
              form={form}
              selectedInsights={selectedInsights}
              setSelectedInsights={setSelectedInsights}
            />
          </Tabs.Content>
          <div className='border-t w-full flex gap-2 p-2 justify-end'>
          <Dialog>
            <Dialog.Trigger asChild>
              <Button
                variant='outline'
                className="border-destructive"
                disabled={isLoading}
              >
                Clear Form
              </Button>
            </Dialog.Trigger>
          </Dialog>
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

          </div>
        </Tabs>
      </Form>
    </FormProvider>
  );
};
