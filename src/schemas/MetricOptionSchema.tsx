import { z } from 'zod';

const defaultFields = {
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

export const metricOptionInputSchema = {
  label: z.string(),
  value: z.number().optional().nullable(),
};

export const metricOptionSchema = z.object({
  ...defaultFields,
  ...metricOptionInputSchema,
  metricId: z.string().cuid(),
});

export const createMetricOptionSchema = z.object({
  ...metricOptionInputSchema,
  metricId: z.string().cuid(),
});

export const updateMetricOptionSchema = z.object({
  ...metricOptionInputSchema,
  id: z.string().cuid(),
});

export const deleteMetricOptionSchema = z.string().cuid();

// Type definitions
export type MetricOption = z.infer<typeof metricOptionSchema>;
export type CreateMetricOptionInputs = z.infer<typeof createMetricOptionSchema>;
export type UpdateMetricOptionInputs = z.infer<typeof updateMetricOptionSchema>;
export type DeleteMetricOptionInputs = z.infer<typeof deleteMetricOptionSchema>;
