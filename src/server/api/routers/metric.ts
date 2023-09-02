import { createIntervalMetricSchema, createNominalMetricSchema, createOrdinalMetricSchema, createRatioMetricSchema, deleteMetricSchema, updateNominalMetricSchema, updateOrdinalMetricSchema } from "../../../schemas/MetricSchema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const metricRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.metric.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        include: {
          options: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }),

  createCategorical: protectedProcedure
    .input(createNominalMetricSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.metric.create({
          data: {
            user: {
              connect: {
                id: ctx.session.user.id,
              },
            },
            name: input.name,
            description: input.description,
            scale: input.scale,
            options: {
              create: input.options,
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  ),
  updateCategorical: protectedProcedure
    .input(updateNominalMetricSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.metric.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
            description: input.description,
            scale: input.scale,
            // TODO allow for updating options
            // options: {
            //   updateMany: input.options,
            // },
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  ),
  createInterval: protectedProcedure
    .input(createIntervalMetricSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.metric.create({
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

  createRatio: protectedProcedure
    .input(createRatioMetricSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.metric.create({
          data: {
            user: {
              connect: {
                id: ctx.session.user.id,
              },
            },
            name: input.name,
            description: input.description,
            scale: input.scale,
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
    .input(deleteMetricSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.metric.delete({
          where: {
            id: input,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  ),
});
