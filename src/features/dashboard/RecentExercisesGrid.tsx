import React, { useState } from 'react';
import { api } from '../../utils/api';
import { Button, Card, DropdownMenu, Label, Select, Skeleton } from 'good-nice-ui';
import { LineChart, X_AXIS_TYPE, Y_AXIS_TYPE } from '../data-explorer/LineChart';
import { getExerciseChartData } from '../data-explorer/getExerciseChartData';
import { Dumbbell, LineChartIcon, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

export enum SORT_TYPE {
  MOST_RECENT = 'Most Recent',
  FAVOURITES = 'Favourites',
}

export const RecentExercisesGrid = () => {
  const { data, isLoading } = api.exercise.getAllExercisesWithCompletedWorkouts.useQuery();
  const [ xAxisType, setXAxisType ] = useState<X_AXIS_TYPE>(X_AXIS_TYPE.NUMBER);
  const [ yAxisType, setYAxisType ] = useState<Y_AXIS_TYPE>(Y_AXIS_TYPE.TOTAL_VALUE);
  const [ sortType, setSortType ] = useState<SORT_TYPE>(SORT_TYPE.MOST_RECENT);
  const axes = {
    x: xAxisType,
    y: yAxisType,
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <div className=''>Dashboard</div>
        <div className="flex gap-3 items-center">
          <Label>Sort By:</Label>
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
        {data?.map((exercise) => {
          return (
            <Card className='border-muted shadow-md dark:border-transparent' key={exercise.id}>
              <Card.Header className='flex flex-row items-center justify-between p-3'>
                <Card.Title className='capitalize text-muted-foreground text-lg'>{exercise.name}</Card.Title>
                <DropdownMenu>
                  <DropdownMenu.Trigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="data-[state=open]:bg-muted"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content align='end'>
                    <DropdownMenu.Label className="text-lowContrast-foreground">Actions</DropdownMenu.Label>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item className='p-2'>
                      <Link href={`/workout/${exercise.id}`} className='flex items-center'>
                        <Dumbbell className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Start Workout
                        <span className="sr-only">View details</span>
                      </Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className='p-2'>
                      <Link href={`/exercises/${exercise.id}`} className='flex items-center'>
                        <LineChartIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
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
