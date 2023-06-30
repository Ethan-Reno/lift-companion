import React from 'react';
import { type NextPage } from "next";
import { api } from '../../utils/api';
import { useRouter } from 'next/router';
import { Button, Skeleton, buttonVariants } from 'good-nice-ui';
import { ArrowBigLeft } from 'lucide-react';
import { useProtectedRoute } from '../../utils/useProtectedRoute';

const Exercise: NextPage = () => {
  // useProtectedRoute();

  const router = useRouter();
  const exerciseId = router.query.id as string;
  const { data: exercise, isLoading } = api.exercise.getById.useQuery(exerciseId);

  return (
    <div className="flex flex-col gap-16">
      <div className="flex gap-6 items-center">
        <Button
          variant="outline"
          onClick={() => router.back()}
        >
          <ArrowBigLeft className="h-4 w-4"/>
        </Button>
        {isLoading ? (
          <Skeleton className="w-32 h-6" />
        ) : (
          <span className="text-2xl">{exercise?.name}</span>
        )}
        
      </div>
      <span>Details:</span>
    </div>
  );
};

export default Exercise;
