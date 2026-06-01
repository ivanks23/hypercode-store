"use server";

import { auth } from "@/auth";

import { deleteAddress } from "@/services/address.service";

export async function deleteAddressAction(
  addressId: string
) {

  const session =
    await auth();

  if (!session?.user?.id) {
    throw new Error(
      "Unauthorized"
    );
  }

  await deleteAddress(
    addressId
  );

  return {
    success: true,
  };
}