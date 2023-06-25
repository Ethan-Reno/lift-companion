import { Button, Dialog, buttonVariants } from 'good-nice-ui';
import React, { useState } from 'react';
import { api } from '../../utils/api';
import { Loader2, Trash } from 'lucide-react';
import { useStore } from '../../store/store';

export enum DELETE_TYPE {
  SOFT_DELETE = 'softDelete',
  HARD_DELETE = 'hardDelete',
}

export interface DeleteExerciseModalProps {
  id: string;
  deleteType: DELETE_TYPE;
}

export const DeleteExericseModal = ({ id, deleteType }: DeleteExerciseModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setShouldRefetch } = useStore();
  const isHardDelete = deleteType === DELETE_TYPE.HARD_DELETE;
  const deleteRouter = isHardDelete ? api.exercise.hardDelete : api.exercise.softDelete;

  const { mutate, isLoading } = deleteRouter.useMutation({
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
          {isHardDelete ? (
            <Dialog.Description>
              Are you sure? This will delete permanently delete the exercise and all associated data.
            </Dialog.Description>
          ) : (
            <Dialog.Description>
              This will delete the exercise, but your data will still be visible in your workout history.
            </Dialog.Description>
          )}
        </Dialog.Header>
        <Dialog.Footer>
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
    </Dialog>
  );
};
