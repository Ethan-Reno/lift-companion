import { z } from 'zod';

export const MeasurementEnum = z.enum(['Weight', 'Distance', 'Time']);
export const UnitEnum = z.enum(['Pound', 'Kilogram', 'Meter', 'Mile', 'Kilometer', 'Second', 'Minute', 'Hour']);
export const StatusEnum = z.enum(['Active', 'Inactive', 'Deleted', 'Archived']);

export const exerciseSchema = z.object({
  name: z.string(),
  description: z.string(),
  measurement: MeasurementEnum,
  unit: UnitEnum,
  status: StatusEnum,
});
export type ExerciseSchema = z.infer<typeof exerciseSchema>;

export const createExerciseSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  measurement: MeasurementEnum,
  unit: UnitEnum,
});
export type CreateExerciseSchema = z.infer<typeof createExerciseSchema>;
