import React from 'react';
import { api } from '../../utils/api';
import { ExerciseLineChart } from '../data-explorer/LineChart';

export const RecentExercisesChart = () => {
  const { data, isLoading } = api.exercise.getAllExercisesWithCompletedWorkouts.useQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return data && <ExerciseLineChart data={data} isDateMode={true} />;
}
