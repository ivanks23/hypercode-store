import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { AccountSidebar } from "@/components/account/AccountSidebar";

export default async function AccountPage() {

  const session =
    await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="container mx-auto px-6 py-10">

      <div className="mb-10">

        <h1 className="text-5xl font-black tracking-tight">
          My Account
        </h1>

        <p className="mt-3 text-muted-foreground">
          Manage your profile, addresses and orders
        </p>

      </div>

      <div className="grid gap-8 lg:grid-cols-4">

        <AccountSidebar />

        <div className="lg:col-span-3">

          <div className="rounded-[32px] border bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold">
              Welcome back
            </h2>

            <p className="mt-4 text-muted-foreground">
              {session.user.name}
            </p>

            <p className="mt-2 text-muted-foreground">
              {session.user.email}
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}