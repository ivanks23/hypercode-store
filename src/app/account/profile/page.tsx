import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/account/ProfileForm";
import { AccountSidebar } from "@/components/account/AccountSidebar";

export default async function ProfilePage() {

  const session =
    await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="container mx-auto px-6 py-10">

      <div className="grid gap-8 lg:grid-cols-4">

        <AccountSidebar />

        <div className="lg:col-span-3">

          <div className="rounded-[32px] border bg-white p-8 shadow-sm">

            <h1 className="mb-8 text-3xl font-bold">
              Profile
            </h1>

            <ProfileForm
              name={session.user.name ?? ""}
              email={session.user.email ?? ""}
            />
          </div>
        </div>
      </div>
    </main>
  );
}