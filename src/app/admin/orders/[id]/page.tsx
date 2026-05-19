import { notFound } from "next/navigation";

import { getAdminOrderById } from "@/services/order.service";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminOrderPage({ params }: Props) {
  const { id } = await params;

  const order = await getAdminOrderById(id);

  if (!order) {
    notFound();
  }

  const shipping = order.shippingAddress as {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  return (
    <main className="container mx-auto p-8">
      {/* HEADER */}

      <div className="mb-10">
        <h1 className="text-4xl font-bold">Order Details</h1>

        <p className="mt-2 text-sm text-muted-foreground">{order.id}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* LEFT */}

        <div className="space-y-8 lg:col-span-2">
          {/* ITEMS */}

          <div className="rounded-3xl border bg-white p-6">
            <h2 className="mb-6 text-xl font-semibold">Products</h2>

            <div className="space-y-5">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-5 last:border-none"
                >
                  {/* LEFT */}

                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-2xl border bg-gray-50">
                      <img
                        src={item.variant.imageUrl}
                        alt={item.productName}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div>
                      <p className="font-semibold">{item.productName}</p>

                      <p className="text-sm text-muted-foreground">
                        {item.variantName}
                      </p>

                      <p className="mt-2 text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}

                  <div className="text-right">
                    <p className="text-lg font-bold">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      ${item.unitPrice.toFixed(2)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SHIPPING */}

          <div className="rounded-3xl border bg-white p-6">
            <h2 className="mb-6 text-xl font-semibold">Shipping Address</h2>

            <div className="space-y-2 text-sm">
              <p>{shipping.fullName}</p>

              <p>{shipping.phone}</p>

              <p>{shipping.street}</p>

              <p>
                {shipping.city}, {shipping.state}
              </p>

              <p>{shipping.zipCode}</p>

              <p>{shipping.country}</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="space-y-8">
          {/* SUMMARY */}

          <div className="rounded-3xl border bg-white p-6">
            <h2 className="mb-6 text-xl font-semibold">Summary</h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span>Status</span>

                <span className="font-semibold">{order.status}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Payment</span>

                <span className="font-semibold">{order.payment?.status}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Total</span>

                <span className="text-lg font-bold">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* CUSTOMER */}

          <div className="rounded-3xl border bg-white p-6">
            <h2 className="mb-6 text-xl font-semibold">Customer</h2>

            <div className="space-y-2 text-sm">
              <p>{order.user?.name}</p>

              <p className="text-muted-foreground">{order.user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
