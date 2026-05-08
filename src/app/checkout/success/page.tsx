
import { notFound } from "next/navigation";
import { getPaymentInfo } from "@/services/payment.service";
import { confirmPayment } from "@/services/payment-confirmation.service";
import { ClearCart } from "@/components/checkout/ClearCart";

type Props = {
  searchParams: Promise<{
    payment_id?: string;
  }>;
};

export default async function CheckoutSuccessPage({
  searchParams,
}: Props) {
  const params =
    await searchParams;

  if (!params.payment_id) {
    notFound();
  }

  const payment =
    await getPaymentInfo(
      params.payment_id
    );

  if (
    payment.status !==
    "approved"
  ) {
    return (
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold">
          Payment pending
        </h1>
      </main>
    );
  }

  const orderId =
    payment.external_reference;

  if (!orderId) {
    notFound();
  }

  await confirmPayment({
    orderId,

    paymentId:
      payment.id!.toString(),

    amount:
      payment.transaction_amount!,

    provider:
      "MERCADOPAGO",
  });

  return (
    <main className="container mx-auto p-8 text-center">
      <ClearCart />
      <h1 className="text-5xl font-bold text-green-600">
        Payment successful
      </h1>

      <p className="mt-6 text-lg text-gray-600">
        Your order has been confirmed.
      </p>

      <p className="mt-4">
        Order ID:
        {" "}
        {orderId}
      </p>
    </main>
  );
}
