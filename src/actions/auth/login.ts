"use server";

import { signIn } from "@/auth";

type Payload = {
  email: string;
  password: string;
};

export async function loginAction({
  email,
  password,
}: Payload) {
  await signIn(
    "credentials",
    {
      email,
      password,
      redirectTo: "/",
    }
  );
}