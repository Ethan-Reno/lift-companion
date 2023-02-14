import React, { type ReactElement } from 'react';
import { DIALOG_TYPES } from "./Dialog";
import { CreateExerciseForm } from '../../Forms/CreateExerciseForm';

interface DialogOptions {
  title?: string;
  description?: string;
  content: ReactElement;
}

export const deriveDialogContent = (
  type: DIALOG_TYPES, 
  setIsDialogOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void,
): DialogOptions => {
  switch (type) {
    case DIALOG_TYPES.CREATE_EXERCISE:
      return {
        title: 'Create New Exercise',
        content: <CreateExerciseForm setIsDialogOpen={setIsDialogOpen} />,
      }
    default:
      return {
        title: 'Default',
        description: 'Default',
        content: <CreateExerciseForm setIsDialogOpen={setIsDialogOpen} />,
      }
  }
}
