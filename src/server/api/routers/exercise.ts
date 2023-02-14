import { z, type TypeOf } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const createExerciseSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }).min(1),
  primaryUnit: z.string({
    required_error: "primaryUnit is required",
    invalid_type_error: "primaryUnit must be a string",
  }).min(1),
  secondaryUnit: z.string({
    required_error: "secondaryUnit is required",
    invalid_type_error: "secondaryUnit must be a string",
  }).min(1)
})

export type CreateExerciseInputs = TypeOf<typeof createExerciseSchema>;
// export type CreateExerciseInputsType = z.infer<typeof createExerciseInputs>

export const exerciseRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.exercise.findMany({
        select: {
          name: true,
          primaryUnit: true,
          secondaryUnit: true,
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
            primaryUnit: input.primaryUnit,
            secondaryUnit: input.secondaryUnit,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});