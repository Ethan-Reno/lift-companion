import React, { useState } from 'react';
import { api } from '../../utils/api';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CreateWorkoutInputs, WorkoutStatusEnum, createWorkoutSchema } from '../../schemas/WorkoutSchema';
import { Button, Form, FormProvider, buttonVariants } from 'good-nice-ui';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { SetsFormSection } from './SetsFormSection';
import { InsightsFormSection } from './InsightsFormSection';
import { Exercise } from '../../schemas/ExerciseSchema';

interface WorkoutFormProps {
  exerciseData: Exercise;
}

export const WorkoutForm = ({exerciseData}: WorkoutFormProps) => {
  const router = useRouter();
  const [status, setStatus] = useState<WorkoutStatusEnum>('started');
  const { mutate, isLoading } = api.workout.create.useMutation({
    onSettled: () => {
      router.push('/');
    },
  });

  const form = useForm<CreateWorkoutInputs>({
    resolver: zodResolver(createWorkoutSchema),
    defaultValues: {
      exerciseId: exerciseData.id,
      status: status,
      sets: [{ reps: 0, value: 0, rpe: 0 }],
      insights: {},
    },
  });

  const onSubmit = (values: CreateWorkoutInputs) => {
    mutate(values);
  };
  const onError = (errors: any) => console.log(errors);

  return (
    <FormProvider {...form}>
      <Form
        className='flex flex-col gap-16'
        id='Form'
        onSubmit={form.handleSubmit(onSubmit, onError)}
      >
        <div className='flex gap-16' id='set+insight'>
          <SetsFormSection
            form={form}
            measurement={exerciseData.measurement}
          />
          <InsightsFormSection form={form} />
        </div>
        <div className='flex justify-end gap-3'>
          <Button
            type="submit"
            onClick={() => setStatus('completed')}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              <>Finish</>
            )}
          </Button>
          <Button
            variant="secondary"
            onClick={() => setStatus('started')}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              <>Save</>
            )}
          </Button>
          <Link
            className={buttonVariants({variant: 'outline'})}
            href="/"
          >
            Exit
          </Link>
        </div>
      </Form>
    </FormProvider>
  );
};
