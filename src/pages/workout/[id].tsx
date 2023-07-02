import React from 'react';
import { api } from '../../utils/api';
import { useRouter } from 'next/router';
import { Header } from '../../components';
import { WorkoutForm } from '../../features/workout-helper/WorkoutForm';

const Workout = () => {
  const router = useRouter();
  const exerciseId = router.query.id as string;
  const { data: exercise, isLoading } = api.exercise.getById.useQuery(exerciseId);

  return (
    <div className='flex flex-col gap-16' id='page'>
      <div className='flex gap-6 justify-between items-center' id='header'>
        <Header
          isLoading={isLoading}
          header={`${exercise?.name} Workout`}
        />
      </div>
      {/* Add skeleton load for the form components here on isLoading */}
      {exercise && <WorkoutForm exerciseData={exercise} />}
    </div>
  );
};

export default Workout;
