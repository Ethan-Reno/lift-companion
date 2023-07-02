import React, { useState } from 'react';
import { api } from '../../utils/api';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { createWorkoutSchema } from '../../schemas/WorkoutSchema';
import { Button, DropdownMenu, Form, FormProvider, Input, Select, XIcon, buttonVariants } from 'good-nice-ui';
import { Loader2, PlusIcon } from 'lucide-react';
import { Header } from '../../components';
import Link from 'next/link';

const Workout = () => {
  const router = useRouter();
  const exerciseId = router.query.id as string;
  const [status, setStatus] = useState<'active' | 'completed'>('active');

  const { data: exercise, isLoading } = api.exercise.getById.useQuery(exerciseId);
  const createWorkout = api.workout.create.useMutation({
    onSettled: () => {
      router.push('/');
    },
  });

  const form = useForm<z.infer<typeof createWorkoutSchema>>({
    resolver: zodResolver(createWorkoutSchema),
    defaultValues: {
      exerciseId: exerciseId,
      status: status,
      sets: [{ reps: 0, value: 0, rpe: 0 }],
      insights: {},
    },
  });

  const onSubmit = (values: z.infer<typeof createWorkoutSchema>) => {
    createWorkout.mutate(values);
  };

  const onError = (errors: any) => console.log(errors);

  const setsFieldArray = useFieldArray({
    control: form.control,
    name: 'sets',
  });

  const insights = ['mood', 'sleepQuality', 'energyLevel', 'warmupQuality'];
  const [selectedInsights, setSelectedInsights] = useState<string[]>([]);

  const toggleInsight = (insight: string) => {
    setSelectedInsights(prev => {
      if (prev.includes(insight)) {
        form.setValue(`insights.${insight}` as any, undefined);
        return prev.filter(i => i !== insight);
      } else {
        form.setValue(`insights.${insight}` as any, 'average');
        return [...prev, insight];
      }
    });
  };

  return (
    <div className='flex flex-col gap-16' id='page'>
      <div className='flex gap-6 items-center' id='header'>
        <Header
          isLoading={isLoading}
          header={`${exercise?.name} Workout`}
        />
      </div>
        <FormProvider {...form}>
          <Form
            className='flex flex-col gap-16'
            id='Form'
            onSubmit={form.handleSubmit(onSubmit, onError)}
          >
            <div className='flex gap-8' id='set+insight'>
              <div className="flex flex-col gap-3 w-1/2" id='setContainer'>
                <h1>Sets</h1>
                <div className="flex flex-col border rounded-md p-6 gap-8" id="sets">
                  {setsFieldArray.fields.map((item, index) => (
                    <Form.FieldSet key={item.id} className='flex gap-2 items-end'>
                      <Form.Field
                        control={form.control}
                        name={`sets[${index}].value` as any}
                        render={({ field }) => (
                          <Form.Item className="flex-grow">
                            <Form.Label>{exercise?.measurement}</Form.Label>
                            <Form.Control>
                              <Input
                                {...field}
                                type="number"
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </Form.Control>
                            <Form.Message />
                          </Form.Item>
                        )}
                      />
                      <Form.Field
                        control={form.control}
                        name={`sets[${index}].reps` as any}
                        render={({ field }) => (
                          <Form.Item className="flex-grow">
                            <Form.Label>reps</Form.Label>
                            <Form.Control>
                            <Input
                                {...field}
                                type="number"
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </Form.Control>
                            <Form.Message />
                          </Form.Item>
                        )}
                      />
                      <Form.Field
                        control={form.control}
                        name={`sets[${index}].rpe` as any}
                        render={({ field }) => (
                          <Form.Item className="flex-grow">
                            <Form.Label>rpe</Form.Label>
                            <Form.Control>
                              <Input
                                {...field}
                                type="number"
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </Form.Control>
                            <Form.Message />
                          </Form.Item>
                        )}
                      />
                      <Button type="button" variant="ghost" size="icon" onClick={() => setsFieldArray.remove(index)}>
                        <XIcon size={22} className="text-red-500" />
                      </Button>
                    </Form.FieldSet>
                  ))}

                  <Button
                    type="button"
                    variant='secondary'
                    className='w-fit'
                    onClick={() => setsFieldArray.append({ reps: 0, value: 0, rpe: 0 })}
                  >
                    <PlusIcon size={18} className='mr-2' />
                    Add Set
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-3 w-1/2" id="insightsContainer">
                <h1>Insights</h1>
                <div className="flex flex-col border rounded-md p-6 gap-8" id="insights">
                  {selectedInsights.map((insight) => (
                    <div className='flex gap-2 items-end'>
                      <Form.Field
                        control={form.control}
                        name={`insights.${insight}` as any}
                        render={({ field }) => (
                          <Form.Item className="flex-grow">
                            <Form.Label>{insight}</Form.Label>
                            <Select
                              value={field.value}
                              onValueChange={value => field.onChange(value)}
                            >
                              <Select.Trigger>
                                <Select.Value placeholder="Select one" />
                              </Select.Trigger>
                              <Select.Content>
                                <Select.Item value="belowAverage">Below Average</Select.Item>
                                <Select.Item value="average">Average</Select.Item>
                                <Select.Item value="aboveAverage">Above Average</Select.Item>
                              </Select.Content>
                            </Select>
                            <Form.Message />
                          </Form.Item>
                        )}
                      />
                      <Button type="button" variant="ghost" size="icon" onClick={() => toggleInsight(insight)}>
                        <XIcon size={22} className="text-red-500" />
                      </Button>
                    </div>
                  ))}
                    <DropdownMenu>
                      <DropdownMenu.Trigger asChild>
                        <Button
                          type="button"
                          variant='secondary'
                          className='w-fit'
                        >
                          <PlusIcon size={18} className='mr-2' />
                          Add Insight
                        </Button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content>
                        {insights.map((insight) => (
                          <DropdownMenu.CheckboxItem
                            key={insight}
                            checked={selectedInsights.includes(insight)}
                            onClick={() => toggleInsight(insight)}
                          >
                            {insight}
                          </DropdownMenu.CheckboxItem>
                        ))}
                      </DropdownMenu.Content>
                    </DropdownMenu>
                  </div>
                </div>
            </div>

            <div className='flex justify-end gap-3'>
              <Button
                type="submit"
                onClick={() => setStatus('completed')}
                disabled={createWorkout.isLoading}
              >
                {createWorkout.isLoading ? (
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
                onClick={() => setStatus('active')}
                type="submit"
                disabled={createWorkout.isLoading}
              >
                {createWorkout.isLoading ? (
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
      </div>
  );
};

export default Workout;
