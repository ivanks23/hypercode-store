"use client";

import { useCartStore } from "@/store/cart.store";

type Props = {
  item: {
    variantId: string;

    productSlug: string;

    productName: string;

    variantName: string;

    imageUrl: string;

    price: number;
  };
};

export function AddToCartButton({
  item,
}: Props) {
  const addItem =
    useCartStore(
      (state) => state.addItem
    );

  return (
    <button
      onClick={() =>
        addItem({
          ...item,
          quantity: 1,
        })
      }
      className="bg-black text-white px-6 py-3 rounded-lg mt-6 cursor-pointer"
    >
      Add to cart
    </button>
  );
}
