"use client";

import { useTransition } from "react";

import { OrderStatus } from "@prisma/client";

import { updateOrderStatusAction } from "@/actions/admin/update-order-status";

type Props = {
  orderId: string;

  currentStatus: OrderStatus;
};

const statuses: OrderStatus[] = [
  "PENDING",
  "PAID",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export function OrderStatusSelect({ orderId, currentStatus }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      disabled={isPending}
      defaultValue={currentStatus}
      onChange={(e) => {
        const value = e.target.value as OrderStatus;

        startTransition(async () => {
          await updateOrderStatusAction({
            orderId,

            status: value,
          });

          window.location.reload();
        });
      }}
      className={`rounded-full border-0 px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-black ${
        currentStatus === "PAID"
          ? "bg-green-100 text-green-700"
          : currentStatus === "PENDING"
            ? "bg-yellow-100 text-yellow-900"
            : currentStatus === "PROCESSING"
              ? "bg-blue-100 text-blue-900"
              : currentStatus === "SHIPPED"
                ? "bg-purple-100 text-purple-900"
                : currentStatus === "DELIVERED"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
      }`}
    >
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}
