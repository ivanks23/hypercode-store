"use client";

import {
  useState,
  useTransition,
} from "react";

import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { createCouponAction } from "@/actions/create-coupon";

export function CreateCouponDialog() {

  const router =
    useRouter();

  const [
    isPending,
    startTransition,
  ] = useTransition();

  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    code,
    setCode,
  ] = useState("");

  const [
    value,
    setValue,
  ] = useState("");

  const [
    discountType,
    setDiscountType,
  ] = useState<
    "PERCENTAGE" |
    "FIXED"
  >("PERCENTAGE");

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <DialogTrigger asChild>

        <button className="rounded-2xl bg-violet-600 px-5 py-3 font-semibold text-white">
          Create Coupon
        </button>

      </DialogTrigger>

      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Create Coupon
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-4">

          <input
            placeholder="WELCOME10"
            value={code}
            onChange={(e) =>
              setCode(
                e.target.value.toUpperCase()
              )
            }
            className="w-full rounded-xl border px-4 py-3"
          />

          <select
            value={discountType}
            onChange={(e) =>
              setDiscountType(
                e.target.value as
                  | "PERCENTAGE"
                  | "FIXED"
              )
            }
            className="w-full rounded-xl border px-4 py-3"
          >

            <option value="PERCENTAGE">
              Percentage
            </option>

            <option value="FIXED">
              Fixed Amount
            </option>

          </select>

          <input
            type="number"
            placeholder="10"
            value={value}
            onChange={(e) =>
              setValue(
                e.target.value
              )
            }
            className="w-full rounded-xl border px-4 py-3"
          />

          <button
            disabled={isPending}
            onClick={() =>
              startTransition(
                async () => {

                  await createCouponAction({
                    code,

                    discountType,

                    value:
                      Number(
                        value
                      ),
                  });

                  setOpen(false);

                  router.refresh();
                }
              )
            }
            className="w-full rounded-2xl bg-black px-6 py-4 font-semibold text-white"
          >
            {isPending
              ? "Creating..."
              : "Create Coupon"}
          </button>

        </div>

      </DialogContent>

    </Dialog>
  );
}