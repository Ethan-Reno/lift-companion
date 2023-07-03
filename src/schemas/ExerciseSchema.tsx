import { z } from 'zod';
import { ExerciseStatus, Measurement } from '@prisma/client';
import { workoutSchema } from './WorkoutSchema';

export const exerciseSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  measurement: z.nativeEnum(Measurement),
  status: z.nativeEnum(ExerciseStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
  workouts: z.array(workoutSchema).optional(),
});

export const getExerciseByIdSchema = z.string().cuid();

export const createExerciseSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  measurement: z.nativeEnum(Measurement),
});

export const updateExerciseSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  measurement: z.nativeEnum(Measurement),
});

export const deleteExerciseSchema = z.string().cuid();

// Type definitions
export type Exercise = z.infer<typeof exerciseSchema>;
export type GetExerciseByIdSchema = z.infer<typeof getExerciseByIdSchema>;
export type CreateExerciseInputs = z.infer<typeof createExerciseSchema>;
export type UpdateExerciseInputs = z.infer<typeof updateExerciseSchema>;
export type DeleteExerciseInputs = z.infer<typeof deleteExerciseSchema>;

// Enum definitions
const exerciseStatus = z.nativeEnum(ExerciseStatus);
export type ExerciseStatusEnum = z.infer<typeof exerciseStatus>;
const measurement = z.nativeEnum(Measurement);
export type MeasurementEnum = z.infer<typeof measurement>;
