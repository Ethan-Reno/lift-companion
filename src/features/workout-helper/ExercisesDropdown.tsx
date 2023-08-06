import { Button, Checkbox, Command, Popover } from 'good-nice-ui';
import React from 'react';
import { Exercise } from '../../schemas/ExerciseSchema';
import { Plus } from 'lucide-react';
import { useStore } from '../../store/store';

export interface ExercisesDropdownProps {
  exercises: Exercise[];
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export const ExercisesDropdown = ({
  exercises,
  activeTab,
  setActiveTab,
}: ExercisesDropdownProps) => {
  const { selectedExercises, setSelectedExercises } = useStore();

  const toggleExerciseSelection = (toggledExercise: Exercise) => {
    const isSelected = selectedExercises.some(exercise => exercise.id === toggledExercise.id);
    if (isSelected) {
      // If the exercise is selected, remove it from the selectedExercises state
      setSelectedExercises(selectedExercises.filter(exercise => exercise.id !== toggledExercise.id));
      // If the removed exercise was the current tab, move to the new first exercise in the list, or to the default if there is none
      if (activeTab === toggledExercise.id) {
        setActiveTab(selectedExercises[0]?.id || '');
      }
    } else {
      // if the exercise is not selected, add it to the end of the selectedExercises state and move to its tab
      setSelectedExercises([...selectedExercises, toggledExercise]);
      setActiveTab(toggledExercise.id);
    }
  };

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
                  <div className='relative' key={exercise.id}>
                    <Command.Item
                      onSelect={() => toggleExerciseSelection(exercise)}
                      className='p-3 pl-9'
                    >
                      {exercise.name}
                    </Command.Item>
                    <Checkbox checked={isSelected} className='absolute top-3.5 left-3' />
                  </div>
                );
              })}
            </Command.Group>
          </Command.List>
        </Command>
        {selectedExercises.length > 0 && <div className="w-full gap-2 flex border-t p-2">
          {/* <Button
            variant="outline"
            className="border-lowContrast-foreground bg-transparent w-1/2"
          >
            Add all
          </Button> */}
          {/* TODO: Move this into an alert dialog to confirm clearing */}
          <Button
            variant="outline"
            size='sm'
            className='border-destructive bg-transparent w-full'
            onClick={() => setSelectedExercises([])}
          >
            Deselect all
          </Button>
        </div>
      }
      </Popover.Content>
    </Popover>
  )
};
