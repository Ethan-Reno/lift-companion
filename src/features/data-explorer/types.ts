import { ExerciseSchema } from "../../schemas/ExerciseSchema";
import { WorkoutSchema } from "../../schemas/WorkoutSchema";

export interface Set {
  reps: number;
  value: number;
  rpe: number;
}

export interface ExerciseWorkouts {   
  exercise: ExerciseSchema;
  workouts: WorkoutSchema[];
};

export interface ExerciseWorkoutData {
  data: ExerciseWorkouts[];
}
