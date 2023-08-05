import { createMetricSchema, deleteMetricSchema, updateMetricSchema } from "../../../schemas/MetricSchema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const metricRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.metric.findMany({
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
    .input(createMetricSchema)
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
            label1: input.label1,
            label2: input.label2,
            label3: input.label3,
            label4: input.label4,
            label5: input.label5,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
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
  update: protectedProcedure
    .input(updateMetricSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.metric.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
            label1: input.label1,
            label2: input.label2,
            label3: input.label3,
            label4: input.label4,
            label5: input.label5,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  ),
});
