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
  };
};

export function AddToCartButton({
  item,
}: Props) {
  const addItem =
    useCartStore(
      (state) => state.addItem
    );

  const handleAddToCart = () => {
    addItem({
      ...item,
      quantity: 1,
    });

    toast.success(
      `${item.productName} added to cart`
    );
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-6 cursor-pointer rounded-lg bg-black px-6 py-3 text-white transition hover:opacity-90"
    >
      Add to cart
    </button>
  );
}