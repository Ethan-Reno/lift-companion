import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../../utils/api';
import { useStore } from '../../store/store';
import { Header } from '../../components';
import { WorkoutForm } from '../../features/workout-helper/WorkoutForm';
import { Exercise } from '../../schemas/ExerciseSchema';
import { Button, ChevronDownIcon, DropdownMenu, Skeleton } from 'good-nice-ui';
import { CreateWorkoutInputs, WORKOUT_STATUS } from '../../schemas/WorkoutSchema';
import { ExercisesDropdown } from '../../features/workout-helper/ExercisesDropdown';

const Workout = () => {
  const {
    initialExerciseId,
    workoutFormStates,
    clearWorkoutFormState,
    clearWorkoutFormStateForId
  } = useStore();
  const { data: exercises, isLoading } = api.exercise.getAll.useQuery(); // don't show add more button until loaded
  const initialExercise = exercises?.find((exercise) => exercise.id === initialExerciseId);
  const workoutFormsStateIds = Object.keys(workoutFormStates);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [showPersistInterrupt, setShowPersistInterrupt] = useState(workoutFormsStateIds.length > 0);
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    if (initialExerciseId) {
      setActiveTab(initialExerciseId);
    } else if (selectedExercises[0]) {
      setActiveTab(selectedExercises[0].id);
    } else {
      setActiveTab('');
    }
  }, []);

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);
  
  useEffect(() => {
    // Find exercises that are currently being persisted in the workoutFormStates
    const persistedExercises = exercises?.filter((exercise) => 
      workoutFormsStateIds.includes(exercise.id)
    ) || [];
    console.log(persistedExercises);
  
    if (initialExercise) {
      // If the initialExercise is not persisted, add it to the selectedExercises, otherwise use the persisted version
      if (!persistedExercises.some((exercise) => exercise.id === initialExercise.id)) {
        setSelectedExercises([initialExercise, ...persistedExercises]);
      } else {
        setSelectedExercises(persistedExercises);
      }
    } else {
      setSelectedExercises(persistedExercises);
    }
  }, [workoutFormStates]);

  const toggleExerciseSelection = useCallback((exercise: Exercise) => {
    setSelectedExercises(prevExercises => {
      // Check if the exercise is already selected
      const isSelected = prevExercises.some(selected => selected.id === exercise.id);
      if (isSelected) {
        // Remove the exercise
        const updatedExercises = prevExercises.filter(selected => selected.id !== exercise.id);
        clearWorkoutFormStateForId(exercise.id);
  
        // If the remove exercise was the current tab, change the tab to the new first exercise in the list
        if (exercise.id === activeTab && updatedExercises[0]) {
          setActiveTab(updatedExercises[0].id);
        }
  
        return updatedExercises;
      } else {
        // Add the exercise and switch to its tab
        const updatedExercises = [...prevExercises, exercise];
        setActiveTab(exercise.id);
        return updatedExercises;
      }
    });
  }, [setSelectedExercises, initialExerciseId, activeTab]);

  // Define the default values for the workout form
  const defaultFormValues = {
    status: WORKOUT_STATUS.enum.started,
    sets: [{ reps: 0, value: 0, rpe: 1 }],
    insights: [{}],
  };
  const getIntialFormState = useCallback((id: string): CreateWorkoutInputs => {
    return workoutFormStates[id] || { ...defaultFormValues, exerciseId: id };
  }, [workoutFormStates]);
  
  const activeExercise = selectedExercises.find((exercise) => exercise.id === activeTab);

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
              if (initialExercise) {
                setSelectedExercises([initialExercise]);
              } else {
                // Clear all selected exercises if there is no initialExerciseId
                setSelectedExercises([]); 
              }
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
                    onValueChange={handleTabChange}
                    defaultValue={initialExerciseId || selectedExercises[0]?.id || ''}
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
            exerciseData={exercise}
            initialState={getIntialFormState(exercise.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Workout;
