import Link from "next/link";

import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
      {/* SIDEBAR */}

      <aside className="border-r bg-white p-6">
        {/* LOGO */}

        <Link
          href="/admin"
          className="text-3xl font-black tracking-tight"
        >
          HyperCode
        </Link>

        <p className="mt-2 text-sm text-muted-foreground">
          Admin Panel
        </p>

        {/* NAV */}

        <nav className="mt-10 space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 font-medium transition hover:bg-muted"
          >
            <LayoutDashboard className="h-5 w-5" />

            Dashboard
          </Link>

          <Link
            href="/admin/products"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 font-medium transition hover:bg-muted"
          >
            <Package className="h-5 w-5" />

            Products
          </Link>

          <Link
            href="/admin/orders"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 font-medium transition hover:bg-muted"
          >
            <ShoppingBag className="h-5 w-5" />

            Orders
          </Link>

          <Link
            href="/admin/users"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 font-medium transition hover:bg-muted"
          >
            <Users className="h-5 w-5" />

            Users
          </Link>
        </nav>
      </aside>

      {/* CONTENT */}

      <main className="bg-muted/30 p-8">
        {children}
      </main>
    </div>
  );
}