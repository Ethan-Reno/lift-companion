import { createTRPCRouter } from "./trpc";
import { exerciseRouter } from "./routers/exercise";
import { authRouter } from "./routers/auth";
import { workoutRouter } from "./routers/workout";
import { categoricalMetricRouter } from "./routers/categoricalMetric";

/**
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  exercise: exerciseRouter,
  workout: workoutRouter,
  categoricalMetric: categoricalMetricRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
