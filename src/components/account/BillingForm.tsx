"use client";

import {
  useState,
  useTransition,
} from "react";

import { updateBillingProfileAction } from "@/actions/update-billing-profile";

type Props = {
  rfc?: string | null;

  businessName?: string | null;

  taxRegime?: string | null;

  cfdiUse?: string | null;
};

export function BillingForm({
  rfc,
  businessName,
  taxRegime,
  cfdiUse,
}: Props) {

  const [
    currentRfc,
    setCurrentRfc,
  ] = useState(
    rfc || ""
  );

  const [
    currentBusinessName,
    setCurrentBusinessName,
  ] = useState(
    businessName || ""
  );

  const [
    currentTaxRegime,
    setCurrentTaxRegime,
  ] = useState(
    taxRegime || ""
  );

  const [
    currentCfdiUse,
    setCurrentCfdiUse,
  ] = useState(
    cfdiUse || ""
  );

  const [
    isPending,
    startTransition,
  ] = useTransition();

  return (
    <div className="space-y-6">

      <div>

        <label className="mb-2 block text-sm font-medium">
          RFC
        </label>

        <input
          value={currentRfc}
          onChange={(e) =>
            setCurrentRfc(
              e.target.value.toUpperCase()
            )
          }
          className="w-full rounded-2xl border px-4 py-3"
        />
      </div>

      <div>

        <label className="mb-2 block text-sm font-medium">
          Business Name
        </label>

        <input
          value={
            currentBusinessName
          }
          onChange={(e) =>
            setCurrentBusinessName(
              e.target.value
            )
          }
          className="w-full rounded-2xl border px-4 py-3"
        />
      </div>

      <div>

        <label className="mb-2 block text-sm font-medium">
          Tax Regime
        </label>

        <input
          value={
            currentTaxRegime
          }
          onChange={(e) =>
            setCurrentTaxRegime(
              e.target.value
            )
          }
          className="w-full rounded-2xl border px-4 py-3"
        />
      </div>

      <div>

        <label className="mb-2 block text-sm font-medium">
          CFDI Use
        </label>

        <input
          value={
            currentCfdiUse
          }
          onChange={(e) =>
            setCurrentCfdiUse(
              e.target.value
            )
          }
          className="w-full rounded-2xl border px-4 py-3"
        />
      </div>

      <button
        disabled={isPending}
        onClick={() =>
          startTransition(
            async () => {

              await updateBillingProfileAction({
                rfc: currentRfc,

                businessName:
                  currentBusinessName,

                taxRegime:
                  currentTaxRegime,

                cfdiUse:
                  currentCfdiUse,
              });

              alert(
                "Billing profile updated"
              );
            }
          )
        }
        className="rounded-2xl bg-violet-600 px-6 py-3 font-semibold text-white"
      >
        {isPending
          ? "Saving..."
          : "Save Billing Data"}
      </button>

    </div>
  );
}