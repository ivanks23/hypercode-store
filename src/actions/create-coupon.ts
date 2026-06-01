"use server";

import { createCoupon } from "@/services/coupon.service";

type Payload = {
  code: string;

  discountType:
    "PERCENTAGE" |
    "FIXED";

  value: number;
};

export async function createCouponAction(
  payload: Payload
) {

  await createCoupon(
    payload
  );

  return {
    success: true,
  };
}