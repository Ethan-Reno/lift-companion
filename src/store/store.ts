import { create } from 'zustand'
import { CreateWorkoutInputs } from "../schemas/WorkoutSchema";

interface AppState {
  shouldRefetch: boolean;
  setShouldRefetch: (shouldRefetch: boolean) => void;
  initialExerciseId: string;
  setInitialExerciseId: (initialExerciseId: string) => void;
  workoutFormStates: Record<string, CreateWorkoutInputs>;  // Map of exercise IDs to form states
  setWorkoutFormState: (id: string, formState: CreateWorkoutInputs) => void;
};

export const useStore = create<AppState>((set) => ({
  shouldRefetch: false,
  setShouldRefetch: (shouldRefetch) => set({ shouldRefetch }),
  initialExerciseId: '',
  setInitialExerciseId: (initialExerciseId) => set({ initialExerciseId }),
  workoutFormStates: {},
  setWorkoutFormState: (id, formState) => set((state) => ({ workoutFormStates: { ...state.workoutFormStates, [id]: formState } })),
}));
