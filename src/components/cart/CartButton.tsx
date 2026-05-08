"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart.store";

export function CartButton() {
  const items =
    useCartStore(
      (state) => state.items
    );

  const totalItems =
    items.reduce(
      (acc, item) =>
        acc + item.quantity,
      0
    );

  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="relative"
    >
      <Link href="/cart">
        <ShoppingCart className="h-5 w-5" />

        {totalItems > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
            {totalItems}
          </span>
        )}
      </Link>
    </Button>
  );
}