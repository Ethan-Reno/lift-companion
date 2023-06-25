import { z } from 'zod';

export const exerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  measurement: z.string().includes('weight' || 'distance' || 'time'),
  status: z.string().includes('active' || 'inactive' || 'deleted'),
});
export type ExerciseSchema = z.infer<typeof exerciseSchema>;

export const createExerciseSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  measurement: z.string().includes('weight' || 'distance' || 'time'),
});
export type CreateExerciseSchema = z.infer<typeof createExerciseSchema>;
