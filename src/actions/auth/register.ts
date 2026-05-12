"use server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

import {
  registerSchema,
} from "@/schemas/register.schema";

import { signIn } from "@/auth";

type Payload = {
  formData: unknown;
};

export async function registerAction({
  formData,
}: Payload) {
  const validated =
    registerSchema.parse(
      formData
    );

  const existingUser =
    await prisma.user.findUnique({
      where: {
        email:
          validated.email,
      },
    });

  if (existingUser) {
    throw new Error(
      "Email already in use"
    );
  }

  const passwordHash =
    await bcrypt.hash(
      validated.password,
      10
    );

  await prisma.user.create({
    data: {
      name:
        validated.name,

      email:
        validated.email,

      passwordHash,
    },
  });

  await signIn(
    "credentials",
    {
      email:
        validated.email,

      password:
        validated.password,

      redirectTo: "/",
    }
  );
}