import Link from "next/link";
import { auth } from "@/auth";
import { getUserOrders } from "@/services/order.service";

export default async function OrdersPage() {
  const session =
    await auth();

  if (!session?.user?.id) {
    return null;
  }

  const orders =
    await getUserOrders(
      session.user.id
    );

  return (
    <main className="container mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-5xl font-black tracking-tight">
          My Orders
        </h1>

        <p className="mt-3 text-muted-foreground">
          Track your purchases and payment status
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-[32px] border bg-white p-12 text-center shadow-sm">
          <h2 className="text-2xl font-bold">
            No orders yet
          </h2>

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
                {/* LEFT */}

                <div>
                  <p className="text-sm text-muted-foreground">
                    Order ID
                  </p>

                  <p className="mt-1 font-mono text-sm">
                    {order.id}
                  </p>

                  <p className="mt-4 text-sm text-muted-foreground">
                    Date
                  </p>

                  <p className="mt-1 font-medium">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                {/* CENTER */}

                <div>
                  <p className="text-sm text-muted-foreground">
                    Status
                  </p>

                  <div className="mt-2 inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                    {order.status}
                  </div>
                </div>

                {/* RIGHT */}

                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Total
                  </p>

                  <p className="mt-1 text-3xl font-black">
                    $
                    {order.total}
                  </p>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {
                      order.items.length
                    }{" "}
                    item(s)
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