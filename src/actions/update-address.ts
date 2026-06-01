"use server";

import { auth } from "@/auth";

import { updateAddress } from "@/services/address.service";

type Payload = {
  addressId: string;

  fullName: string;
  phone: string;

  street: string;

  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export async function updateAddressAction(
  payload: Payload
) {

  const session =
    await auth();

  if (!session?.user?.id) {
    throw new Error(
      "Unauthorized"
    );
  }

  await updateAddress(payload);

  return {
    success: true,
  };
}