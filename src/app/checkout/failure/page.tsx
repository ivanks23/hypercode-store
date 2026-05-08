import Link from "next/link";

export default function CheckoutFailurePage() {
  return (
    <main className="container mx-auto p-8 text-center">
      <h1 className="text-5xl font-bold text-red-600">
        Payment failed
      </h1>

      <p className="mt-6 text-lg text-gray-600">
        Your payment could not be processed.
      </p>

      <Link
        href="/cart"
        className="inline-block mt-8 bg-black text-white px-6 py-3 rounded-lg"
      >
        Return to cart
      </Link>
    </main>
  );
}
