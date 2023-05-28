import { z, type TypeOf } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const createExerciseSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  //meausrement enum is required
  measurement: z.enum(['WeightRep', 'DistanceRep', 'TimeRep']),
  primaryUnit: z.enum(['POUND', 'KILOGRAM', 'METER', 'MILE', 'KILOMETER', 'YARD', 'SECOND', 'MINUTE', 'HOUR']),
});

export type CreateExerciseInputs = TypeOf<typeof createExerciseSchema>;

export const exerciseRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.exercise.findMany({
        select: {
          name: true,
          description: true,
          measurement: true,
        },
        orderBy: {
          createdAt: "desc",
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
});
