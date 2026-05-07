"use client";

import { useCartStore } from "@/store/cart.store";
import { useMounted } from "@/hooks/useMounted";

export default function CartPage() {
  const items = useCartStore(
    (state) => state.items
  );
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  const subtotal = useCartStore(
    (state) => state.subtotal
  );

  const removeItem = useCartStore(
    (state) => state.removeItem
  );

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
      </div>
    </main>
  );
}
