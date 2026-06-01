import { CheckoutForm } from "@/components/checkout/CheckoutForm";

import { auth } from "@/auth";

import { getDefaultAddress } from "@/services/address.service";

export default async function CheckoutPage() {
  const session =
  await auth();

const defaultAddress =
  session?.user?.id
    ? await getDefaultAddress(
        session.user.id
      )
    : null;

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>

      <div className="max-w-2xl">
        <CheckoutForm defaultAddress={defaultAddress} />
      </div>
    </main>
  );
}
