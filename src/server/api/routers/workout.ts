import { createTRPCRouter, protectedProcedure } from '../trpc';
import { createWorkoutSchema } from '../../../schemas/WorkoutSchema';

export const workoutRouter = createTRPCRouter({
  create: protectedProcedure
  .input(createWorkoutSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      await ctx.prisma.workout.create({
        data: {
          exerciseId: input.exerciseId,
          workoutMetrics: {
            create: input.workoutMetrics,
          },
          sets: {
            create: input.sets,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }),
});
