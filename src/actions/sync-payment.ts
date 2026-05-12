"use server";

import {
  OrderStatus,
  PaymentStatus,
} from "@prisma/client";

import { getPaymentInfo } from "@/services/payment.service";

import {
  createPaymentRecord,
  updateOrderStatus,
} from "@/services/order.service";

type Input = {
  paymentId: string;

  orderId: string;
};

export async function syncPaymentAction({
  paymentId,
  orderId,
}: Input) {
  const payment =
    await getPaymentInfo(
      paymentId
    );

  let paymentStatus: PaymentStatus =
    PaymentStatus.PENDING;

  let orderStatus: OrderStatus =
    OrderStatus.PENDING;

  switch (
    payment.status
  ) {
    case "approved":
      paymentStatus =
        PaymentStatus.APPROVED;

      orderStatus =
        OrderStatus.PAID;

      break;

    case "rejected":
    case "cancelled":
      paymentStatus =
        PaymentStatus.REJECTED;

      orderStatus =
        OrderStatus.CANCELLED;

      break;

    default:
      paymentStatus =
        PaymentStatus.PENDING;

      orderStatus =
        OrderStatus.PENDING;
  }

  await createPaymentRecord({
    orderId,

    amount:
      payment.transaction_amount ||
      0,

    providerPaymentId:
      String(payment.id),

    status:
      paymentStatus,
  });

  await updateOrderStatus(
    orderId,
    orderStatus
  );

  return {
    success: true,
  };
}