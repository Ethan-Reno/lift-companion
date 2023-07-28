import { createTRPCRouter, protectedProcedure } from "../trpc";
import { EXERCISE_STATUS, createExerciseSchema, deleteExerciseSchema, getExerciseByIdSchema, updateExerciseSchema } from "../../../schemas/ExerciseSchema";

export const exerciseRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.exercise.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        include: {
          workouts: {
            include: {
              sets: true,
              insights: true,
            },
          },
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
          userId: ctx.session.user.id,
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
            user: {
              connect: {
                id: ctx.session.user.id,
              },
            },
            name: input.name,
            description: input.description,
            measurement: input.measurement,
            status: EXERCISE_STATUS.enum.inactive,
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
            status: EXERCISE_STATUS.enum.deleted,
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
