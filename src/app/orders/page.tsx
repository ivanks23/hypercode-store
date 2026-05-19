import Link from "next/link";
import { auth } from "@/auth";
import { getUserOrders } from "@/services/order.service";

function getStatusStyles(status: string) {
  switch (status) {
    case "PAID":
      return "bg-green-100 text-green-700";

    case "PENDING":
      return "bg-yellow-100 text-yellow-900";

    case "PROCESSING":
      return "bg-blue-100 text-blue-900";

    case "SHIPPED":
      return "bg-purple-100 text-purple-900";

    case "DELIVERED":
      return "bg-emerald-100 text-emerald-700";

    case "CANCELLED":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default async function OrdersPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const orders = await getUserOrders(session.user.id);

  return (
    <main className="container mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-5xl font-black tracking-tight">My Orders</h1>

        <p className="mt-3 text-muted-foreground">
          Track your purchases and payment status
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-[32px] border bg-white p-12 text-center shadow-sm">
          <h2 className="text-2xl font-bold">No orders yet</h2>

          <p className="mt-3 text-muted-foreground">
            Your purchases will appear here.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex rounded-2xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            Explore products
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Link
              href={`/orders/${order.id}`}
              key={order.id}
              className="block rounded-[32px] border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                {/* ORDER INFO */}

                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="mt-1 font-mono text-sm">{order.id}</p>
                  <p className="mt-4 text-sm text-muted-foreground">Date</p>
                  <p className="mt-1 font-medium">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                  

                <div>
                  <p className="text-sm text-muted-foreground">Status</p>

                  <div className={`mt-2 inline-flex rounded-full px-4 py-2 text-sm font-medium ${getStatusStyles(order.status)}`}>
                    {order.status}
                  </div>
                </div>

                {/* PAYMENT */}

                <div className="mt-3">
                  <p className="text-sm text-muted-foreground">Payment</p>

                  <div
                    className={`mt-2 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                      order.payment?.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : order.payment?.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-900"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.payment?.status || "NO PAYMENT"}
                  </div>
                </div>

                {/* TOTAL */}

                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total</p>

                  <p className="mt-1 text-3xl font-black">
                    ${order.total.toFixed(2)}
                  </p>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {order.items.length} item(s)
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
