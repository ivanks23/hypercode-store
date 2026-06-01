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

import { createAddressAction } from "@/actions/create-address";

export function CreateAddressDialog() {

  const router =
    useRouter();

  const [
    isPending,
    startTransition,
  ] = useTransition();

  const [
    fullName,
    setFullName,
  ] = useState("");

  const [
    phone,
    setPhone,
  ] = useState("");

  const [
    street,
    setStreet,
  ] = useState("");

  const [
    city,
    setCity,
  ] = useState("");

  const [
    state,
    setState,
  ] = useState("");

  const [
    zipCode,
    setZipCode,
  ] = useState("");

  const [
    country,
    setCountry,
  ] = useState("");

  const [
    open,
    setOpen,
  ] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <DialogTrigger asChild>

        <button className="rounded-2xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700">
          Add Address
        </button>

      </DialogTrigger>

      <DialogContent className="max-w-2xl">

        <DialogHeader>

          <DialogTitle>
            Add Address
          </DialogTitle>

        </DialogHeader>

        <div className="grid gap-4">

          <input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) =>
              setFullName(
                e.target.value
              )
            }
            className="rounded-xl border px-4 py-3"
          />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            className="rounded-xl border px-4 py-3"
          />

          <input
            placeholder="Street"
            value={street}
            onChange={(e) =>
              setStreet(
                e.target.value
              )
            }
            className="rounded-xl border px-4 py-3"
          />

          <input
            placeholder="City"
            value={city}
            onChange={(e) =>
              setCity(
                e.target.value
              )
            }
            className="rounded-xl border px-4 py-3"
          />

          <input
            placeholder="State"
            value={state}
            onChange={(e) =>
              setState(
                e.target.value
              )
            }
            className="rounded-xl border px-4 py-3"
          />

          <input
            placeholder="Zip Code"
            value={zipCode}
            onChange={(e) =>
              setZipCode(
                e.target.value
              )
            }
            className="rounded-xl border px-4 py-3"
          />

          <input
            placeholder="Country"
            value={country}
            onChange={(e) =>
              setCountry(
                e.target.value
              )
            }
            className="rounded-xl border px-4 py-3"
          />

          <button
            disabled={isPending}
            onClick={() => {

              startTransition(
                async () => {

                  await createAddressAction({
                    fullName,
                    phone,
                    street,
                    city,
                    state,
                    zipCode,
                    country,
                  });

                  setOpen(false);

                  router.refresh();
                }
              );
            }}
            className="rounded-2xl bg-black px-6 py-4 font-semibold text-white"
          >
            {isPending
              ? "Saving..."
              : "Save Address"}
          </button>

        </div>

      </DialogContent>

    </Dialog>
  );
}