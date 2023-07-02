import React from 'react';
import { api } from '../../utils/api';
import { ExerciseLineChart } from '../data-explorer/LineChart';

export const RecentExercisesChart = () => {
  const { data, isLoading } = api.workout.getLatestWorkouts.useQuery();
  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return <ExerciseLineChart data={data} />;
}
