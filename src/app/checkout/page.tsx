import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>

      <div className="max-w-2xl">
        <CheckoutForm />
      </div>
    </main>
  );
}
