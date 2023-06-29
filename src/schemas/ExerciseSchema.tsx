import { z } from 'zod';

export const exerciseSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  measurement: z.enum(["weight", "distance", "time"]),
  status: z.enum(["inactive", "active", "deleted"]),
});
export type ExerciseSchema = z.infer<typeof exerciseSchema>;

export const createExerciseSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  measurement: z.enum(["weight", "distance", "time"]),
});
export type CreateExerciseSchema = z.infer<typeof createExerciseSchema>;

export const updateExerciseSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  measurement: z.enum(["weight", "distance", "time"]),
});
export type UpdateExerciseSchema = z.infer<typeof updateExerciseSchema>;

export const deleteExerciseSchema = z.string().cuid();
export type DeleteExerciseSchema = z.infer<typeof deleteExerciseSchema>;
