import React from 'react';
import { type NextPage } from 'next';
import { api } from '../../utils/api';
import { useRouter } from 'next/router';
import { Header } from '../../components/Header';

const Exercise: NextPage = () => {
  const router = useRouter();
  const exerciseId = router.query.id as string;
  const { data: exercise, isLoading } = api.exercise.getById.useQuery(exerciseId);

  if (!exercise) return (
    <Header>No Exercise Found</Header>
  );

  return (
    <div className='flex flex-col gap-16'>
      <div className='flex gap-6 items-center'>
        <Header isLoading={isLoading}>
          {exercise.name}
        </Header>
      </div>
      <span>Details:</span>
    </div>
  );
};

export default Exercise;
