import Link from "next/link";

import { CartButton } from "@/components/cart/CartButton";

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-8 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-2xl"
        >
          Hypercode
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/products">
            Products
          </Link>

          <CartButton />
        </nav>
      </div>
    </header>
  );
}
