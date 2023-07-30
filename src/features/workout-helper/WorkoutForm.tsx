import React, { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CreateWorkoutInputs, createWorkoutSchema } from '../../schemas/WorkoutSchema';
import { Button, Form, FormProvider, Separator, Tabs } from 'good-nice-ui';
import { SetsFormSection } from './SetsFormSection';
import { InsightsFormSection, SelectedInsights } from './InsightsFormSection';
import { Exercise } from '../../schemas/ExerciseSchema';
import { useStore } from '../../store/store';
import { api } from '../../utils/api';
import { Loader2 } from 'lucide-react';

interface WorkoutFormProps {
  exerciseData: Exercise;
  initialState: CreateWorkoutInputs;
}

export const WorkoutForm = ({
  exerciseData,
  initialState,
}: WorkoutFormProps) => {
  const { setWorkoutFormState, clearWorkoutFormStateForId } = useStore();
  const { mutate, isLoading } = api.workout.create.useMutation({
    onSuccess: (data, variables) => {
      clearWorkoutFormStateForId(variables.exerciseId);
    },
  });
  const [selectedInsights, setSelectedInsights] = useState<SelectedInsights>(initialState.insights[0] || {});

  const form = useForm<CreateWorkoutInputs>({
    resolver: zodResolver(createWorkoutSchema),
    defaultValues: initialState,
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
      setWorkoutFormState(values.exerciseId, values);
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
              measurement={exerciseData.measurement}
            />
          </Tabs.Content>
          <Tabs.Content className='w-full' value="insights">
            <InsightsFormSection
              form={form}
              selectedInsights={selectedInsights}
              setSelectedInsights={setSelectedInsights}
            />
          </Tabs.Content>
          <div>
          <Button
              variant='secondary'
              type='submit'
              disabled={isLoading}
              className='mb-6'
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
