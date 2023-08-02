import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { CreateWorkoutInputs } from "../schemas/WorkoutSchema";
import { Exercise } from '../schemas/ExerciseSchema';

interface AppState {
  shouldRefetch: boolean;
  setShouldRefetch: (shouldRefetch: boolean) => void;
  workoutFormState: Record<string, CreateWorkoutInputs>;  // Map of exercise IDs to form states
  setWorkoutFormState: (
    formState: Record<string, CreateWorkoutInputs> |
    ((currentFormStates: Record<string, CreateWorkoutInputs>) => Record<string, CreateWorkoutInputs>)
  ) => void;
  selectedExercises: Exercise[];
  setSelectedExercises: (selectedExercises: Exercise[]) => void;
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      shouldRefetch: false,
      setShouldRefetch: (shouldRefetch) => set({ shouldRefetch }),
      workoutFormState: {},
      setWorkoutFormState: (formState) => set((state) => {
        if (typeof formState === 'function') {
          return { workoutFormState: formState(state.workoutFormState) };
        }

        return { workoutFormState: formState };
      }),
      selectedExercises: [],
      setSelectedExercises: (selectedExercises) => set({ selectedExercises: [...selectedExercises] }),
    }),
    {
      name: 'lift-companion-storage',
    },
  ),
);

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useStore);
}
