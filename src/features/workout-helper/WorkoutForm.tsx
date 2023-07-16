import React, { useState } from 'react';
import { api } from '../../utils/api';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CreateWorkoutInputs, createWorkoutSchema } from '../../schemas/WorkoutSchema';
import { Button, Form, FormProvider, Tabs, buttonVariants } from 'good-nice-ui';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { SetsFormSection } from './SetsFormSection';
import { InsightsFormSection, SelectedInsights } from './InsightsFormSection';
import { Exercise } from '../../schemas/ExerciseSchema';
import { cn } from '../../utils/cn';

interface WorkoutFormProps {
  exerciseData: Exercise;
}

export const WorkoutForm = ({exerciseData}: WorkoutFormProps) => {
  const router = useRouter();
  const { mutate, isLoading } = api.workout.create.useMutation({
    onSettled: () => {
      router.push('/');
    },
  });

  const form = useForm<CreateWorkoutInputs>({
    resolver: zodResolver(createWorkoutSchema),
    defaultValues: {
      exerciseId: exerciseData.id,
      status: 'started',
      sets: [{ reps: 0, value: 0, rpe: 0 }],
      insights: [{}],
    },
  });

  const [selectedInsights, setSelectedInsights] = useState<SelectedInsights>({});

  const onSubmit = (values: CreateWorkoutInputs) => {
    mutate(values);
  };
  const onError = (errors: any) => console.log(errors);

  return (
    <FormProvider {...form}>
      <Form
        className='flex flex-col gap-8 grow w-full items-center justify-center'
        id='Form'
        onSubmit={form.handleSubmit(onSubmit, onError)}
      >
        <Tabs
          className='flex flex-col items-center w-full border bg-surface sm:max-w-[450px] rounded-md'
          defaultValue="sets"
        >
          <Tabs.List className='w-full border-b'>
            <Tabs.Trigger className='w-1/2 p-3' value="sets">Sets</Tabs.Trigger>
            <Tabs.Trigger className='w-1/2 p-3' value="insights">Insights</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className='py-5 px-3 w-full' value="sets">
            <SetsFormSection
              form={form}
              measurement={exerciseData.measurement}
            />
          </Tabs.Content>
          <Tabs.Content className='py-5 px-3 w-full' value="insights">
            <InsightsFormSection
              form={form}
              selectedInsights={selectedInsights}
              setSelectedInsights={setSelectedInsights}
            />
          </Tabs.Content>
        </Tabs>
        <div className='flex justify-end gap-3'>
          <Button
            type="button"
            className='flex w-20 items-center justify-center'
            onClick={() => {
              form.setValue('status', 'completed');
              form.handleSubmit(onSubmit, onError)();
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              <>Finish</>
            )}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className='flex w-20 items-center justify-center'
            onClick={() => {
              form.setValue('status', 'started');
              form.handleSubmit(onSubmit, onError)();
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              <>Save</>
            )}
          </Button>
          <Link
            className={cn(buttonVariants({variant: 'outline'}), 'flex w-20 items-center justify-center')}
            href="/"
          >
            Exit
          </Link>
        </div>
      </Form>
    </FormProvider>
  );
};
