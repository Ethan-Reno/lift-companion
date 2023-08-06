import { z } from 'zod';
import { workoutMetricInputSchema, workoutMetricSchema } from './WorkoutMetricSchema';
import { setInputSchema, setSchema } from './SetSchema';

const defaultFields = {
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

const workoutInputSchema = {
  sets: z.array(setSchema),
  workoutMetrics: z.array(workoutMetricSchema).optional(),
  exerciseId: z.string().cuid(),
};

export const workoutSchema = z.object({
  ...defaultFields,
  ...workoutInputSchema,
  exerciseId: z.string().cuid(),
});

export const createWorkoutSchema = z.object({
  sets: z.array(z.object(setInputSchema)),
  workoutMetrics: z.array(z.object(workoutMetricInputSchema)).optional(),
  exerciseId: z.string().cuid(),
});

export const updateWorkoutSchema = z.object({
  id: z.string().cuid(),
  sets: z.array(setSchema),
  workoutMetrics: z.array(workoutMetricSchema).optional(),
  exerciseId: z.string().cuid(),
});

export const deleteWorkoutSchema = z.string().cuid();

// Type definitions
export type Workout = z.infer<typeof workoutSchema>;
export type CreateWorkoutInputs = z.infer<typeof createWorkoutSchema>;
export type UpdateWorkoutInputs = z.infer<typeof updateWorkoutSchema>;
export type DeleteWorkoutInputs = z.infer<typeof deleteWorkoutSchema>;
