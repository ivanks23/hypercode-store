import { prisma } from "@/lib/prisma";

export async function getBillingProfile(
  userId: string
) {
  return prisma.billingProfile.findUnique({
    where: {
      userId,
    },
  });
}

export async function upsertBillingProfile({
  userId,
  rfc,
  businessName,
  taxRegime,
  cfdiUse,
}: {
  userId: string;

  rfc: string;

  businessName?: string;
  taxRegime?: string;
  cfdiUse?: string;
}) {

  return prisma.billingProfile.upsert({
    where: {
      userId,
    },

    create: {
      userId,

      rfc,
      businessName,
      taxRegime,
      cfdiUse,
    },

    update: {
      rfc,
      businessName,
      taxRegime,
      cfdiUse,
    },
  });
}