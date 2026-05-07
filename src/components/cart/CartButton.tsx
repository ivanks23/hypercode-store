"use client";

import Link from "next/link";
import { useMounted } from "@/hooks/useMounted";
import { useCartStore } from "@/store/cart.store";

export function CartButton() {
  const totalItems =
    useCartStore(
      (state) => state.totalItems
    );
  const mounted = useMounted();
    if (!mounted) {
      return null;
    }

  return (
    <Link
      href="/cart"
      className="relative"
    >
      Carrito

      <span className="absolute -top-3 -right-5 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {totalItems()}
      </span>
    </Link>
  );

}
