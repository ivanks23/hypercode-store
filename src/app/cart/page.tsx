"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart.store";
import { useMounted } from "@/hooks/useMounted";

export default function CartPage() {
  const mounted = useMounted();

  const items = useCartStore(
    (state) => state.items
  );

  const subtotal = useCartStore(
    (state) => state.subtotal
  );

  const removeItem = useCartStore(
    (state) => state.removeItem
  );

  if (!mounted) {
    return null;
  }

  if (items.length === 0) {
    return (
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold">
          Your cart is empty
        </h1>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      <div className="space-y-6">
        {items.map((item) => (
          <article
            key={item.variantId}
            className="border rounded-xl p-4 flex gap-6"
          >
            <img
              src={item.imageUrl}
              alt={item.productName}
              className="w-32 rounded-lg"
            />

            <div className="flex-1">
              <h2 className="font-bold text-xl">
                {item.productName}
              </h2>

              <p className="text-gray-500">
                {item.variantName}
              </p>

              <p className="mt-4 font-bold">
                ${item.price}
              </p>
            </div>

            <button
              onClick={() =>
                removeItem(
                  item.variantId
                )
              }
              className="text-red-500"
            >
              Remove
            </button>
          </article>
        ))}
      </div>

      <div className="mt-10 border-t pt-6">
        <p className="text-2xl font-bold">
          Total: ${subtotal()}
        </p>

        <Link
          href="/checkout"
          className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-lg"
        >
          Continue to checkout
        </Link>
      </div>
    </main>
  );
}
