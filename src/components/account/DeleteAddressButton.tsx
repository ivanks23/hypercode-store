"use client";

import {
  useTransition,
} from "react";

import { useRouter } from "next/navigation";

import { Trash2 } from "lucide-react";

import { deleteAddressAction } from "@/actions/delete-address";

type Props = {
  addressId: string;
};

export function DeleteAddressButton({
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
      onClick={() => {

        const confirmed =
          window.confirm(
            "Delete this address?"
          );

        if (!confirmed) {
          return;
        }

        startTransition(
          async () => {

            await deleteAddressAction(
              addressId
            );

            router.refresh();
          }
        );
      }}
      className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}