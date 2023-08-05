import { Button, Dialog } from 'good-nice-ui';
import React from 'react';
import { api } from '../../utils/api';
import { Loader2 } from 'lucide-react';
import { useStore } from '../../store/store';
import { useToast } from '../../hooks/useToast';

export interface DeleteExerciseDialogProps {
  id: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteExerciseDialog = ({ id, setIsOpen }: DeleteExerciseDialogProps) => {
  const { toast } = useToast();
  const { setShouldRefetch } = useStore();

  const { mutate, isLoading } = api.exercise.delete.useMutation({
    onSettled: () => {
      setIsOpen(false);
      setShouldRefetch(true);
    },
    onError: () => {
      toast({
        title: 'Error!',
        description: `Something went wrong. The exercise was not deleted.`,
        variant: 'destructive',
      })
    },
  });

  return (
    <Dialog.Content className="sm:max-w-[425px]">
      <Dialog.Title>Delete Exercise?</Dialog.Title>
      <Dialog.Description>
        Are you sure? This will delete permanently delete the exercise and all associated data.
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
