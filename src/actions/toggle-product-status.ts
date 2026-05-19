"use server";

import { prisma } from "@/lib/prisma";

export async function toggleProductStatus(
  productId: string,
  active: boolean
) {

  await prisma.product.update({
    where: {
      id: productId,
    },

    data: {
      active,
    },
  });

  return {
    success: true,
  };
}