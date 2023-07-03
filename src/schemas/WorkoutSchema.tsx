import { z } from 'zod';
import { WorkoutStatus, InsightValue } from '@prisma/client';

const insightSchema = z.object({
  id: z.string().cuid(),
  mood: z.nativeEnum(InsightValue).nullable(),
  sleepQuality: z.nativeEnum(InsightValue).nullable(),
  energyLevel: z.nativeEnum(InsightValue).nullable(),
  warmupQuality: z.nativeEnum(InsightValue).nullable(),
  workoutId: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const insightInputSchema = z.object({
  mood: z.nativeEnum(InsightValue).optional(),
  sleepQuality: z.nativeEnum(InsightValue).optional(),
  energyLevel: z.nativeEnum(InsightValue).optional(),
  warmupQuality: z.nativeEnum(InsightValue).optional(),
});

const setSchema = z.object({
  id: z.string().cuid(),
  reps: z.number(),
  value: z.number(),
  rpe: z.number(),
  workoutId: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const setInputSchema = z.object({
  reps: z.number(),
  value: z.number(),
  rpe: z.number(),
});

export const workoutSchema = z.object({
  id: z.string().cuid(),
  status: z.nativeEnum(WorkoutStatus),
  sets: z.array(setSchema),
  insights: z.array(insightSchema),
  exerciseId: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createWorkoutSchema = z.object({
  status: z.nativeEnum(WorkoutStatus),
  exerciseId: z.string().cuid(),
  sets: z.array(setInputSchema),
  insights: z.array(insightInputSchema),
});

export const updateWorkoutSchema = z.object({
  id: z.string().cuid(),
  status: z.nativeEnum(WorkoutStatus),
  exerciseId: z.string().cuid(),
  sets: z.array(setSchema),
  insights: z.array(insightInputSchema),
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
const insightValue = z.nativeEnum(InsightValue);
export type InsightValueEnum = z.infer<typeof insightValue>;
const workoutStatus = z.nativeEnum(WorkoutStatus);
export type WorkoutStatusEnum = z.infer<typeof workoutStatus>;
