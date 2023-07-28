import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { CreateWorkoutInputs } from "../schemas/WorkoutSchema";

interface AppState {
  shouldRefetch: boolean;
  setShouldRefetch: (shouldRefetch: boolean) => void;
  initialExerciseId: string;
  setInitialExerciseId: (initialExerciseId: string) => void;
  workoutFormStates: Record<string, CreateWorkoutInputs>;  // Map of exercise IDs to form states
  setWorkoutFormState: (id: string, formState: CreateWorkoutInputs) => void;
  clearWorkoutFormState: () => void;
  clearWorkoutFormStateForId: (id: string) => void;
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      shouldRefetch: false,
      setShouldRefetch: (shouldRefetch) => set({ shouldRefetch }),
      initialExerciseId: '',
      setInitialExerciseId: (initialExerciseId) => set({ initialExerciseId }),
      workoutFormStates: {},
      setWorkoutFormState: (id, formState) => set((state) => ({ workoutFormStates: { ...state.workoutFormStates, [id]: formState } })),
      clearWorkoutFormState: () => set({ workoutFormStates: {} }),
      clearWorkoutFormStateForId: (id: string) => set((state) => {
        const { [id]: removed, ...rest } = state.workoutFormStates;
        return { workoutFormStates: rest };
      }),
    }),
    {
      name: 'lift-companion-storage',
    },
  ),
);

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useStore);
}
