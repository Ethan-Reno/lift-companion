import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { useStore } from '../../store/store';
import { Header } from '../../components';
import { WorkoutForm } from '../../features/workout-helper/WorkoutForm';
import { Exercise } from '../../schemas/ExerciseSchema';
import { Button, CheckIcon, Command, Popover, Tabs } from 'good-nice-ui';
import { cn } from '../../utils/cn';
import { CreateWorkoutInputs } from '../../schemas/WorkoutSchema';

const Workout = () => {
  const { initialExerciseId, workoutFormStates, setWorkoutFormState } = useStore();
  const { data: exercises, isLoading } = api.exercise.getAll.useQuery(); // don't show add more button until loaded
  const { mutate } = api.workout.create.useMutation({
    onSettled: () => {
      // router.push('/');
      console.log('Workout created');
    },
  });
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    if (exercises) {
      const initialExercise = exercises.find(exercise => exercise.id === initialExerciseId);
      if (initialExercise) {
        setSelectedExercises([initialExercise]);
      }
    }
  }, []);

  const toggleExerciseSelection = (exercise: Exercise) => {
    setSelectedExercises(selectedExercises => {
      const isSelected = selectedExercises.includes(exercise);
      if (isSelected) {
        return selectedExercises.filter(selected => selected.id !== exercise.id);
      } else {
        return [...selectedExercises, exercise];
      }
    });
  };

  const getIntialFormState = (id: string): CreateWorkoutInputs => {
    const defaultFormValues: CreateWorkoutInputs = {
      exerciseId: id,
      status: 'started',
      sets: [{ reps: 0, value: 0, rpe: 1 }],
      insights: [{}],
    }
    return workoutFormStates[id] || defaultFormValues;
  }

  const handleSubmit = () => {
    if (workoutFormStates) {
      Object.values(workoutFormStates).forEach((workout: CreateWorkoutInputs) => {
        if (workout.status === 'completed') mutate(workout);
      });
    }
  };

  return (
    <div className='flex flex-col w-full gap-16 items-center' id='WorkoutHelper'>
      <Header className='self-start'>Workout</Header>
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
                {exercises?.map((exercise: Exercise) => {
                  const isSelected = selectedExercises.includes(exercise);
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
      <Tabs defaultValue={initialExerciseId || selectedExercises[0]?.id || ''}>
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
              <WorkoutForm
                exerciseData={exercise}
                initialState={getIntialFormState(exercise.id)}
              />
            </Tabs.Content>
          ))}
      </Tabs>
      <Button onClick={() => handleSubmit()}>
        Submit Workouts
      </Button>
    </div>
  );
};

export default Workout;
