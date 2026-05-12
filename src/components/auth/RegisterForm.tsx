"use client";

import Link from "next/link";

import { useTransition } from "react";

import {
  useForm,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  RegisterInput,
} from "@/schemas/register.schema";

import { registerAction } from "@/actions/auth/register";

export function RegisterForm() {
  const [
    isPending,
    startTransition,
  ] = useTransition();

  const {
    register,

    handleSubmit,

    formState: { errors },
  } = useForm<RegisterInput>({
    resolver:
      zodResolver(
        registerSchema
      ),
  });

  function onSubmit(
    data: RegisterInput
  ) {
    startTransition(async () => {
      await registerAction({
        formData: data,
      });
    });
  }

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-5"
    >
      {/* NAME */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Full name
        </label>

        <input
          {...register("name")}
          placeholder="John Doe"
          className="w-full rounded-2xl border bg-background px-4 py-3 outline-none transition focus:border-violet-500"
        />

        {errors.name && (
          <p className="mt-2 text-sm text-red-500">
            {
              errors.name
                .message
            }
          </p>
        )}
      </div>

      {/* EMAIL */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Email
        </label>

        <input
          {...register("email")}
          type="email"
          placeholder="john@email.com"
          className="w-full rounded-2xl border bg-background px-4 py-3 outline-none transition focus:border-violet-500"
        />

        {errors.email && (
          <p className="mt-2 text-sm text-red-500">
            {
              errors.email
                .message
            }
          </p>
        )}
      </div>

      {/* PASSWORD */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Password
        </label>

        <input
          {...register(
            "password"
          )}
          type="password"
          placeholder="••••••••"
          className="w-full rounded-2xl border bg-background px-4 py-3 outline-none transition focus:border-violet-500"
        />

        {errors.password && (
          <p className="mt-2 text-sm text-red-500">
            {
              errors.password
                .message
            }
          </p>
        )}
      </div>

      {/* CTA */}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-2xl bg-violet-600 px-6 py-4 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50"
      >
        {isPending
          ? "Creating account..."
          : "Create account"}
      </button>

      {/* LOGIN */}

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}

        <Link
          href="/login"
          className="font-medium text-violet-600 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}