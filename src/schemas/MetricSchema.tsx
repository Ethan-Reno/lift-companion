import { z } from 'zod';
import { Scale } from '@prisma/client';
import { metricOptionInputSchema, metricOptionSchema } from './MetricOptionSchema';

const defaultFields = {
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

export const metricInputSchema = {
  name: z.string(),
  scale: z.nativeEnum(Scale),
  options: z.array(metricOptionSchema),
}

export const metricSchema = z.object({
  ...defaultFields,
  ...metricInputSchema,
});

export const createMetricSchema = z.object({
  name: z.string(),
  scale: z.nativeEnum(Scale),
  options: z.array(z.object(metricOptionInputSchema)),
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

// Enum definitions
export const SCALE = z.nativeEnum(Scale);
export type ScaleEnum = z.infer<typeof SCALE>;
