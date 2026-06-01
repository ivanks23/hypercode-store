"use server";

import { auth } from "@/auth";

import { createAddress } from "@/services/address.service";

type Payload = {
  fullName: string;
  phone: string;

  street: string;

  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export async function createAddressAction(
  payload: Payload
) {

  const session =
    await auth();

  if (!session?.user?.id) {
    throw new Error(
      "Unauthorized"
    );
  }

  await createAddress({
    userId:
      session.user.id,

    ...payload,
  });

  return {
    success: true,
  };
}