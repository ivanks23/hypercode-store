import Link from "next/link";
import { User2 } from "lucide-react";
import { auth } from "@/auth";
import { CartButton } from "@/components/cart/CartButton";
import { SearchBar } from "@/components/layout/SearchBar";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { LogoutButton } from "../../components/auth/LogoutButton";

export async function Navbar() {
  const session =
    await auth();

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* LEFT */}

          <div className="flex items-center gap-4">
            <MobileMenu />

            <Link
              href="/"
              className="text-2xl font-black tracking-tight"
            >
              HyperCode
            </Link>
          </div>

          {/* SEARCH */}

          <div className="hidden flex-1 justify-center px-8 md:flex">
            <div className="w-full max-w-md">
              <SearchBar />
            </div>
          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-3">
            {/* AUTH */}

            {session?.user ? (
              <div className="hidden items-center gap-3 md:flex">
                <div className="flex items-center gap-2 rounded-full border bg-muted/40 px-4 py-2">
                  <User2 className="h-4 w-4 text-violet-600" />

                  <span className="max-w-[140px] truncate text-sm font-medium">
                    {session.user.name}
                  </span>
                </div>

                <LogoutButton />
              </div>
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Link
                  href="/login"
                  className="rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-muted"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
                >
                  Register
                </Link>
              </div>
            )}

            {/* CART */}

            <CartButton />
          </div>
        </div>

        {/* MOBILE SEARCH */}

        <div className="pb-4 md:hidden">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}