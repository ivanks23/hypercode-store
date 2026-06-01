"use client";

import {
  useTransition,
} from "react";

import { useRouter } from "next/navigation";
import { setDefaultAddressAction } from "@/actions/set-default-address";

type Props = {
  addressId: string;
};

export function SetDefaultAddressButton({
  addressId,
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

            await setDefaultAddressAction(
              addressId
            );

            router.refresh();
          }
        )
      }
      className="mt-4 rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-muted"
    >
      {isPending
        ? "Updating..."
        : "Set as Default"}
    </button>
  );
}