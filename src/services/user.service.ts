import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";


type UpdateUserProfileInput = {
  userId: string;
  name: string;
  email: string;
};

export async function updateUserProfile({
  userId,
  name,
  email,
}: UpdateUserProfileInput) {
  return prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      name,
      email,
    },
  });
}

export async function getAdminUsers() {
  return prisma.user.findMany({
    include: {
      orders: {
        select: {
          total: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAdminUserById(
  userId: string
) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },

    include: {
      orders: {
        orderBy: {
          createdAt: "desc",
        },
      },

      addresses: true,
      billingProfile: true,
    },
  });
}

export async function updateUserRole({
  userId,
  role,
}: {
  userId: string;
  role: UserRole;
}) {

  return prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      role,
    },
  });
}