import React, { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CreateWorkoutInputs, createWorkoutSchema } from '../../schemas/WorkoutSchema';
import { Button, Form, FormProvider, Separator, Tabs, buttonVariants } from 'good-nice-ui';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { SetsFormSection } from './SetsFormSection';
import { InsightsFormSection, SelectedInsights } from './InsightsFormSection';
import { Exercise } from '../../schemas/ExerciseSchema';
import { useStore } from '../../store/store';
import { init } from 'next/dist/compiled/@vercel/og/satori';

interface WorkoutFormProps {
  exerciseData: Exercise;
  initialState: CreateWorkoutInputs;
}

export const WorkoutForm = ({ exerciseData, initialState }: WorkoutFormProps) => {
  const { setWorkoutFormState } = useStore();

  // Initialize the form with the default values
  const form = useForm<CreateWorkoutInputs>({
    resolver: zodResolver(createWorkoutSchema),
    defaultValues: initialState,
  });

  const [selectedInsights, setSelectedInsights] = useState<SelectedInsights>(initialState.insights[0] || {});

  const onSubmit = (values: CreateWorkoutInputs) => {
    setWorkoutFormState(values.exerciseId, values);
  };
  const onError = (errors: any) => console.log(errors);

  // When the exercise changes, submit the previous form values to the store
  useEffect(() => {
    return () => {
      // const values = form.getValues();
      // if (values.status !== 'completed') {
      //   form.setValue('status', 'started');
      // }
      onSubmit(form.getValues())
    };
  }, [exerciseData.id]);

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
        </Tabs>
        <div className='flex justify-center w-full sm:w-30'>
          <Button
            type="button"
            variant="secondary"
            className='flex items-center justify-center'
            onClick={() => {
              form.setValue('status', 'completed');
              form.handleSubmit(onSubmit, onError)();
            }}
          >
            Save
          </Button>
        </div>
      </Form>
    </FormProvider>
  );
};
