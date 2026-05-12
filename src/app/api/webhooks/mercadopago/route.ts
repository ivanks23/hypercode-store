import {
  OrderStatus,
  PaymentStatus,
} from "@prisma/client";

import { NextResponse } from "next/server";

import { getPaymentInfo } from "@/services/payment.service";

import {
  createPaymentRecord,
  getPaymentByProviderId,
  updateOrderStatus,
} from "@/services/order.service";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    console.log(
      "Mercado Pago webhook:",
      body
    );

    if (
      body.type !==
      "payment"
    ) {
      return NextResponse.json({
        received: true,
      });
    }

    const paymentId =
      body.data?.id;

    if (!paymentId) {
      return NextResponse.json(
        {
          error:
            "Missing payment id",
        },
        {
          status: 400,
        }
      );
    }

let payment;

try {
  payment =
    await getPaymentInfo(
      String(paymentId)
    );
} catch (error) {
  console.error(
    "Payment lookup failed:",
    error
  );

  return NextResponse.json({
    received: true,
  });
};

console.log(
  "PAYMENT FULL:",
  payment
);

const existingPayment =
  await getPaymentByProviderId(
    String(payment.id)
  );

if (existingPayment) {
  console.log(
    "Payment already processed:",
    payment.id
  );

  return NextResponse.json({
    received: true,
    duplicate: true,
  });
}

    const orderId =
      payment.external_reference;

    if (!orderId) {
      return NextResponse.json(
        {
          error:
            "Missing external reference",
        },
        {
          status: 400,
        }
      );
    }

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

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Webhook error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Webhook failed",
      },
      {
        status: 500,
      }
    );
  }
}