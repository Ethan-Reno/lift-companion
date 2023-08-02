import React, { useEffect, useRef, useState } from 'react';
import { api } from '../../utils/api';
import { useStore } from '../../store/store';
import { Header } from '../../components';
import { WorkoutForm } from '../../features/workout-helper/WorkoutForm';
import { Exercise } from '../../schemas/ExerciseSchema';
import { Button, ChevronDownIcon, DropdownMenu, Skeleton } from 'good-nice-ui';
import { ExercisesDropdown } from '../../features/workout-helper/ExercisesDropdown';

const Workout = () => {
  const {
    selectedExercises,
    setSelectedExercises,
    workoutFormStates,
    clearWorkoutFormState,
  } = useStore();
  const { data: exercises, isLoading } = api.exercise.getAll.useQuery();
  const [showPersistInterrupt, setShowPersistInterrupt] = useState(Object.keys(workoutFormStates).length > 0);
  const [activeTab, setActiveTab] = useState<string>(selectedExercises[0]?.id || '');
  const activeExercise = selectedExercises.find((exercise) => exercise.id === activeTab);

  const previousLength = useRef(selectedExercises.length);
  useEffect(() => {
    if (selectedExercises.length < previousLength.current) {
      setActiveTab(selectedExercises[0]?.id || '');
    }
    // Update previousLength for the next render
    previousLength.current = selectedExercises.length;
  }, [selectedExercises.length]);

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

  if (showPersistInterrupt) {
    return (
      <div className='flex flex-col gap-6 justify-center items-center'>
        Continue previously started workout?
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setShowPersistInterrupt(false);
            }}
          >
            Yes
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              // Clear persisted workout form states
              clearWorkoutFormState();
              setShowPersistInterrupt(false);
            }}
          >
            No
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col w-full gap-16 items-center' id='WorkoutHelper'>
      <Header className='self-start'>Workout</Header>
      <div className='flex flex-col gap-2'>
        <div className='flex justify-between'>
          <div className='flex gap-2 items-center'>
            {selectedExercises.length > 0 ? (
              <DropdownMenu>
                <DropdownMenu.Trigger asChild>
                  <Button variant="ghost" className='flex gap-2 items-center'>
                    <span className='text-xl'>{activeExercise?.name}</span>
                    <ChevronDownIcon size={20} />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.RadioGroup
                    value={activeTab}
                    onValueChange={setActiveTab}
                  >
                    {selectedExercises.map((exercise: Exercise) => (
                      <DropdownMenu.RadioItem
                        className='py-3 pr-3'
                        key={exercise.id}
                        value={exercise.id}
                      >
                        {exercise.name}
                      </DropdownMenu.RadioItem>
                    ))}
                  </DropdownMenu.RadioGroup>
                </DropdownMenu.Content>
              </DropdownMenu>
            ) : (
              <span className='text-xl mr-5'>Select an exercise to begin</span>
            )}
          </div>
          {isLoading && <Skeleton className='w-[112px] h-10' />}
          {!isLoading && exercises &&
            <ExercisesDropdown 
              exercises={exercises}
              selectedExercises={selectedExercises}
              toggleExerciseSelection={toggleExerciseSelection}
            />
          }
        </div>
        {selectedExercises.map((exercise: Exercise) => (
          exercise.id === activeTab &&
          <WorkoutForm
            key={exercise.id}
            exercise={exercise}
          />
        ))}
      </div>
    </div>
  );
};

export default Workout;
