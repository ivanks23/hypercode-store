"use server";

import { auth } from "@/auth";
import { updateUserProfile } from "@/services/user.service";

type Payload = {
  name: string;
  email: string;
};

export async function updateProfileAction({
  name,
  email,
}: Payload) {

  const session =
    await auth();

  if (!session?.user?.id) {
    throw new Error(
      "Unauthorized"
    );
  }

  await updateUserProfile({
    userId:
      session.user.id,
    name,
    email,
  });

  return {
    success: true,
  };
}