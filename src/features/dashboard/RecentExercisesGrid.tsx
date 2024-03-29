import React, { useState } from 'react';
import { api } from '../../utils/api';
import { Button, Card, DropdownMenu, Select, Skeleton } from 'good-nice-ui';
import { LineChart, X_AXIS_TYPE, Y_AXIS_TYPE } from '../data-explorer/LineChart';
import { getExerciseChartData } from '../data-explorer/getExerciseChartData';
import { Dumbbell, LineChartIcon, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { type Exercise } from '../../schemas/ExerciseSchema';
import { useStore } from '../../store/store';

export enum SORT_TYPE {
  MOST_RECENT = 'Most Recent',
  FAVOURITES = 'Favourites',
}

export const RecentExercisesGrid = () => {
  const { data: exercises, isLoading } = api.exercise.getAll.useQuery();
  const [ xAxisType, setXAxisType ] = useState<X_AXIS_TYPE>(X_AXIS_TYPE.NUMBER);
  const [ yAxisType, setYAxisType ] = useState<Y_AXIS_TYPE>(Y_AXIS_TYPE.TOTAL_VALUE);
  const [ sortType, setSortType ] = useState<SORT_TYPE>(SORT_TYPE.MOST_RECENT);
  const { selectedExercises, setSelectedExercises } = useStore();
  const axes = {
    x: xAxisType,
    y: yAxisType,
  }

  const exercisesWithCompletedWorkouts = (exercises: Exercise[]) => {
    return exercises
      .filter(exercise => exercise.workouts && exercise.workouts.length > 0)
      .sort((a, b) => {
        const aWorkouts = a.workouts || [];
        const bWorkouts = b.workouts || [];
        const aLatestWorkoutDate = Math.max(...aWorkouts.map(w => new Date(w.createdAt).getTime()));
        const bLatestWorkoutDate = Math.max(...bWorkouts.map(w => new Date(w.createdAt).getTime()));
        return bLatestWorkoutDate - aLatestWorkoutDate;
      });
  };

  const setInitialExercise = (exercise: Exercise) => {
    setSelectedExercises([exercise, ...selectedExercises.filter(selectedExercise => selectedExercise.id !== exercise.id)]);
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <div className='text-xl text-muted-foreground'>Recent Progress</div>
        <Select
          onValueChange={(value) => setSortType(value as SORT_TYPE)}
          defaultValue={sortType}
        >
          <Select.Trigger className='w-32'>{sortType}</Select.Trigger>
          <Select.Content>
            <Select.Item value={SORT_TYPE.MOST_RECENT}>
              Most Recent
            </Select.Item>
            <Select.Item disabled value={SORT_TYPE.FAVOURITES}>
              Favourites
            </Select.Item>
          </Select.Content>
        </Select>
      </div>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {isLoading && (
          <>
            {[...Array(3)].map((_, i) => (
              <Card key={i} className='border-muted shadow-md dark:border-transparent'>
                <Card.Header>
                  <Skeleton className='h-6 w-24'/>
                </Card.Header>
                <Card.Content className='p-6'>
                  <Skeleton className='w-full h-[200px]' />
                </Card.Content>
              </Card>
            ))}
          </>
        )}
        {exercises && exercisesWithCompletedWorkouts(exercises).map((exercise) => {
          return (
            <Card className='border shadow-md' key={exercise.id}>
              <Card.Header className='flex flex-row items-center justify-between pb-0 space-y-0'>
                <Card.Title className='capitalize text-muted-foreground text-lg'>{exercise.name}</Card.Title>
                <DropdownMenu>
                  <DropdownMenu.Trigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="data-[state=open]:bg-muted"
                      aria-labelledby="sr-only"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                      <span className="sr-only" id="sr only">Open menu</span>
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content align='end'>
                    <DropdownMenu.Label className="text-lowContrast-foreground">Actions</DropdownMenu.Label>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item>
                      <Link href='/workout' onClick={() => setInitialExercise(exercise)} className='flex items-center'>
                        <Dumbbell className="mr-2 h-3.5 w-3.5 text-primary" />
                        Start Workout
                        <span className="sr-only">View details</span>
                      </Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                      <Link href={`/exercises/${exercise.id}`} className='flex items-center'>
                        <LineChartIcon className="mr-2 h-3.5 w-3.5 text-primary" />
                        View Data
                        <span className="sr-only">View details</span>
                      </Link>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu>
              </Card.Header>
              <Card.Content className='p-1'>
                <div className='w-full h-[200px]'>
                  <LineChart data={getExerciseChartData(exercise, axes)} axes={axes} title='test' />
                </div>
              </Card.Content>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
