import { z } from 'zod';

const defaultFields = {
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

export const setInputSchema = {
  reps: z.number(),
  value: z.number(),
  rpe: z.number(),
  epley1rm: z.number(),
  brzycki1rm: z.number(),
  wathen1rm: z.number(),
};

export const setSchema = z.object({
  ...defaultFields,
  ...setInputSchema,
  workoutId: z.string().cuid(),
});

export const createSetSchema = z.object({
  ...setInputSchema,
  workoutId: z.string().cuid(),
});

export const updateSetSchema = z.object({
  ...setInputSchema,
  id: z.string().cuid(),
});

export const deleteSetSchema = z.string().cuid();

// Type definitions
export type Set = z.infer<typeof setSchema>;
export type CreateSetInputs = z.infer<typeof createSetSchema>;
export type UpdateSetInputs = z.infer<typeof updateSetSchema>;
export type DeleteSetInputs = z.infer<typeof deleteSetSchema>;
