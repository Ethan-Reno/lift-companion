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
  getLatestWorkouts: protectedProcedure.query(async ({ ctx }) => {
    try {
      // Fetch all completed workouts, include the related Exercise for each Workout
      const workouts = await ctx.prisma.workout.findMany({
        where: {
          status: 'completed',
        },
        include: {
          exercise: {
            select: {
              id: true,
              name: true,
              description: true,
              measurement: true,
              status: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
  
      // Group workouts by exercise and keep all workouts for each exercise
      const workoutGroups: Record<string, { exercise: any; workouts: typeof workouts }> = {};
      for (const workout of workouts) {
        const currentGroup = workoutGroups[workout.exercise.id];
        if (currentGroup) {
          currentGroup.workouts.push(workout);
        } else {
          workoutGroups[workout.exercise.id] = {
            exercise: workout.exercise,
            workouts: [workout],
          };
        }
      }
  
      // Sort the workout groups by most recent createdAt
      const sortedGroups = Object.values(workoutGroups).sort((a, b) => {
        const aWorkout = a.workouts[0];
        const bWorkout = b.workouts[0];
        if (aWorkout && bWorkout) {
          return bWorkout.createdAt.getTime() - aWorkout.createdAt.getTime();
        }
        return 0;
      });
  
      // Limit to the 5 exercises that have the most recent completed workouts
      const latestWorkouts = sortedGroups.slice(0, 5);
  
      return latestWorkouts;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }),
});
