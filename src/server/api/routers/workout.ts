import { createTRPCRouter, protectedProcedure } from '../trpc';
import { WORKOUT_STATUS, createWorkoutSchema } from '../../../schemas/WorkoutSchema';

export const workoutRouter = createTRPCRouter({
  create: protectedProcedure
  .input(createWorkoutSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      await ctx.prisma.workout.create({
        data: {
          exerciseId: input.exerciseId,
          status: input.status,
          insights: {
            create: input.insights,
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
  getCompletedWorkouts: protectedProcedure.query(async ({ ctx }) => {
    try {
      // Fetch all completed workouts, include the related Exercise for each Workout
      return await ctx.prisma.workout.findMany({
        where: {
          status: WORKOUT_STATUS.enum.completed,
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
