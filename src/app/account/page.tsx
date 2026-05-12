import Link from "next/link";

import {
  Package,
  MapPin,
  User2,
  ShieldCheck,
} from "lucide-react";

import { auth } from "@/auth";

export default async function AccountPage() {
  const session =
    await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <main className="container mx-auto px-6 py-10">
      {/* HEADER */}

      <div className="mb-10">
        <h1 className="text-5xl font-black tracking-tight">
          My Account
        </h1>

        <p className="mt-3 text-muted-foreground">
          Manage your profile, orders and preferences
        </p>
      </div>

      {/* PROFILE */}

      <section className="rounded-[32px] border bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* USER */}

          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-100">
              <User2 className="h-10 w-10 text-violet-600" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {session.user.name}
              </h2>

              <p className="mt-1 text-muted-foreground">
                {session.user.email}
              </p>

              <div className="mt-4 inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
                {session.user.role}
              </div>
            </div>
          </div>

          {/* STATUS */}

          <div className="rounded-2xl border bg-muted/30 px-6 py-5">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-green-600" />

              <div>
                <p className="font-medium">
                  Account active
                </p>

                <p className="text-sm text-muted-foreground">
                  Your profile is secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {/* ORDERS */}

        <Link
          href="/orders"
          className="group rounded-[32px] border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
            <Package className="h-7 w-7 text-violet-600" />
          </div>

          <h3 className="mt-6 text-2xl font-bold">
            My Orders
          </h3>

          <p className="mt-3 text-muted-foreground">
            Review your purchases and payment history
          </p>
        </Link>

        {/* ADDRESSES */}

        <div className="rounded-[32px] border bg-white p-8 shadow-sm opacity-70">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
            <MapPin className="h-7 w-7 text-violet-600" />
          </div>

          <h3 className="mt-6 text-2xl font-bold">
            Saved Addresses
          </h3>

          <p className="mt-3 text-muted-foreground">
            Manage shipping addresses
          </p>

          <div className="mt-6 inline-flex rounded-full border px-4 py-2 text-sm font-medium">
            Coming soon
          </div>
        </div>
      </section>
    </main>
  );
}