import { Button, CheckIcon, Command, Popover } from 'good-nice-ui';
import React from 'react';
import { Exercise } from '../../schemas/ExerciseSchema';
import { cn } from '../../utils/cn';

export interface AddExercisesDropdownProps {
  exercises: Exercise[];
  selectedExercises: Exercise[];
  toggleExerciseSelection: (exercise: Exercise) => void;
}

export const AddExercisesDropdown = ({
  exercises,
  selectedExercises,
  toggleExerciseSelection,
}: AddExercisesDropdownProps) => {
  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button>
          Add Exercise
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-[300px] p-0" align="start">
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
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon size={16} />
                    </div>
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
