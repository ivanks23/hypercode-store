import Link from "next/link";
import { OrderStatusSelect } from "@/components/admin/OrderStatusSelect";

import { Eye, ShoppingBag } from "lucide-react";

import { getAdminOrders } from "@/services/order.service";

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();

  return (
    <div>
      {/* HEADER */}

      <div className="mb-10">
        <h1 className="text-5xl font-black tracking-tight">Orders</h1>

        <p className="mt-3 text-muted-foreground">
          Monitor payments and fulfillment
        </p>
      </div>

      {/* EMPTY */}

      {orders.length === 0 && (
        <div className="rounded-[32px] border bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-100">
            <ShoppingBag className="h-10 w-10 text-violet-600" />
          </div>

          <h2 className="mt-6 text-3xl font-black">No orders yet</h2>

          <p className="mt-3 text-muted-foreground">
            Orders will appear here once customers start purchasing.
          </p>
        </div>
      )}

      {/* TABLE */}

      {orders.length > 0 && (
        <div className="overflow-hidden rounded-[32px] border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* HEAD */}

              <thead className="border-b bg-muted/30">
                <tr className="text-left">
                  <th className="px-6 py-5 font-semibold">Order</th>

                  <th className="px-6 py-5 font-semibold">Customer</th>

                  <th className="px-6 py-5 font-semibold">Payment</th>

                  <th className="px-6 py-5 font-semibold">Status</th>

                  <th className="px-6 py-5 font-semibold">Total</th>

                  <th className="px-6 py-5 font-semibold">Actions</th>
                </tr>
              </thead>

              {/* BODY */}

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0">
                    {/* ORDER */}

                    <td className="px-6 py-5">
                      <div>
                        <p className="font-mono text-sm">{order.id}</p>

                        <p className="mt-2 text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </td>

                    {/* CUSTOMER */}

                    <td className="px-6 py-5">
                      <div>
                        <p className="font-semibold">
                          {order.user?.name || "Guest"}
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {order.user?.email || "No email"}
                        </p>
                      </div>
                    </td>

                    {/* PAYMENT */}

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-4 py-2 text-sm font-medium ${
                          order.payment?.status === "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.payment?.status || "PENDING"}
                      </span>
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-5">
                      <OrderStatusSelect
                        orderId={order.id}
                        currentStatus={order.status}
                      />
                    </td>

                    {/* TOTAL */}

                    <td className="px-6 py-5">
                      <p className="text-lg font-black">
                        ${order.total.toFixed(2)}
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {order.items.length} item(s)
                      </p>
                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-5">
                      <Link
                        href={`/orders/${order.id}`}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border transition hover:bg-muted"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
