import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

const setSchema = z.object({
  reps: z.number().int(),
  value: z.number(),
  rpe: z.number(),
});

const insightSchema = z.object({
  mood: z.enum(["belowAverage", "average", "aboveAverage"]).optional(),
  sleepQuality: z.enum(["belowAverage", "average", "aboveAverage"]).optional(),
  energyLevel: z.enum(["belowAverage", "average", "aboveAverage"]).optional(),
  warmupQuality: z.enum(["belowAverage", "average", "aboveAverage"]).optional(),
});

export const workoutSchema = z.object({
  id: z.string().cuid(),
  status: z.enum(["active", "completed"]),
  exerciseId: z.string().cuid(),
  sets: z.array(setSchema),
  insights: insightSchema.optional(),
});
export type WorkoutSchema = z.infer<typeof workoutSchema>;

export const createWorkoutSchema = z.object({
  status: z.enum(["active", "completed"]),
  exerciseId: z.string().cuid(),
  sets: z.array(setSchema),
  insights: insightSchema.optional(),
});
export type CreateWorkoutSchema = z.infer<typeof createWorkoutSchema>;

export const updateWorkoutSchema = z.object({
  id: z.string().cuid(),
  status: z.enum(["active", "completed"]),
  exerciseId: z.string().cuid(),
  sets: z.array(setSchema),
  insights: insightSchema.optional(),
});
export type UpdateWorkoutSchema = z.infer<typeof updateWorkoutSchema>;

export const deleteWorkoutSchema = z.string().cuid();
export type DeleteWorkoutSchema = z.infer<typeof deleteWorkoutSchema>;

export const workoutRouter = createTRPCRouter({
  create: protectedProcedure
  .input(createWorkoutSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      await ctx.prisma.workout.create({
        data: {
          exerciseId: input.exerciseId,
          status: input.status,
          sets: input.sets,
          insights: input.insights,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }),
});
