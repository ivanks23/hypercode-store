"use client";

import { useTransition } from "react";
import { toggleProductStatus } from "@/actions/toggle-product-status";

type Props = {
  productId: string;
  active: boolean;
};

export function ProductStatusToggle({
  productId,
  active,
}: Props) {

  const [isPending, startTransition] =
    useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() => {

        startTransition(
          async () => {

            await toggleProductStatus(
              productId,
              !active
            );

            window.location.reload();
          }
        );
      }}
      className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
        active
          ? "bg-green-100 text-green-700 hover:bg-green-200"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {active
        ? "ACTIVE"
        : "INACTIVE"}
    </button>
  );
}