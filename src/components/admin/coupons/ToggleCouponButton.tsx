"use client";

import {
  useTransition,
} from "react";

import { useRouter } from "next/navigation";

import { toggleCouponStatusAction } from "@/actions/toggle-coupon-status";

type Props = {
  couponId: string;
  active: boolean;
};

export function ToggleCouponButton({
  couponId,
  active,
}: Props) {

  const router =
    useRouter();

  const [
    isPending,
    startTransition,
  ] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() =>
        startTransition(
          async () => {

            await toggleCouponStatusAction(
              couponId
            );

            router.refresh();
          }
        )
      }
      className="rounded-xl border px-4 py-2 text-sm font-medium"
    >
      {isPending
        ? "Updating..."
        : active
          ? "Disable"
          : "Enable"}
    </button>
  );
}