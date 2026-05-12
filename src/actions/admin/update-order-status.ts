"use server";

import {
  OrderStatus,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function updateOrderStatusAction({
  orderId,
  status,
}: {
  orderId: string;

  status: OrderStatus;
}) {
  await prisma.order.update({
    where: {
      id: orderId,
    },

    data: {
      status,
    },
  });

  return {
    success: true,
  };
}