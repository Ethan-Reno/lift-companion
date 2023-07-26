import { Button, Skeleton } from 'good-nice-ui';
import { ArrowBigLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import React from 'react';
import { cn } from '../utils/cn';

interface HeaderProps {
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

export const Header = ({ children, isLoading, className }: HeaderProps) => {
  const router = useRouter();
  return (
    <div className={cn('flex gap-6 items-center', className)}>
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
          <span className='text-2xl'>{children}</span>
        )}
    </div>
  )
};
