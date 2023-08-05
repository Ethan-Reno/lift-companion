import { z } from 'zod';
import { workoutMetricSchema } from './WorkoutMetricSchema';

const defaultFields = {
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

export const metricInputSchema = {
  name: z.string(),
  label1: z.string(),
  label2: z.string(),
  label3: z.string(),
  label4: z.string(),
  label5: z.string(),
}

export const metricSchema = z.object({
  ...defaultFields,
  ...metricInputSchema,
  workoutMetrics: z.array(workoutMetricSchema).optional(),
});

export const createMetricSchema = z.object({
  name: z.string(),
  label1: z.string().optional(),
  label2: z.string().optional(),
  label3: z.string().optional(),
  label4: z.string().optional(),
  label5: z.string().optional(),
  // userId coming trom tRPC context
});

export const updateMetricSchema = z.object({
  ...metricInputSchema,
  id: z.string().cuid(),
});

export const deleteMetricSchema = z.string().cuid();

// Type definitions
export type Metric = z.infer<typeof metricSchema>;
export type CreateMetricInputs = z.infer<typeof createMetricSchema>;
export type UpdateMetricInputs = z.infer<typeof updateMetricSchema>;
export type DeleteMetricInputs = z.infer<typeof deleteMetricSchema>;
