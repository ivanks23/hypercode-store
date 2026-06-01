"use server";

import { auth } from "@/auth";
import { setDefaultAddress } from "@/services/address.service";

export async function setDefaultAddressAction(
  addressId: string
) {

  const session =
    await auth();

  if (!session?.user?.id) {
    throw new Error(
      "Unauthorized"
    );
  }

  await setDefaultAddress({
    addressId,
    userId:
      session.user.id,
  });

  return {
    success: true,
  };
}