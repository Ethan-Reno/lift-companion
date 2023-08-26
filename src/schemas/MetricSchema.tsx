import { z } from "zod";
import { Scale } from "@prisma/client";
import { metricOptionInputSchema, metricOptionSchema } from "./MetricOptionSchema";

const defaultFields = {
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

const baseMetricInputs = {
  name: z.string().min(1, { message: 'Must include a name.' }),
  description: z.string().min(1, { message: 'Must include a description.' }),
  scale: z.nativeEnum(Scale),
};

export const baseMetricInputsSchema = z.object(baseMetricInputs);

// Nominal Metrics
export const nominalMetricInputSchema = {
  ...baseMetricInputs,
  options: z.array(metricOptionSchema),
};

export const nominalMetricSchema = z.object({
  ...defaultFields,
  ...nominalMetricInputSchema,
});

export const createNominalMetricSchema = z.object({
  ...nominalMetricInputSchema,
  options: z.array(z.object(metricOptionInputSchema)),
});

export const updateNominalMetricSchema = z.object({
  ...nominalMetricInputSchema,
  id: z.string().cuid(),
});


// Ordinal Metrics
export const ordinalMetricInputSchema = {
  ...baseMetricInputs,
  options: z.array(metricOptionSchema),
};

export const ordinalMetricSchema = z.object({
  ...defaultFields,
  ...ordinalMetricInputSchema,
});

export const createOrdinalMetricSchema = z.object({
  ...ordinalMetricInputSchema,
  options: z.array(z.object(metricOptionInputSchema)),
});

export const updateOrdinalMetricSchema = z.object({
  ...ordinalMetricInputSchema,
  id: z.string().cuid(),
});


// Interval Metrics
export const intervalMetricInputSchema = {
  ...baseMetricInputs,
  min: z.number().optional().nullable(),
  max: z.number().optional().nullable(),
  step: z.number().min(1, { message: 'Step must be greater than 0.'}),
};

export const intervalMetricSchema = z.object({
  ...defaultFields,
  ...intervalMetricInputSchema,
});

export const createIntervalMetricSchema = z.object({
  ...intervalMetricInputSchema
});

export const updateIntervalMetricSchema = z.object({
  ...intervalMetricInputSchema,
  id: z.string().cuid(),
});


// Ratio Metrics
export const ratioMetricInputSchema = {
  ...defaultFields,
  ...baseMetricInputs,
  max: z.number().optional().nullable(),
  step: z.number().min(1, { message: 'Step must be greater than 0.'}),
};

export const ratioMetricSchema = z.object({
  ...defaultFields,
  ...ratioMetricInputSchema,
});

export const createRatioMetricSchema = z.object({
  ...ratioMetricInputSchema
});

export const updateRatioMetricSchema = z.object({
  ...ratioMetricInputSchema,
  id: z.string().cuid(),
});

export const deleteMetricSchema = z.string().cuid();


// Type definitions
export type BaseMetricInputs = z.infer<typeof baseMetricInputsSchema>;

export type NominalMetric = z.infer<typeof nominalMetricSchema>;
export type CreateNominalMetricInputs = z.infer<typeof createNominalMetricSchema>;
export type UpdateNominalMetricInputs = z.infer<typeof updateNominalMetricSchema>;

export type OrdinalMetric = z.infer<typeof ordinalMetricSchema>;
export type CreateOrdinalMetricInputs = z.infer<typeof createOrdinalMetricSchema>;
export type UpdateOrdinalMetricInputs = z.infer<typeof updateOrdinalMetricSchema>;

export type IntervalMetric = z.infer<typeof intervalMetricSchema>;
export type CreateIntervalMetricInputs = z.infer<typeof createIntervalMetricSchema>;
export type UpdateIntervalMetricInputs = z.infer<typeof updateIntervalMetricSchema>;

export type RatioMetric = z.infer<typeof ratioMetricSchema>;
export type CreateRatioMetricInputs = z.infer<typeof createRatioMetricSchema>;
export type UpdateRatioMetricInputs = z.infer<typeof updateRatioMetricSchema>;

export type DeleteMetricInputs = z.infer<typeof deleteMetricSchema>;

export type Metric = NominalMetric | OrdinalMetric | IntervalMetric | RatioMetric;

// Enum definitions
export const SCALE = z.nativeEnum(Scale);
export type ScaleEnum = z.infer<typeof SCALE>;

export const hasOptions = (metric: Metric): metric is NominalMetric | OrdinalMetric => {
  return 'options' in metric;
}
