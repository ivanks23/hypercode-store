"use server";

import { checkoutSchema } from "@/schemas/checkout.schema";
import { createPreference } from "@/services/payment.service";
import { createOrder } from "@/services/order.service";
import { auth } from "@/auth";

type Payload = {
  formData: unknown;

  items: {
    variantId: string;

    productName: string;

    variantName: string;

    price: number;

    quantity: number;
  }[];
};

export async function createOrderAction({
  formData,
  items,
}: Payload) {
  const validated =
    checkoutSchema.parse(formData);

    const session =
      await auth();

  const order = await createOrder({
    userId:
      session?.user?.id,
    
      shippingAddress: validated,

    items: items.map((item) => ({
      variantId: item.variantId,

      productName:
        item.productName,

      variantName:
        item.variantName,

      quantity: item.quantity,

      unitPrice: item.price,
    })),
  });


  const paymentUrl =
    await createPreference({
      orderId: order.id,
      items: items.map((item) => ({
      id: item.variantId,

      title: `${item.productName} - ${item.variantName}`,

      quantity:
        item.quantity,

      unit_price:
        item.price,
      })),
    });

  return {
    success: true,
    orderId: order.id,
    paymentUrl,
};

}
