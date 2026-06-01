"use server";

import { getCouponByCode } from "@/services/coupon.service";

export async function validateCouponAction(
  code: string
) {

  const coupon =
    await getCouponByCode(
      code
    );

  if (!coupon) {
    return {
      valid: false,
    };
  }

  return {
    valid: true,

    coupon: {
      id: coupon.id,

      code: coupon.code,

      discountType:
        coupon.discountType,

      value:
        Number(
          coupon.value
        ),
    },
  };
}