import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div>
      {/* HEADER */}

      <div className="mb-10">
        <h1 className="text-5xl font-black tracking-tight">
          Dashboard
        </h1>

        <p className="mt-3 text-muted-foreground">
          Monitor your ecommerce performance
        </p>
      </div>

      {/* STATS */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {/* SALES */}

        <div className="rounded-[32px] border bg-white p-8 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
            <DollarSign className="h-7 w-7 text-violet-600" />
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Revenue
          </p>

          <h2 className="mt-2 text-4xl font-black">
            $0
          </h2>
        </div>

        {/* ORDERS */}

        <div className="rounded-[32px] border bg-white p-8 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
            <ShoppingCart className="h-7 w-7 text-violet-600" />
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Orders
          </p>

          <h2 className="mt-2 text-4xl font-black">
            0
          </h2>
        </div>

        {/* PRODUCTS */}

        <div className="rounded-[32px] border bg-white p-8 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
            <Package className="h-7 w-7 text-violet-600" />
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Products
          </p>

          <h2 className="mt-2 text-4xl font-black">
            0
          </h2>
        </div>

        {/* USERS */}

        <div className="rounded-[32px] border bg-white p-8 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
            <Users className="h-7 w-7 text-violet-600" />
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Customers
          </p>

          <h2 className="mt-2 text-4xl font-black">
            0
          </h2>
        </div>
      </section>
    </div>
  );
}