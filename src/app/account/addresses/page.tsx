import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { getUserAddresses } from "@/services/address.service";
import { CreateAddressDialog } from "@/components/account/CreateAddressDialog";
import { SetDefaultAddressButton } from "@/components/account/SetDefaultAddressButton";
import { EditAddressDialog } from "@/components/account/EditAddressDialog";
import { DeleteAddressButton } from "@/components/account/DeleteAddressButton";

export default async function AddressesPage() {

  const session =
    await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const addresses =
    await getUserAddresses(
      session.user.id
    );

  return (
    <main className="container mx-auto px-6 py-10">

      <div className="grid gap-8 lg:grid-cols-4">

        <AccountSidebar />

        <div className="lg:col-span-3">

          <div className="rounded-[32px] border bg-white p-8 shadow-sm">

            <div className="mb-8 flex items-center justify-between">

              <h1 className="text-3xl font-bold">
                Addresses
              </h1>

              <CreateAddressDialog />

            </div>

            {addresses.length === 0 ? (

              <div className="rounded-2xl border border-dashed p-10 text-center">

                <p className="text-muted-foreground">
                  No addresses yet
                </p>

              </div>

            ) : (

              <div className="space-y-4">

                {addresses.map(
                  (address) => (

                    <div
                      key={address.id}
                      className="rounded-2xl border p-5"
                    >

                      <p className="font-semibold">
                        {address.fullName}
                      </p>

                      <p className="mt-2 text-sm text-muted-foreground">
                        {address.street}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {address.city},{" "}
                        {address.state}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {address.zipCode}
                      </p>

                    <div className="mt-4 flex items-center gap-2">

                      {address.isDefault ? (

                        <div className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          ⭐ Default Address
                        </div>

                      ) : (

                        <SetDefaultAddressButton
                          addressId={address.id}
                        />

                      )}

                      <EditAddressDialog
                        address={address}
                      />

                      <DeleteAddressButton
                        addressId={address.id}
                      />

                    </div>

                    </div>
                  )
                )}

              </div>

            )}

          </div>

        </div>

      </div>

    </main>
  );
}