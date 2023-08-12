import { z } from 'zod';
import { ExerciseStatus, Measurement } from '@prisma/client';
import { workoutSchema } from './WorkoutSchema';

const defaultFields = {
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

export const exerciseInputSchema = {
  name: z.string().min(1),
  description: z.string().min(1),
  measurement: z.nativeEnum(Measurement),
};

export const exerciseSchema = z.object({
  ...defaultFields,
  ...exerciseInputSchema,
  status: z.nativeEnum(ExerciseStatus),
  workouts: z.array(workoutSchema).optional(),
});

export const createExerciseSchema = z.object({
  ...exerciseInputSchema,
  // userId coming from tRPC context
});

export const updateExerciseSchema = z.object({
  ...exerciseInputSchema,
  id: z.string().cuid(),
});

export const getExerciseByIdSchema = z.string().cuid();
export const deleteExerciseSchema = z.string().cuid();

// Type definitions
export type Exercise = z.infer<typeof exerciseSchema>;
export type GetExerciseByIdSchema = z.infer<typeof getExerciseByIdSchema>;
export type CreateExerciseInputs = z.infer<typeof createExerciseSchema>;
export type UpdateExerciseInputs = z.infer<typeof updateExerciseSchema>;
export type DeleteExerciseInputs = z.infer<typeof deleteExerciseSchema>;

// Enum definitions
export const EXERCISE_STATUS = z.nativeEnum(ExerciseStatus);
export type ExerciseStatusEnum = z.infer<typeof EXERCISE_STATUS>;
export const MEASUREMENT = z.nativeEnum(Measurement);
export type MeasurementEnum = z.infer<typeof MEASUREMENT>;
