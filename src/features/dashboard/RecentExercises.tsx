import React from 'react';
import { api } from '../../utils/api';
import { ExerciseLineChart } from '../data-explorer/LineChart';

export const RecentExercisesChart = () => {
  const { data, isLoading } = api.exercise.getAllExercisesWithCompletedWorkouts.useQuery();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return data && <ExerciseLineChart data={data} isDateMode={true} />;
}
