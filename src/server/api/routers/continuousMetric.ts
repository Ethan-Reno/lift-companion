import {
  createContinuousMetricSchema,
  deleteContinuousMetricSchema,
  updateContinuousMetricSchema
} from "../../../schemas/ContinuousMetricSchema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const continuousMetricRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.continuousMetric.findMany({
        where: {
          userId: ctx.session.user.id,
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
    .input(createContinuousMetricSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.continuousMetric.create({
          data: {
            user: {
              connect: {
                id: ctx.session.user.id,
              },
            },
            name: input.name,
            description: input.description,
            scale: input.scale,
            min: input.min,
            max: input.max,
            step: input.step,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  ),
  delete: protectedProcedure
    .input(deleteContinuousMetricSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.continuousMetric.delete({
          where: {
            id: input,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  ),
  update: protectedProcedure
    .input(updateContinuousMetricSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.continuousMetric.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
            description: input.description,
            scale: input.scale,
            min: input.min,
            max: input.max,
            step: input.step,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  ),
});
