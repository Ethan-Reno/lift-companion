import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createExerciseSchema, deleteExerciseSchema, getExerciseByIdSchema, updateExerciseSchema } from "../../../schemas/ExerciseSchema";

export const exerciseRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.exercise.findMany({
        where: {
          userId: ctx.session.user.id,
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
  getAllExercisesWithCompletedWorkouts: protectedProcedure.query(async ({ ctx }) => {
    try {
      // First, get ids of all exercises with completed workouts
      const exerciseIds = await ctx.prisma.workout.findMany({
        where: {
          status: 'completed',
          exercise: {
            userId: ctx.session.user.id, // Only consider workouts from exercises that belong to the logged-in user
          },
        },
        select: {
          exerciseId: true, // Only fetch the exercise ids
        },
      }).then(workouts => workouts.map(workout => workout.exerciseId)); // map to get an array of ids
      
      if (exerciseIds.length === 0) {
        // No exercises with completed workouts were found
        return [];
      }

      // Fetch exercises and their completed workouts
      return await ctx.prisma.exercise.findMany({
        where: {
          id: {
            in: exerciseIds,
          },
        },
        include: {
          workouts: {
            where: {
              status: 'completed',
            },
            include: {
              sets: true,
              insights: true,
            },
          },
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
            status: 'inactive',
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
            status: 'deleted',
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
