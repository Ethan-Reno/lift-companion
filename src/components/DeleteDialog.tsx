'use client'

import { Button, Dialog } from 'good-nice-ui';
import React from 'react';
import { api } from '../utils/api';
import { Loader2 } from 'lucide-react';
import { useStore } from '../store/store';

export interface DeleteDialogProps {
  id: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: 'exercise' | 'metric';
}

interface ModalTypeValues {
  mutation: any;
  message: string;
}

export const DeleteDialog = ({ id, setIsOpen, type }: DeleteDialogProps) => {
  const { setShouldRefetch } = useStore();

  const values: Record<string, ModalTypeValues> = {
    'exercise': {
      mutation: api.exercise.delete.useMutation,
      message: 'Are you sure? This will delete permanently delete the exercise and all associated data.'
    },
    'metric': {
      mutation: api.metric.delete.useMutation,
      message: 'Are you sure? This will delete permanently delete the metric.'
    },
  };

  const modalType = values[type];

  const { mutate, isLoading } = modalType?.mutation({
    onSettled: () => {
      setIsOpen(false);
      setShouldRefetch(true);
    }
  });

  if (!modalType) {
    return null;
  }

  return (
    <Dialog.Content className="sm:max-w-[425px]">
      <Dialog.Title>Delete Exercise?</Dialog.Title>
      <Dialog.Description>
        {modalType.message}
      </Dialog.Description>
      <Dialog.Footer className='gap-y-4'>
        <Button
          variant="secondary"
          type="button"
          onClick={() => setIsOpen(false)}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          type="button"
          onClick={() => mutate(id)}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </>
          ) : (
            <>Delete</>
          )}
        </Button>
      </Dialog.Footer>
    </Dialog.Content>
  );
};
