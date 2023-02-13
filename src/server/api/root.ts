import { createTRPCRouter } from "./trpc";
import { exerciseRouter } from "./routers/exercise";
import { authRouter } from "./routers/auth";

/**
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  exercise: exerciseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
