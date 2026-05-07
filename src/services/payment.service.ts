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

export async function createPreference({
  orderId,
  items,
}: CreatePreferenceInput) {
  const preference = new Preference(mercadopago);

  const response = await preference.create({
    body: {
      items,

      external_reference: orderId,

      back_urls: {
        success: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,

        failure: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/failure`,
      },

      
    },
  });

  return response.init_point!;
}
