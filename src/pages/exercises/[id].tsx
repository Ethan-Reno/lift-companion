import React from 'react';
import { type NextPage } from 'next';
import { api } from '../../utils/api';
import { useRouter } from 'next/router';
import { BackHeader } from '../../components/BackHeader';

const Exercise: NextPage = () => {
  const router = useRouter();
  const exerciseId = router.query.id as string;
  const { data: exercise, isLoading } = api.exercise.getById.useQuery(exerciseId);

  if (!exercise) return (
    <BackHeader header='No Exercise Found' />
  );

  return (
    <div className='flex flex-col gap-16'>
      <div className='flex gap-6 items-center'>
        <BackHeader
          isLoading={isLoading}
          header={exercise.name}
        />
      </div>
      <span>Details:</span>
    </div>
  );
};

export default Exercise;
