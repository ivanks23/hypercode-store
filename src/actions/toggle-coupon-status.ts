"use server";

import { toggleCouponStatus } from "@/services/coupon.service";

export async function toggleCouponStatusAction(
  couponId: string
) {

  await toggleCouponStatus(
    couponId
  );

  return {
    success: true,
  };
}