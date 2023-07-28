import React, { useState, useEffect, use, useCallback } from 'react';
import { api } from '../../utils/api';
import { useStore } from '../../store/store';
import { Header } from '../../components';
import { WorkoutForm } from '../../features/workout-helper/WorkoutForm';
import { Exercise } from '../../schemas/ExerciseSchema';
import { Button, Checkbox, Dialog, Skeleton, Tabs } from 'good-nice-ui';
import { CreateWorkoutInputs, WORKOUT_STATUS } from '../../schemas/WorkoutSchema';
import { AddExercisesDropdown } from '../../features/workout-helper/AddExercisesDropdown.component';

const Workout = () => {
  const {
    initialExerciseId,
    workoutFormStates,
    clearWorkoutFormState,
    clearWorkoutFormStateForId
  } = useStore();
  const { data: exercises, isLoading } = api.exercise.getAll.useQuery(); // don't show add more button until loaded
  const { mutate } = api.workout.create.useMutation({
    onSuccess: (data, variables) => {
      clearWorkoutFormStateForId(variables.exerciseId);
    },
  });
  const initialExercise = exercises?.find((exercise) => exercise.id === initialExerciseId);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>(() => {
    // Fetch all persisted exercises
    const persistedExerciseIds = Object.keys(workoutFormStates);
    const persistedExercises = exercises?.filter((exercise) => 
      persistedExerciseIds.includes(exercise.id)
    ) || [];
    
    // Include initialExercise if defined
    if (initialExercise) {
      // Only add the initial exercise if it is not already being persisted, otherwise fallback to persisted version
      if (!persistedExercises.some((exercise) => exercise.id === initialExercise.id)) {
        return [initialExercise, ...persistedExercises];
      }
    }
  
    return persistedExercises;
  });
  const [workoutsToSubmit, setWorkoutsToSubmit] = useState<CreateWorkoutInputs[]>([]);
  const [showPersistInterrupt, setShowPersistInterrupt] = useState(() => {
    // If we have any persisted workout form states, ask the user if they want to continue those
    return Object.keys(workoutFormStates).length > 0;
  });

  const defaultFormValues = {
    status: WORKOUT_STATUS.enum.started,
    sets: [{ reps: 0, value: 0, rpe: 1 }],
    insights: [{}],
  };

  const getIntialFormState = useCallback((id: string): CreateWorkoutInputs => {
    return workoutFormStates[id] || { ...defaultFormValues, exerciseId: id };
  }, [workoutFormStates]);

  const toggleExerciseSelection = useCallback((exercise: Exercise) => {
    setSelectedExercises(prevExercises => {
      const isSelected = prevExercises.some(selected => selected.id === exercise.id);
      if (isSelected) {
        return prevExercises.filter(selected => selected.id !== exercise.id);
      } else {
        return [...prevExercises, exercise];
      }
    });
    setDefaultTabFromLastSelected();
  }, [setSelectedExercises]);


  const [defaultTab, setDefaultTab] = useState<string>('');

  const setDefaultTabFromLastSelected = () => {
    const lastSelectedExercise = selectedExercises[selectedExercises.length - 1];
    if (lastSelectedExercise) {
      setDefaultTab(lastSelectedExercise.id);
    } else if (initialExerciseId) {
      setDefaultTab(initialExerciseId);
    } else {
      setDefaultTab('');
    }
  };

  useEffect(() => {
    setDefaultTabFromLastSelected();
  }, [selectedExercises]);

  const handleSubmit = () => {
    if (workoutFormStates) {
      Object.values(workoutFormStates).forEach((workout: CreateWorkoutInputs) => {
        if (workout.status === WORKOUT_STATUS.enum.completed) mutate(workout);
      });
    }
  };

  if (showPersistInterrupt) {
    return (
      <div>
        Continue previously started workout?
        <div>
          <Button
            onClick={() => {
              // Clear persisted workout form states
              clearWorkoutFormState();
              if (initialExercise) {
                setSelectedExercises([initialExercise]);
              } else {
                setSelectedExercises([]); // Clear all selected exercises if no initialExerciseId
              }
              setShowPersistInterrupt(false);
            }}
          >
            No
          </Button>
          <Button
            onClick={() => {
              setShowPersistInterrupt(false);
            }}
          >
            Yes
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col w-full gap-16 items-center' id='WorkoutHelper'>
      <Header className='self-start'>Workout</Header>
      {isLoading && <Skeleton className='w-[112px] h-10' />}
      {!isLoading && exercises &&
        <AddExercisesDropdown 
          exercises={exercises}
          selectedExercises={selectedExercises}
          toggleExerciseSelection={toggleExerciseSelection}
        />
      }
      <Tabs defaultValue={defaultTab} key={defaultTab}>
        <Tabs.List className='w-full border-b bg-surface rounded-t-md'>
          {selectedExercises.map((exercise: Exercise) => (
            <Tabs.Trigger
              key={exercise.id}
              value={exercise.id}
              className='p-3'
            >
              {exercise.name}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
          {selectedExercises.map((exercise: Exercise) => (
            <Tabs.Content
              key={exercise.id}
              value={exercise.id}
              className='w-full'
            >
              <WorkoutForm exerciseData={exercise} initialState={getIntialFormState(exercise.id)}/>
            </Tabs.Content>
          ))}
      </Tabs>
      <Dialog>
        <Dialog.Trigger asChild>
          <Button>Submit</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Submit Workouts</Dialog.Title>
          <Dialog.Description>
            Which workouts would you like to submit?
          </Dialog.Description>
          <div className='flex flex-col gap-6'>
            {Object.values(workoutFormStates).map((workout: CreateWorkoutInputs) => {
              const exercise = exercises?.find(exercise => exercise.id === workout.exerciseId);
              return (
                <div className="flex justify-between items-center" key={workout.exerciseId}>
                  <span>{exercise?.name}</span>
                  <div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        mutate(workout);
                      }}
                    >
                      Submit
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        clearWorkoutFormStateForId(workout.exerciseId);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
          <Dialog.Footer>
            <Button onClick={() => handleSubmit()}>
              Submit All
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </div>
  );
};

export default Workout;
