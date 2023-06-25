import { z, type TypeOf } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const createExerciseSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  measurement: z.string().includes('weight' || 'distance' || 'time'),
});

export type CreateExerciseInputs = TypeOf<typeof createExerciseSchema>;

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
    .input(z.string())
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
  .input(z.string())
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
    .input(z.object({
      id: z.string(),
      name: z.string().min(1, { message: 'Name is required' }),
      description: z.string().min(1, { message: 'Description is required' }),
      measurement: z.string().includes('weight' || 'distance' || 'time'),
    }))
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
