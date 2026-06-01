"use server";

import { UserRole } from "@prisma/client";

import { updateUserRole } from "@/services/user.service";

export async function updateUserRoleAction({
  userId,
  role,
}: {
  userId: string;
  role: UserRole;
}) {

  await updateUserRole({
    userId,
    role,
  });

  return {
    success: true,
  };
}