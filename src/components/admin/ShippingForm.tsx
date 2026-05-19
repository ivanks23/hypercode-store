"use client";

import {
  useState,
  useTransition,
} from "react";

import { updateShippingAction } from "@/actions/update-shipping";
import { useRouter } from "next/navigation";

type Props = {
  orderId: string;
};

export function ShippingForm({
  orderId,
}: Props) {

  const [carrier, setCarrier] =
    useState("");

  const router = useRouter();

  const [
    trackingNumber,
    setTrackingNumber,
  ] = useState("");

  const [isPending, startTransition] =
    useTransition();

  return (
    <div className="rounded-[32px] border bg-white p-8 shadow-sm">

      <h2 className="mb-8 text-2xl font-bold">
        Shipment
      </h2>

      <div className="space-y-5">

        <div>

          <label className="mb-2 block text-sm font-medium">
            Carrier
          </label>

          <input
            value={carrier}
            onChange={(e) =>
              setCarrier(
                e.target.value
              )
            }
            placeholder="DHL"
            className="w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-black"
          />
        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Tracking Number
          </label>

          <input
            value={trackingNumber}
            onChange={(e) =>
              setTrackingNumber(
                e.target.value
              )
            }
            placeholder="DHL123456"
            className="w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-black"
          />
        </div>

        <button
          disabled={isPending}
          onClick={() => {

            startTransition(
              async () => {

                await updateShippingAction({
                  orderId,
                  carrier,
                  trackingNumber,
                });

                router.refresh();
              }
            );
          }}
          className="w-full rounded-2xl bg-black px-6 py-4 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {isPending
            ? "Updating..."
            : "Mark as shipped"}
        </button>
      </div>
    </div>
  );
}