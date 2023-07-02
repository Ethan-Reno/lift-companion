import { z } from 'zod';
import { WorkoutStatus } from '@prisma/client';
const insightValue = ["belowAverage", "average", "aboveAverage"] as const;

const insightSchema = z.object({
  mood: z.enum(insightValue).optional(),
  sleepQuality: z.enum(insightValue).optional(),
  energyLevel: z.enum(insightValue).optional(),
  warmupQuality: z.enum(insightValue).optional(),
});

const setSchema = z.object({
  reps: z.number().int(),
  value: z.number(),
  rpe: z.number(),
});

export const workoutSchema = z.object({
  id: z.string().cuid(),
  status: z.nativeEnum(WorkoutStatus),
  exerciseId: z.string().cuid(),
  sets: z.array(setSchema),
  insights: insightSchema.optional(),
});

export const createWorkoutSchema = z.object({
  status: z.nativeEnum(WorkoutStatus),
  exerciseId: z.string().cuid(),
  sets: z.array(setSchema),
  insights: insightSchema.optional(),
});

export const updateWorkoutSchema = z.object({
  id: z.string().cuid(),
  status: z.nativeEnum(WorkoutStatus),
  exerciseId: z.string().cuid(),
  sets: z.array(setSchema),
  insights: insightSchema.optional(),
});

export const deleteWorkoutSchema = z.string().cuid();

// Type definitions
export type Set = z.infer<typeof setSchema>;
export type Insight = z.infer<typeof insightSchema>;
export type Workout = z.infer<typeof workoutSchema>;
export type CreateWorkoutInputs = z.infer<typeof createWorkoutSchema>;
export type UpdateWorkoutInputs = z.infer<typeof updateWorkoutSchema>;
export type DeleteWorkoutInputs = z.infer<typeof deleteWorkoutSchema>;

// Enum definitions
const WorkoutStatusEnum = z.nativeEnum(WorkoutStatus);
export type WorkoutStatusEnum = z.infer<typeof WorkoutStatusEnum>;
