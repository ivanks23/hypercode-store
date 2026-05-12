"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart.store";
import { useMounted } from "@/hooks/useMounted";

export function CartButton() {
  const mounted =
    useMounted();

  const totalItems =
    useCartStore(
      (state) =>
        state.totalItems()
    );

  const openCart =
    useCartStore(
      (state) =>
        state.openCart
    );

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative rounded-full"
      onClick={openCart}
    >
      <ShoppingCart className="h-5 w-5" />

      {mounted &&
        totalItems > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
            {totalItems}
          </span>
        )}
    </Button>
  );
}