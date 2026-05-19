import { notFound } from "next/navigation";

import { auth } from "@/auth";

import {
  getUserOrderById,
} from "@/services/order.service";

function getStatusStyles(
  status: string
) {
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

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderPage({
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

  const shipping =
    order.shippingAddress as {
      fullName: string;
      phone: string;
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };

  return (
    <main className="container mx-auto px-6 py-10">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-5xl font-black tracking-tight">
          Order Details
        </h1>

        <p className="mt-3 font-mono text-sm text-muted-foreground">
          {order.id}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">

        {/* LEFT */}

        <div className="space-y-8 lg:col-span-2">

          {/* PRODUCTS */}

          <div className="rounded-[32px] border bg-white p-8 shadow-sm">

            <h2 className="mb-8 text-2xl font-bold">
              Products
            </h2>

            <div className="space-y-6">

              {order.items.map(
                (item) => (

                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-6 last:border-none"
                  >

                    {/* LEFT */}

                    <div className="flex items-center gap-5">

                      <div className="h-24 w-24 overflow-hidden rounded-2xl border bg-gray-50">

                        <img
                          src={
                            item.variant
                              .imageUrl
                          }
                          alt={
                            item.productName
                          }
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>

                        <p className="font-semibold">
                          {
                            item.productName
                          }
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {
                            item.variantName
                          }
                        </p>

                        <p className="mt-2 text-xs text-muted-foreground">
                          Qty:
                          {" "}
                          {
                            item.quantity
                          }
                        </p>
                      </div>
                    </div>

                    {/* RIGHT */}

                    <div className="text-right">

                      <p className="text-xl font-bold">
                        $
                        {(
                          item.unitPrice *
                          item.quantity
                        ).toFixed(2)}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        $
                        {item.unitPrice.toFixed(
                          2
                        )}
                        {" "}
                        each
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* SHIPPING ADDRESS */}

          <div className="rounded-[32px] border bg-white p-8 shadow-sm">

            <h2 className="mb-8 text-2xl font-bold">
              Shipping Address
            </h2>

            <div className="space-y-3 text-sm">

              <p>
                {shipping.fullName}
              </p>

              <p>
                {shipping.phone}
              </p>

              <p>
                {shipping.street}
              </p>

              <p>
                {shipping.city}
                ,{" "}
                {shipping.state}
              </p>

              <p>
                {shipping.zipCode}
              </p>

              <p>
                {shipping.country}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="space-y-8">

          {/* SUMMARY */}

          <div className="rounded-[32px] border bg-white p-8 shadow-sm">

            <h2 className="mb-8 text-2xl font-bold">
              Summary
            </h2>

            <div className="space-y-5">

              <div>

                <p className="text-sm text-muted-foreground">
                  Order Status
                </p>

                <div
                  className={`mt-2 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${getStatusStyles(order.status)}`}
                >
                  {order.status}
                </div>
              </div>

              <div>

                <p className="text-sm text-muted-foreground">
                  Payment
                </p>

                <div
                  className={`mt-2 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                    order.payment
                      ?.status ===
                    "APPROVED"
                      ? "bg-green-100 text-green-700"
                      : order.payment
                            ?.status ===
                          "PENDING"
                        ? "bg-yellow-100 text-yellow-900"
                        : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.payment
                    ?.status ||
                    "NO PAYMENT"}
                </div>
              </div>

              <div className="border-t pt-5">

                <p className="text-sm text-muted-foreground">
                  Total
                </p>

                <p className="mt-2 text-4xl font-black">
                  $
                  {order.total.toFixed(
                    2
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* PAYMENT DETAILS */}

          <div className="rounded-[32px] border bg-white p-8 shadow-sm">

            <h2 className="mb-8 text-2xl font-bold">
              Payment Details
            </h2>

            <div className="space-y-5">

              <div>

                <p className="text-sm text-muted-foreground">
                  Provider
                </p>

                <p className="mt-2 font-semibold">
                  {order.payment
                    ? "Mercado Pago"
                    : "No payment"}
                </p>
              </div>

              <div>

                <p className="text-sm text-muted-foreground">
                  Payment Status
                </p>

                <div
                  className={`mt-2 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                    order.payment?.status ===
                    "APPROVED"
                      ? "bg-green-100 text-green-700"
                      : order.payment
                            ?.status ===
                          "PENDING"
                        ? "bg-yellow-100 text-yellow-900"
                        : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.payment?.status ||
                    "NO PAYMENT"}
                </div>
              </div>

              <div>

                <p className="text-sm text-muted-foreground">
                  Transaction ID
                </p>

                <p className="mt-2 break-all font-mono text-sm">
                  {order.payment
                    ?.providerPaymentId ||
                    "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* SHIPMENT DETAILS */}

          {order.trackingNumber && (
            <div className="rounded-[32px] border bg-white p-8 shadow-sm">

              <h2 className="mb-8 text-2xl font-bold">
                Shipment Details
              </h2>

              <div className="space-y-5">

                <div>

                  <p className="text-sm text-muted-foreground">
                    Carrier
                  </p>

                  <p className="mt-2 font-semibold">
                    {order.carrier}
                  </p>
                </div>

                <div>

                  <p className="text-sm text-muted-foreground">
                    Tracking Number
                  </p>

                  <p className="mt-2 break-all font-mono text-sm">
                    {order.trackingNumber}
                  </p>
                </div>

                <div>

                  <p className="text-sm text-muted-foreground">
                    Shipped At
                  </p>

                  <p className="mt-2 font-medium">
                    {order.shippedAt
                      ? new Date(
                          order.shippedAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}