import { getDashboardAnalytics } from "@/services/analytics.service";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { getInventoryStats } from "@/services/product.service";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const analytics = await getDashboardAnalytics();
  const inventoryStats = await getInventoryStats();
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

      {/* STOCK */}

      <section className="mt-10 rounded-[32px] border bg-white p-8 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          {/* LOW STOCK */}

          <div className="rounded-3xl border bg-white p-6">
            <p className="text-sm text-muted-foreground">Low Stock</p>

            <h2 className="mt-3 text-4xl font-bold text-yellow-600">
              {inventoryStats.lowStock.length}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Products running low
            </p>

            <div className="mt-6 space-y-3">
              {inventoryStats.lowStock.slice(0, 5).map((variant) => (
                <Link
  key={variant.id}
  href={`/admin/products/${variant.productId}`}
  className="flex items-center justify-between rounded-2xl border px-4 py-3 transition hover:bg-gray-50"
>
                  <div>
                    <p className="text-sm font-medium">
                      {variant.product.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {variant.name}
                    </p>
                  </div>

                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-900">
                    {variant.stock}
                  </span>

                </Link>
              ))}
            </div>
          </div>

          {/* OUT OF STOCK */}

          <div className="rounded-3xl border bg-white p-6">
            <p className="text-sm text-muted-foreground">Out of Stock</p>

            <h2 className="mt-3 text-4xl font-bold text-red-600">
              {inventoryStats.outOfStock.length}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Products unavailable
            </p>

            <div className="mt-6 space-y-3">
              {inventoryStats.outOfStock.slice(0, 5).map((variant) => (
                <Link
                  key={variant.id}
                  href={`/admin/products/${variant.productId}`}
                  className="flex items-center justify-between rounded-2xl border px-4 py-3 transition hover:bg-gray-50"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {variant.product.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {variant.name}
                    </p>
                  </div>

                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                    0
                  </span>

                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TOP SELLING PRODUCTS */}

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
