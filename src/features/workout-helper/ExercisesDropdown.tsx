import { Button, Checkbox, Command, Popover } from 'good-nice-ui';
import React from 'react';
import { Exercise } from '../../schemas/ExerciseSchema';
import { Plus } from 'lucide-react';

export interface ExercisesDropdownProps {
  exercises: Exercise[];
  selectedExercises: Exercise[];
  toggleExerciseSelection: (exercise: Exercise) => void;
}

export const ExercisesDropdown = ({
  exercises,
  selectedExercises,
  toggleExerciseSelection,
}: ExercisesDropdownProps) => {
  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button variant="outline" size='icon'>
          <Plus className='h-5 w-5' />
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-[300px] p-0" align='end'>
        <Command>
          <Command.Input placeholder="Search..." />
          <Command.List>
            <Command.Empty>No results found.</Command.Empty>
            <Command.Group>
              {exercises.map((exercise: Exercise) => {
                const isSelected = selectedExercises.some(selectedExercise => selectedExercise.id === exercise.id);
                return (
                  <Command.Item
                    key={exercise.id}
                    onSelect={() => toggleExerciseSelection(exercise)}
                    className='flex gap-2 p-3'
                  >
                    <Checkbox checked={isSelected} />
                    {exercise.name}
                  </Command.Item>
                );
              })}
            </Command.Group>
          </Command.List>
        </Command>
      </Popover.Content>
    </Popover>
  )
};
