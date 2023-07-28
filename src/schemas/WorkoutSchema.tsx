import { z } from 'zod';
import { WorkoutStatus, InsightValue } from '@prisma/client';

const defaultFields = {
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

const insightSchema = z.object({
  ...defaultFields,
  mood: z.nativeEnum(InsightValue).nullable(),
  sleepQuality: z.nativeEnum(InsightValue).nullable(),
  energyLevel: z.nativeEnum(InsightValue).nullable(),
  warmupQuality: z.nativeEnum(InsightValue).nullable(),
  workoutId: z.string().cuid(),
});

const insightInputSchema = z.object({
  mood: z.nativeEnum(InsightValue).optional(),
  sleepQuality: z.nativeEnum(InsightValue).optional(),
  energyLevel: z.nativeEnum(InsightValue).optional(),
  warmupQuality: z.nativeEnum(InsightValue).optional(),
});

const setSchema = z.object({
  ...defaultFields,
  reps: z.number(),
  value: z.number(),
  rpe: z.number(),
  workoutId: z.string().cuid(),
});

const setInputSchema = z.object({
  reps: z.number(),
  value: z.number(),
  rpe: z.number(),
});

export const workoutSchema = z.object({
  ...defaultFields,
  status: z.nativeEnum(WorkoutStatus),
  sets: z.array(setSchema),
  insights: z.array(insightSchema),
  exerciseId: z.string().cuid(),
});

export const createWorkoutSchema = z.object({
  status: z.nativeEnum(WorkoutStatus),
  sets: z.array(setInputSchema),
  insights: z.array(insightInputSchema),
  exerciseId: z.string().cuid(),
});

export const updateWorkoutSchema = z.object({
  id: z.string().cuid(),
  status: z.nativeEnum(WorkoutStatus),
  sets: z.array(setSchema),
  insights: z.array(insightInputSchema),
  exerciseId: z.string().cuid(),
});

export const deleteWorkoutSchema = z.string().cuid();

// Type definitions
export type Set = z.infer<typeof setSchema>;
export type SetInput = z.infer<typeof setInputSchema>;
export type Insight = z.infer<typeof insightSchema>;
export type InsightInput = z.infer<typeof insightInputSchema>;
export type Workout = z.infer<typeof workoutSchema>;
export type CreateWorkoutInputs = z.infer<typeof createWorkoutSchema>;
export type UpdateWorkoutInputs = z.infer<typeof updateWorkoutSchema>;
export type DeleteWorkoutInputs = z.infer<typeof deleteWorkoutSchema>;

// Enum definitions
export const INSIGHT_KEYS = Object.keys(insightSchema.omit({id: true, updatedAt: true, createdAt: true, workoutId: true}).shape);
export const INSIGHT_VALUE = z.nativeEnum(InsightValue);
export type InsightValueEnum = z.infer<typeof INSIGHT_VALUE>;
export const WORKOUT_STATUS = z.nativeEnum(WorkoutStatus);
export type WorkoutStatusEnum = z.infer<typeof WORKOUT_STATUS>;
