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
          status: input.status,
          sets: input.sets,
          insights: input.insights,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }),
  getCompletedWorkouts: protectedProcedure.query(async ({ ctx }) => {
    try {
      // Fetch all completed workouts, include the related Exercise for each Workout
      return await ctx.prisma.workout.findMany({
        where: {
          status: 'completed',
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      console.error(error);
    }
  }),
});
