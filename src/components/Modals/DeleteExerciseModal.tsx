import { Button, Dialog, buttonVariants } from 'good-nice-ui';
import React, { useState } from 'react';
import { api } from '../../utils/api';
import { Trash } from 'lucide-react';
import { useStore } from '../../store/store';

export interface DeleteExerciseModalProps {
  id: string;
}

export const DeleteExericseModal = ({ id }: DeleteExerciseModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setShouldRefetch } = useStore();

  const deleteExercise = api.exercise.softDelete.useMutation({
    onMutate: () => console.log('mutating'),
    onSettled: () => {
      setIsOpen(false);
      setShouldRefetch(true);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <div
          className={buttonVariants({ variant: "outline", size: "sm" })}
          onClick={() => setIsOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </div>
      </Dialog.Trigger>
      <Dialog.Content className="sm:max-w-[425px]">
        <Dialog.Header>
          <Dialog.Title>Delete Exercise?</Dialog.Title>
          <Dialog.Description>
            This will delete the exercise, but your data will still be visible in your workout history.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Button
            variant="secondary"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            type="button"
            onClick={() => deleteExercise.mutate(id)}
          >
            Delete
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
