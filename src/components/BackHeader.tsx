import { Button, Skeleton } from 'good-nice-ui';
import { ArrowBigLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import React from 'react';

interface BackHeaderProps {
  header: string;
  isLoading?: boolean;
}

export const BackHeader = ({ header, isLoading }: BackHeaderProps) => {
  const router = useRouter();
  return (
    <div className='flex gap-6 items-center'>
      <Button
        variant='outline'
        size='sm'
        onClick={() => router.back()}
      >
        <ArrowBigLeft className='h-4 w-4'/>
      </Button>
      {isLoading ? (
          <Skeleton className='w-32 h-6' />
        ) : (
          <span className='text-2xl'>{header}</span>
        )}
    </div>
  )
};
