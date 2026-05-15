import {
  OrderStatus,
  PaymentProvider,
  PaymentStatus,
  Prisma,
} from "@prisma/client";

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
  const subtotal =
    items.reduce(
      (acc, item) =>
        acc +
        item.unitPrice *
          item.quantity,
      0
    );

  const total = subtotal;

  return prisma.order.create({
    data: {
      userId,
      subtotal,
      total,
      shippingAddress:
        shippingAddress as Prisma.InputJsonValue,

      items: {
        create: items.map(
          (item) => ({
            productName:
              item.productName,
            variantName:
              item.variantName,
            sku:
              item.sku || "",
            quantity:
              item.quantity,
            unitPrice:
              item.unitPrice,
            variantId:
              item.variantId,
          })
        ),
      },
    },

    include: {
      items: true,
    },
  });
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
) {
  return prisma.order.update({
    where: {
      id: orderId,
    },

    data: {
      status,
    },
  });
}

type CreatePaymentInput = {
  orderId: string;
  amount: number;
  providerPaymentId: string;
  status: PaymentStatus;
};

export async function createPaymentRecord({
  orderId,
  amount,
  providerPaymentId,
  status,
}: CreatePaymentInput) {
  return prisma.payment.upsert({
    where: {
      orderId,
    },

    update: {
      providerPaymentId,
      status,
      amount,
    },

    create: {
      orderId,
      amount,
      provider: PaymentProvider.MERCADOPAGO,
      providerPaymentId,
      status,
    },
  });
}

export async function getUserOrders(
  userId: string
) {
  return prisma.order.findMany({
    where: {
      userId,
    },

    include: {
      items: true,
      payment: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getUserOrderById({
  orderId,
  userId,
}: {
  orderId: string;
  userId: string;
}) {
  return prisma.order.findFirst({
    where: {
      id: orderId,
      userId,
    },

    include: {
      items: {
        include: {
          variant: true,
        },
      },

      payment: true,
    },
  });
}

export async function getAdminOrders() {
  return prisma.order.findMany({
    include: {
      user: true,
      items: true,
      payment: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPaymentByProviderId(
  providerPaymentId: string
) {
  return prisma.payment.findFirst({
  where: {
    providerPaymentId,
  },
});
}

export async function decrementOrderInventory(
  orderId: string
) {

  const order =
    await prisma.order.findUnique({
      where: {
        id: orderId,
      },

      include: {
        items: true,
      },
    });

  if (!order) {
    throw new Error(
      "Order not found"
    );
  }

for (const item of order.items) {

  const variant =
    await prisma.productVariant.findUnique({
      where: {
        id:
          item.variantId,
      },
    });

  if (!variant) {
    throw new Error(
      "Variant not found"
    );
  }

  if (
    variant.stock <
    item.quantity
  ) {
    throw new Error(
      `Insufficient stock for ${variant.name}`
    );
  }

  await prisma.productVariant.update({
    where: {
      id:
        item.variantId,
    },

    data: {
      stock: {
        decrement:
          item.quantity,
      },
    },
  });
}
}