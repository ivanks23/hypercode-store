import { getDashboardAnalytics } from "@/services/analytics.service";

import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";

export default async function AdminDashboardPage() {
  const analytics = await getDashboardAnalytics();
  return (
    <div>
      {/* HEADER */}

      <div className="mb-10">
        <h1 className="text-5xl font-black tracking-tight">Dashboard</h1>

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

          <p className="mt-6 text-sm text-muted-foreground">Revenue</p>

          <h2 className="mt-2 text-4xl font-black">
            ${analytics.revenue.toFixed(2)}
          </h2>
        </div>

        {/* ORDERS */}

        <div className="rounded-[32px] border bg-white p-8 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
            <ShoppingCart className="h-7 w-7 text-violet-600" />
          </div>

          <p className="mt-6 text-sm text-muted-foreground">Orders</p>

          <h2 className="mt-2 text-4xl font-black">{analytics.orders}</h2>
        </div>

        {/* PRODUCTS */}

        <div className="rounded-[32px] border bg-white p-8 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
            <Package className="h-7 w-7 text-violet-600" />
          </div>

          <p className="mt-6 text-sm text-muted-foreground">Products</p>

          <h2 className="mt-2 text-4xl font-black">{analytics.products}</h2>
        </div>

        {/* USERS */}

        <div className="rounded-[32px] border bg-white p-8 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
            <Users className="h-7 w-7 text-violet-600" />
          </div>

          <p className="mt-6 text-sm text-muted-foreground">Customers</p>

          <h2 className="mt-2 text-4xl font-black">{analytics.customers}</h2>
        </div>
      </section>
      
      <section className="mt-10 rounded-[32px] border bg-white p-8 shadow-sm">
        <div className="mb-8">
          <h2 className="text-3xl font-black">Top Selling Products</h2>

          <p className="mt-2 text-muted-foreground">
            Best performing products by quantity sold
          </p>
        </div>

        <div className="space-y-4">
          {analytics.topProducts.map((product, index) => (
            <div
              key={product.productName}
              className="flex items-center justify-between rounded-2xl border p-5"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 font-black text-violet-700">
                  #{index + 1}
                </div>

                <div>
                  <p className="font-bold">{product.productName}</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Top seller
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-black">{product._sum.quantity}</p>

                <p className="text-sm text-muted-foreground">units sold</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
