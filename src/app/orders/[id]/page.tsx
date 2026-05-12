import { notFound } from "next/navigation";

import {
  CreditCard,
  Package,
  Truck,
} from "lucide-react";

import { auth } from "@/auth";

import { getUserOrderById } from "@/services/order.service";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderDetailPage({
  params,
}: Props) {
  const session =
    await auth();

  if (!session?.user?.id) {
    return null;
  }

  const { id } =
    await params;

  const order =
    await getUserOrderById({
      orderId: id,

      userId:
        session.user.id,
    });

  if (!order) {
    notFound();
  }

  return (
    <main className="container mx-auto px-6 py-10">
      {/* HEADER */}

      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-5xl font-black tracking-tight">
            Order Details
          </h1>

          <p className="mt-3 font-mono text-sm text-muted-foreground">
            {order.id}
          </p>
        </div>

        <div className="inline-flex rounded-full bg-green-100 px-5 py-3 text-sm font-semibold text-green-700">
          {order.status}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* ITEMS */}

        <section className="space-y-6">
          {order.items.map(
            (item) => (
              <article
                key={item.id}
                className="rounded-[32px] border bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-6 md:flex-row">
                  {/* IMAGE */}

                  <img
                    src={
                      item.variant
                        .imageUrl
                    }
                    alt={
                      item.productName
                    }
                    className="h-36 w-36 rounded-2xl object-cover"
                  />

                  {/* INFO */}

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">
                      {
                        item.productName
                      }
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                      {
                        item.variantName
                      }
                    </p>

                    <div className="mt-6 flex flex-wrap gap-6 text-sm">
                      <div>
                        <p className="text-muted-foreground">
                          Quantity
                        </p>

                        <p className="mt-1 font-semibold">
                          {
                            item.quantity
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-muted-foreground">
                          Unit price
                        </p>

                        <p className="mt-1 font-semibold">
                          $
                          {
                            item.unitPrice
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-muted-foreground">
                          Subtotal
                        </p>

                        <p className="mt-1 font-semibold">
                          $
                          {(
                            item.unitPrice *
                            item.quantity
                          ).toFixed(
                            2
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
          )}
        </section>

        {/* SUMMARY */}

        <aside className="h-fit rounded-[32px] border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">
            Order Summary
          </h2>

          {/* TOTAL */}

          <div className="mt-8 border-t pt-6">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Total
              </span>

              <span className="text-3xl font-black">
                $
                {order.total.toFixed(
                  2
                )}
              </span>
            </div>
          </div>

          {/* PAYMENT */}

          <div className="mt-8 rounded-2xl border bg-muted/30 p-5">
            <div className="flex items-start gap-4">
              <CreditCard className="mt-1 h-5 w-5 text-violet-600" />

              <div>
                <p className="font-semibold">
                  Payment Status
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {order.payment
                    ?.status ||
                    "Pending"}
                </p>
              </div>
            </div>
          </div>

          {/* SHIPPING */}

          <div className="mt-5 rounded-2xl border bg-muted/30 p-5">
            <div className="flex items-start gap-4">
              <Truck className="mt-1 h-5 w-5 text-violet-600" />

              <div>
                <p className="font-semibold">
                  Shipping
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Processing order
                </p>
              </div>
            </div>
          </div>

          {/* ITEMS */}

          <div className="mt-5 rounded-2xl border bg-muted/30 p-5">
            <div className="flex items-start gap-4">
              <Package className="mt-1 h-5 w-5 text-violet-600" />

              <div>
                <p className="font-semibold">
                  Items
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {
                    order.items.length
                  }{" "}
                  product(s)
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}