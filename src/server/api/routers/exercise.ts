import { z, type TypeOf } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const createExerciseSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  measurement: z.enum(['Weight', 'Distance', 'Time']),
  unit: z.enum(['Pound', 'Kilogram', 'Meter', 'Mile', 'Kilometer', 'Second', 'Minute', 'Hour']),
});

export type CreateExerciseInputs = TypeOf<typeof createExerciseSchema>;

export const exerciseRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.exercise.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          measurement: true,
          unit: true,
          status: true,
        },
        orderBy: {
          updatedAt: "desc",
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
            unit: input.unit,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
