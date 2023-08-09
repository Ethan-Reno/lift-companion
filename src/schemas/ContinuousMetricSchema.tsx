import { z } from 'zod';
import { ContinuousScale } from '@prisma/client';

const defaultFields = {
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

export const continuousMetricInputSchema = {
  name: z.string(),
  description: z.string(),
  scale: z.nativeEnum(ContinuousScale),
  min: z.number(),
  max: z.number(),
  step: z.number()
}

export const continuousMetricSchema = z.object({
  ...defaultFields,
  ...continuousMetricInputSchema,
});

export const createContinuousMetricSchema = z.object({
  ...continuousMetricInputSchema,
  // userId coming from tRPC context
});

export const updateContinuousMetricSchema = z.object({
  ...continuousMetricInputSchema,
  id: z.string().cuid(),
});

export const deleteContinuousMetricSchema = z.string().cuid();

// Type definitions
export type ContinuousMetric = z.infer<typeof continuousMetricSchema>;
export type CreateContinuousMetricInputs = z.infer<typeof createContinuousMetricSchema>;
export type UpdateContinuousMetricInputs = z.infer<typeof updateContinuousMetricSchema>;
export type DeleteContinuousMetricInputs = z.infer<typeof deleteContinuousMetricSchema>;

// Enum definitions
export const CONTINUOUS_SCALE = z.nativeEnum(ContinuousScale);
export type ContinuousScaleEnum = z.infer<typeof CONTINUOUS_SCALE>;
