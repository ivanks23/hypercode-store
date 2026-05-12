"use client";

import { useTransition } from "react";

import {
  OrderStatus,
} from "@prisma/client";

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

export function OrderStatusSelect({
  orderId,
  currentStatus,
}: Props) {
  const [
    isPending,
    startTransition,
  ] = useTransition();

  return (
    <select
      disabled={isPending}
      defaultValue={
        currentStatus
      }
      onChange={(e) => {
        const value =
          e.target
            .value as OrderStatus;

        startTransition(async () => {
          await updateOrderStatusAction({
            orderId,

            status: value,
          });

          window.location.reload();
        });
      }}
      className="rounded-xl border bg-white px-4 py-2 text-sm font-medium outline-none transition focus:border-violet-500"
    >
      {statuses.map(
        (status) => (
          <option
            key={status}
            value={status}
          >
            {status}
          </option>
        )
      )}
    </select>
  );
}