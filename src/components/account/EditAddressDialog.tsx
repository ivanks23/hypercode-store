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

import { updateAddressAction } from "@/actions/update-address";

type Props = {
  address: {
    id: string;

    fullName: string;
    phone: string;

    street: string;

    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
};

export function EditAddressDialog({
  address,
}: Props) {

  const router =
    useRouter();

  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    isPending,
    startTransition,
  ] = useTransition();

  const [
    fullName,
    setFullName,
  ] = useState(
    address.fullName
  );

  const [
    phone,
    setPhone,
  ] = useState(
    address.phone
  );

  const [
    street,
    setStreet,
  ] = useState(
    address.street
  );

  const [
    city,
    setCity,
  ] = useState(
    address.city
  );

  const [
    state,
    setState,
  ] = useState(
    address.state
  );

  const [
    zipCode,
    setZipCode,
  ] = useState(
    address.zipCode
  );

  const [
    country,
    setCountry,
  ] = useState(
    address.country
  );

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <DialogTrigger asChild>

        <button className="rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-muted">
          Edit
        </button>

      </DialogTrigger>

      <DialogContent className="max-w-2xl">

        <DialogHeader>

          <DialogTitle>
            Edit Address
          </DialogTitle>

        </DialogHeader>

        <div className="grid gap-4">

          <input
            value={fullName}
            onChange={(e) =>
              setFullName(
                e.target.value
              )
            }
            className="rounded-xl border px-4 py-3"
          />

          <input
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            className="rounded-xl border px-4 py-3"
          />

          <input
            value={street}
            onChange={(e) =>
              setStreet(
                e.target.value
              )
            }
            className="rounded-xl border px-4 py-3"
          />

          <input
            value={city}
            onChange={(e) =>
              setCity(
                e.target.value
              )
            }
            className="rounded-xl border px-4 py-3"
          />

          <input
            value={state}
            onChange={(e) =>
              setState(
                e.target.value
              )
            }
            className="rounded-xl border px-4 py-3"
          />

          <input
            value={zipCode}
            onChange={(e) =>
              setZipCode(
                e.target.value
              )
            }
            className="rounded-xl border px-4 py-3"
          />

          <input
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
            onClick={() =>
              startTransition(
                async () => {

                  await updateAddressAction({
                    addressId:
                      address.id,

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
              )
            }
            className="rounded-2xl bg-black px-6 py-4 font-semibold text-white"
          >
            {isPending
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </DialogContent>

    </Dialog>
  );
}