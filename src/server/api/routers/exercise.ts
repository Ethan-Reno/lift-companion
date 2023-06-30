import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const getExerciseByIdSchema = z.string().cuid();
export type GetExerciseByIdSchema = z.infer<typeof getExerciseByIdSchema>;

export const createExerciseSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  measurement: z.enum(["weight", "distance", "time"]),
});
export type CreateExerciseSchema = z.infer<typeof createExerciseSchema>;

export const updateExerciseSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  measurement: z.enum(["weight", "distance", "time"]),
});
export type UpdateExerciseSchema = z.infer<typeof updateExerciseSchema>;

export const deleteExerciseSchema = z.string().cuid();
export type DeleteExerciseSchema = z.infer<typeof deleteExerciseSchema>;

export const exerciseRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.exercise.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          measurement: true,
          status: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }),
  getById: protectedProcedure
    .input(getExerciseByIdSchema)
    .query(async ({ ctx, input }) => {
    try {
      return await ctx.prisma.exercise.findFirst({
        where: {
          id: input,
        },
        select: {
          id: true,
          name: true,
          description: true,
          measurement: true,
          status: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }),
  create: protectedProcedure
    .input(createExerciseSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.exercise.create({
          data: {
            name: input.name,
            description: input.description,
            measurement: input.measurement,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  softDelete: protectedProcedure
    .input(deleteExerciseSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.exercise.update({
          where: {
            id: input,
          },
          data: {
            status: "deleted",
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  ),
  hardDelete: protectedProcedure
  .input(deleteExerciseSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      await ctx.prisma.exercise.delete({
        where: {
          id: input,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
),
  update: protectedProcedure
    .input(updateExerciseSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.exercise.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
            description: input.description,
            measurement: input.measurement,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  ),
});
