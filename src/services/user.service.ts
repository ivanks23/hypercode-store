import { prisma } from "@/lib/prisma";

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