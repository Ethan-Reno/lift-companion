import {
  createCategoricalMetricSchema,
  deleteCategoricalMetricSchema,
  updateCategoricalMetricSchema
} from "../../../schemas/CategoricalMetricSchema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const categoricalMetricRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.categoricalMetric.findMany({
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
  create: protectedProcedure
    .input(createCategoricalMetricSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.categoricalMetric.create({
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
    }),
  delete: protectedProcedure
    .input(deleteCategoricalMetricSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.categoricalMetric.delete({
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
    .input(updateCategoricalMetricSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.categoricalMetric.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
            scale: input.scale,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  ),
});
