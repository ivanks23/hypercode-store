import { prisma } from "@/lib/prisma";

type ConfirmPaymentInput = {
  orderId: string;

  paymentId: string;

  amount: number;

  provider: "MERCADOPAGO";
};

export async function confirmPayment({
  orderId,
  paymentId,
  amount,
  provider,
}: ConfirmPaymentInput) {
  const existingPayment =
    await prisma.payment.findFirst({
      where: {
        providerPaymentId:
          paymentId,
      },
    });

  if (existingPayment) {
    return existingPayment;
  }

  return prisma.$transaction(
    async (tx) => {
      const payment =
        await tx.payment.create({
          data: {
            provider,

            status:
              "APPROVED",

            amount,

            providerPaymentId:
              paymentId,

            orderId,
          },
        });

      await tx.order.update({
        where: {
          id: orderId,
        },

        data: {
          status: "PAID",
        },
      });

      return payment;
    }
  );
}
