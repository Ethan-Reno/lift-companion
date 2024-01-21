import React, { useEffect, useRef, useState } from 'react';
import { api } from '../../utils/api';
import { useStore } from '../../store/store';
import { Header } from '../../components';
import { WorkoutForm } from '../../features/workout-helper/WorkoutForm';
import { type Exercise } from '../../schemas/ExerciseSchema';
import { Alert, Button, ChevronDownIcon, DropdownMenu, Skeleton } from 'good-nice-ui';
import { ExercisesDropdown } from '../../features/workout-helper/ExercisesDropdown';
import { AlertCircle } from 'lucide-react';

const Workout = () => {
  const {
    selectedExercises,
    workoutFormState,
    setWorkoutFormState,
  } = useStore();
  const { data: exercises, isLoading } = api.exercise.getAll.useQuery();
  const [hasLeftoverDataWarning, setHasLeftoverDataWarning] = useState(Object.keys(workoutFormState).length > 0);
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

  const deriveTabTitle = () => {
    if (selectedExercises.length > 1) {
      return (
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
      );
    } 
    if (selectedExercises.length === 1) {
      return <span className='text-xl ml-4'>{activeExercise?.name}</span>;
    }
    return <span className='text-xl mr-5'>Select an exercise to begin</span>;
  };

  return (
    <div className='flex flex-col w-full gap-16 items-center' id='WorkoutHelper'>
      <Header className='self-start'>Workout</Header>
      {hasLeftoverDataWarning ? (
        <div className='flex flex-col gap-6 justify-center items-center'>
          <Alert>
            <AlertCircle className='w-5 h-5' />
            <Alert.Description className='mt-1'>
              There is unsubmitted data from a previous workout
            </Alert.Description>
          </Alert>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setHasLeftoverDataWarning(false);
              }}
            >
              Continue
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setWorkoutFormState({});
                setHasLeftoverDataWarning(false);
              }}
            >
              Start New
            </Button>
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-2 w-full sm:max-w-[450px]'>
          <div className='flex justify-between'>
            <div className='flex gap-2 items-center'>
              {deriveTabTitle()}
            </div>
            {isLoading && <Skeleton className='w-10 h-10' />}
            {!isLoading && exercises &&
              <ExercisesDropdown
                exercises={exercises}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
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
      )}
    </div>
  );
};

export default Workout;
