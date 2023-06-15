import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  buttonVariants
} from 'lift-companion-ui';
import React, { useState } from 'react';
import { api } from '../../utils/api';
import { Trash } from 'lucide-react';

export interface DeleteExerciseModalProps {
  id: string;
}

export const DeleteExericseModal = ({ id }: DeleteExerciseModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const deleteExercise = api.exercise.softDelete.useMutation({
    onMutate: () => console.log('mutating'),
    onSettled: () => {setIsOpen(false)},
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className={buttonVariants({ variant: "outline", size: "sm" })}
          onClick={() => setIsOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Exercise?</DialogTitle>
          <DialogDescription>
            This will delete the exercise, but your data will still be visible in your workout history.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
