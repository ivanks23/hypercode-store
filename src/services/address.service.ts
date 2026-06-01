import { prisma } from "@/lib/prisma";

export async function getUserAddresses(
  userId: string
)
 {
  return prisma.address.findMany({
    where: {
      userId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

type CreateAddressInput = {
  userId: string;

  fullName: string;
  phone: string;

  street: string;

  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export async function createAddress({
  userId,
  fullName,
  phone,
  street,
  city,
  state,
  zipCode,
  country,
}: CreateAddressInput) {

  return prisma.address.create({
    data: {
      userId,

      fullName,
      phone,

      street,

      city,
      state,
      zipCode,
      country,
    },
  });
}

export async function setDefaultAddress({
  addressId,
  userId,
}: {
  addressId: string;
  userId: string;
}) {

  await prisma.address.updateMany({
    where: {
      userId,
    },

    data: {
      isDefault: false,
    },
  });

  return prisma.address.update({
    where: {
      id: addressId,
    },

    data: {
      isDefault: true,
    },
  });
}

export async function getAddressById(
  addressId: string
) {
  return prisma.address.findUnique({
    where: {
      id: addressId,
    },
  });
}

export async function updateAddress({
  addressId,
  fullName,
  phone,
  street,
  city,
  state,
  zipCode,
  country,
}: {
  addressId: string;

  fullName: string;
  phone: string;

  street: string;

  city: string;
  state: string;
  zipCode: string;
  country: string;
}) {

  return prisma.address.update({
    where: {
      id: addressId,
    },

    data: {
      fullName,
      phone,

      street,

      city,
      state,
      zipCode,
      country,
    },
  });
}

export async function deleteAddress(
  addressId: string
) {
  return prisma.address.delete({
    where: {
      id: addressId,
    },
  });
}