import { prisma } from "@/lib/prisma";

export async function getDashboardAnalytics() {
  const [
    revenue,
    orders,
    customers,
    products,
    topProducts,
  ] = await Promise.all([
    prisma.payment.aggregate({
      where: {
        status: "APPROVED",
      },

      _sum: {
        amount: true,
      },
    }),

    prisma.order.count(),
    prisma.user.count(),
    prisma.product.count(),

    prisma.orderItem.groupBy({
      by: ["productName"],

      _sum: {
        quantity: true,
      },

      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },

      take: 5,
    }),
  ]);

  return {
    revenue:
      revenue._sum.amount ||
      0,

    orders,

    customers,

    products,

    topProducts,
  };
}