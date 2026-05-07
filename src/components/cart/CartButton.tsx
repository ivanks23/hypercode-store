"use client";

import Link from "next/link";

import { useCartStore } from "@/store/cart.store";

import { useMounted } from "@/hooks/useMounted";

export function CartButton() {
  const mounted = useMounted();

  const totalItems = useCartStore(
    (state) => state.totalItems()
  );

  return (
    <Link
      href="/cart"
      className="relative cursor-pointer"
    >
      Cart

      {mounted && (
        <span className="absolute -top-3 -right-5 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
