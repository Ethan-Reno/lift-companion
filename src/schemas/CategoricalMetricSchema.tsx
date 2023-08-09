import { z } from 'zod';
import { CategoricalScale } from '@prisma/client';
import { categoricalMetricOptionInputSchema, categoricalMetricOptionSchema, updateCategoricalMetricOptionSchema } from './CategoricalMetricOptionSchema';

const defaultFields = {
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

export const categoricalMetricInputSchema = {
  name: z.string(),
  description: z.string(),
  scale: z.nativeEnum(CategoricalScale),
  options: z.array(categoricalMetricOptionSchema),
}

export const categoricalMetricSchema = z.object({
  ...defaultFields,
  ...categoricalMetricInputSchema,
});

export const createCategoricalMetricSchema = z.object({
  name: z.string(),
  description: z.string(),
  scale: z.nativeEnum(CategoricalScale),
  options: z.array(z.object(categoricalMetricOptionInputSchema)),
  // userId coming trom tRPC context
});

export const updateCategoricalMetricSchema = z.object({
  ...categoricalMetricInputSchema,
  id: z.string().cuid(),
});

export const deleteCategoricalMetricSchema = z.string().cuid();

// Type definitions
export type CategoricalMetric = z.infer<typeof categoricalMetricSchema>;
export type CreateCategoricalMetricInputs = z.infer<typeof createCategoricalMetricSchema>;
export type UpdateCategoricalMetricInputs = z.infer<typeof updateCategoricalMetricSchema>;
export type DeleteCategoricalMetricInputs = z.infer<typeof deleteCategoricalMetricSchema>;

// Enum definitions
export const CATEGORICAL_SCALE = z.nativeEnum(CategoricalScale);
export type CategoricalScaleEnum = z.infer<typeof CATEGORICAL_SCALE>;
