import { z } from 'zod';

export const exerciseSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  measurement: z.enum(['Weight', 'Distance', 'Time']),
  unit: z.enum(['Pound', 'Kilogram', 'Meter', 'Mile', 'Kilometer', 'Second', 'Minute', 'Hour']),
  status: z.enum(['Active', 'Inactive', 'Deleted', 'Archived']),
});
export type Exercise = z.infer<typeof exerciseSchema>;

export const createExerciseSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  measurement: z.enum(['Weight', 'Distance', 'Time']),
  unit: z.enum(['Pound', 'Kilogram', 'Meter', 'Mile', 'Kilometer', 'Second', 'Minute', 'Hour']),
});
export type CreateExercise = z.infer<typeof createExerciseSchema>;
