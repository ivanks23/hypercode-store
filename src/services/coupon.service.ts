import { prisma } from "@/lib/prisma";

export async function getCoupons() {
  return prisma.coupon.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createCoupon({
  code,
  discountType,
  value,
}: {
  code: string;

  discountType:
    "PERCENTAGE" |
    "FIXED";

  value: number;
}) {

  return prisma.coupon.create({
    data: {
      code:
        code.toUpperCase(),

      discountType,

      value,
    },
  });
}

export async function toggleCouponStatus(
  couponId: string
) {

  const coupon =
    await prisma.coupon.findUnique({
      where: {
        id: couponId,
      },
    });

  if (!coupon) {
    throw new Error(
      "Coupon not found"
    );
  }

  return prisma.coupon.update({
    where: {
      id: couponId,
    },

    data: {
      active:
        !coupon.active,
    },
  });
}

export async function getCouponByCode(
  code: string
) {
  return prisma.coupon.findFirst({
    where: {
      code:
        code.toUpperCase(),

      active: true,
    },
  });
}