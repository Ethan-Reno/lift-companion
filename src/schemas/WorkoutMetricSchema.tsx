import { z } from 'zod';

const defaultFields = {
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

export const workoutMetricInputSchema = {
  categoricalMetricId: z.string().cuid().nullable().optional(),
  continuousMetricId: z.string().cuid().nullable().optional(),
  value: z.number(),
};

export const workoutMetricSchema = z.object({
  ...defaultFields,
  ...workoutMetricInputSchema,
  workoutId: z.string().cuid(),
});

export const createWorkoutMetricSchema = z.object({
  ...workoutMetricInputSchema,
});

export const updateWorkoutMetricSchema = z.object({
  id: z.string().cuid(),
});

export const deleteWorkoutMetricSchema = z.string().cuid();

// Type definitions
export type WorkoutMetric = z.infer<typeof workoutMetricSchema>;
export type CreateWorkoutMetricInputs = z.infer<typeof createWorkoutMetricSchema>;
export type UpdateWorkoutMetricInputs = z.infer<typeof updateWorkoutMetricSchema>;
export type DeleteWorkoutMetricInputs = z.infer<typeof deleteWorkoutMetricSchema>;
