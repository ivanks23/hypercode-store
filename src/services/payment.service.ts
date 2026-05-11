import { Preference } from "mercadopago";
import { mercadopago } from "@/lib/mercadopago";

type CreatePreferenceInput = {
  orderId: string;

  items: {
    id: string;

    title: string;

    quantity: number;

    unit_price: number;
  }[];
};

import { Payment } from "mercadopago";

export async function getPaymentInfo(
  paymentId: string
) {
  const paymentClient =
    new Payment(mercadopago);

  return paymentClient.get({
    id: paymentId,
  });
}

export async function createPreference({
  orderId,
  items,
}: CreatePreferenceInput) {
  const preference = new Preference(mercadopago);
  
  const response =
    await preference.create({
      body: {
        items,

        external_reference:
          orderId,

        back_urls: {
          success: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
          failure: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/failure`,
          pending: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/pending`,
        },

        auto_return: "approved",
      },
    });


  return response.init_point!;
}
