import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type CreateOrderInput = {
  userId?: string;

  items: {
    variantId: string;

    productName: string;

    variantName: string;

    sku?: string;

    quantity: number;

    unitPrice: number;
  }[];

  shippingAddress: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
};

export async function createOrder({
  userId,
  items,
  shippingAddress,
}: CreateOrderInput) {
  const subtotal = items.reduce(
    (acc, item) =>
      acc +
      item.unitPrice * item.quantity,
    0
  );

  const total = subtotal;

  return prisma.order.create({
    data: {
      userId,
      subtotal,
      total,
      shippingAddress: shippingAddress as Prisma.InputJsonValue,
      items: {
        create: items.map((item) => ({
          productName: item.productName,
          variantName: item.variantName,
          sku: item.sku || "",
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          variantId: item.variantId,
        })),
      },
    },

    include: {
      items: true,
    },
  });
}
