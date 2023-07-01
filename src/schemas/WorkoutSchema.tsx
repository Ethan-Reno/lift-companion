import { z } from 'zod';

const setSchema = z.object({
  reps: z.number().int(),
  value: z.number(),
  rpe: z.number(),
  isWarmup: z.boolean(),
});

const insightSchema = z.object({
  mood: z.enum(["belowAverage", "average", "aboveAverage"]),
  sleepQuality: z.enum(["belowAverage", "average", "aboveAverage"]),
  energyLevel: z.enum(["belowAverage", "average", "aboveAverage"]),
  warmupQuality: z.enum(["belowAverage", "average", "aboveAverage"]),
});

export const workoutSchema = z.object({
  id: z.string().cuid(),
  status: z.enum(["active", "completed"]),
  exerciseId: z.string().cuid(),
  sets: z.array(setSchema),
  insights: z.array(insightSchema),
});
export type WorkoutSchema = z.infer<typeof workoutSchema>;

export const createWorkoutSchema = z.object({
  status: z.enum(["active", "completed"]),
  exerciseId: z.string().cuid(),
  sets: z.array(setSchema),
  insights: z.array(insightSchema),
});
export type CreateWorkoutSchema = z.infer<typeof createWorkoutSchema>;

export const updateWorkoutSchema = z.object({
  id: z.string().cuid(),
  status: z.enum(["active", "completed"]),
  exerciseId: z.string().cuid(),
  sets: z.array(setSchema),
  insights: z.array(insightSchema),
});
export type UpdateWorkoutSchema = z.infer<typeof updateWorkoutSchema>;

export const deleteWorkoutSchema = z.string().cuid();
export type DeleteWorkoutSchema = z.infer<typeof deleteWorkoutSchema>;
