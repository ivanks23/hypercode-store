import Link from "next/link";
import { CartButton } from "@/components/cart/CartButton";
import { SearchBar } from "@/components/layout/SearchBar";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <MobileMenu />

            <Link href="/" className="text-2xl font-bold tracking-tight">
              HyperCode
            </Link>
          </div>

          <div className="hidden flex-1 justify-center px-8 md:flex">
            <div className="w-full max-w-md">
              <SearchBar />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CartButton />
          </div>
        </div>

        <div className="pb-4 md:hidden">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
