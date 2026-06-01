"use server";

import { auth } from "@/auth";

import { upsertBillingProfile } from "@/services/billing.service";

type Payload = {
  rfc: string;

  businessName?: string;

  taxRegime?: string;

  cfdiUse?: string;
};

export async function updateBillingProfileAction(
  payload: Payload
) {

  const session =
    await auth();

  if (!session?.user?.id) {
    throw new Error(
      "Unauthorized"
    );
  }

  await upsertBillingProfile({
    userId:
      session.user.id,

    ...payload,
  });

  return {
    success: true,
  };
}