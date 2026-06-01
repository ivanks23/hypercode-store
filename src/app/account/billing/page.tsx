import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { BillingForm } from "@/components/account/BillingForm";
import { getBillingProfile } from "@/services/billing.service";

export default async function BillingPage() {

  const session =
    await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const billing =
    await getBillingProfile(
      session.user.id
    );

  return (
    <main className="container mx-auto px-6 py-10">

      <div className="grid gap-8 lg:grid-cols-4">

        <AccountSidebar />

        <div className="lg:col-span-3">

          <div className="rounded-[32px] border bg-white p-8 shadow-sm">

            <h1 className="mb-8 text-3xl font-bold">
              Billing Data
            </h1>

            <BillingForm
              rfc={billing?.rfc}
              businessName={
                billing?.businessName
              }
              taxRegime={
                billing?.taxRegime
              }
              cfdiUse={
                billing?.cfdiUse
              }
            />

          </div>

        </div>

      </div>

    </main>
  );
}