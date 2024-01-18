import { createTRPCRouter } from "~/server/api/trpc";
import { exerciseRouter } from "./routers/exercise";
import { authRouter } from "./routers/auth";
import { workoutRouter } from "./routers/workout";
import { metricRouter } from "./routers/metric";

/**
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  exercise: exerciseRouter,
  workout: workoutRouter,
  metric: metricRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
