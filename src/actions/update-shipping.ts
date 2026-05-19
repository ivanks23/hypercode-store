"use server";

import { updateShippingInfo } from "@/services/order.service";

type Payload = {
  orderId: string;
  trackingNumber: string;
  carrier: string;
};

export async function updateShippingAction({
  orderId,
  trackingNumber,
  carrier,
}: Payload) {

  if (
    !trackingNumber ||
    !carrier
  ) {
    throw new Error(
      "Missing shipping info"
    );
  }

  await updateShippingInfo({
    orderId,
    trackingNumber,
    carrier,
  });

  return {
    success: true,
  };
}