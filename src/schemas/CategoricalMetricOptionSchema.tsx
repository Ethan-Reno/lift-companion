import { z } from 'zod';

const defaultFields = {
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

export const categoricalMetricOptionInputSchema = {
  label: z.string(),
  value: z.number(),
};

export const categoricalMetricOptionSchema = z.object({
  ...defaultFields,
  ...categoricalMetricOptionInputSchema,
  categoricalMetricId: z.string().cuid(),
});

export const createCategoricalMetricOptionSchema = z.object({
  ...categoricalMetricOptionInputSchema,
  categoricalMetricId: z.string().cuid(),
});

export const updateCategoricalMetricOptionSchema = z.object({
  ...categoricalMetricOptionInputSchema,
  id: z.string().cuid(),
});

export const deleteCategoricalMetricOptionSchema = z.string().cuid();

// Type definitions
export type MetricOption = z.infer<typeof categoricalMetricOptionSchema>;
export type CreateMetricOptionInputs = z.infer<typeof createCategoricalMetricOptionSchema>;
export type UpdateMetricOptionInputs = z.infer<typeof updateCategoricalMetricOptionSchema>;
export type DeleteMetricOptionInputs = z.infer<typeof deleteCategoricalMetricOptionSchema>;
