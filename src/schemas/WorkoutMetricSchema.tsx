import { z } from 'zod';

const defaultFields = {
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

export const workoutMetricInputSchema = {
  value: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
};

export const workoutMetricSchema = z.object({
  ...defaultFields,
  ...workoutMetricInputSchema,
  workoutId: z.string().cuid(),
  metricId: z.string().cuid(),
});

export const createWorkoutMetricSchema = z.object({
  ...workoutMetricInputSchema,
  metricId: z.string().cuid(),
});

export const updateWorkoutMetricSchema = z.object({
  ...workoutMetricInputSchema,
  id: z.string().cuid(),
});

export const deleteWorkoutMetricSchema = z.string().cuid();

// Type definitions
export type WorkoutMetric = z.infer<typeof workoutMetricSchema>;
export type CreateWorkoutMetricInputs = z.infer<typeof createWorkoutMetricSchema>;
export type UpdateWorkoutMetricInputs = z.infer<typeof updateWorkoutMetricSchema>;
export type DeleteWorkoutMetricInputs = z.infer<typeof deleteWorkoutMetricSchema>;
