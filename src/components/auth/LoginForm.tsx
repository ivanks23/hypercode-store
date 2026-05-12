"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { loginAction } from "@/actions/auth/login";

export function LoginForm() {
  const [
    isPending,
    startTransition,
  ] = useTransition();

  const [
    error,
    setError,
  ] = useState("");

  function handleSubmit(
    formData: FormData
  ) {
    const email =
      formData.get(
        "email"
      ) as string;

    const password =
      formData.get(
        "password"
      ) as string;

    setError("");

    startTransition(async () => {
      try {
        await loginAction({
          email,

          password,
        });
      } catch {
        setError(
          "Invalid email or password"
        );
      }
    });
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-5"
    >
      {/* EMAIL */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Email
        </label>

        <input
          name="email"
          type="email"
          placeholder="john@email.com"
          className="w-full rounded-2xl border bg-background px-4 py-3 outline-none transition focus:border-violet-500"
        />
      </div>

      {/* PASSWORD */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Password
        </label>

        <input
          name="password"
          type="password"
          placeholder="••••••••"
          className="w-full rounded-2xl border bg-background px-4 py-3 outline-none transition focus:border-violet-500"
        />
      </div>

      {/* ERROR */}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* CTA */}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-2xl bg-violet-600 px-6 py-4 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50"
      >
        {isPending
          ? "Signing in..."
          : "Sign in"}
      </button>

      {/* REGISTER */}

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}

        <Link
          href="/register"
          className="font-medium text-violet-600 hover:underline"
        >
          Create one
        </Link>
      </p>
    </form>
  );
}