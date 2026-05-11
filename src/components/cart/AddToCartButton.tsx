"use client";

import { toast } from "sonner";

import { useCartStore } from "@/store/cart.store";

type Props = {
  item: {
    variantId: string;

    productSlug: string;

    productName: string;

    variantName: string;

    imageUrl: string;

    price: number;

    quantity: number;
  };
};

export function AddToCartButton({
  item,
}: Props) {
  const addItem =
    useCartStore(
      (state) => state.addItem
    );

  const openCart =
    useCartStore(
      (state) =>
        state.openCart
    );

  return (
    <button
      onClick={() => {
        addItem(item);

        openCart();

        toast.success(
          `${item.quantity} item(s) added to cart`
        );
      }}
      className="rounded-2xl bg-violet-600 px-8 py-4 font-semibold text-white transition hover:bg-violet-700"
    >
      Add to cart
    </button>
  );
}