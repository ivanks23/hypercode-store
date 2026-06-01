"use client";

import { useEffect, useState, useTransition } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { checkoutSchema, CheckoutInput } from "@/schemas/checkout.schema";

import { useCartStore } from "@/store/cart.store";
import { createOrderAction } from "@/actions/create-order";
import { validateCouponAction } from "@/actions/validate-coupon";

type Props = {
  defaultAddress: {
    fullName: string;
    phone: string;

    street: string;

    city: string;
    state: string;
    zipCode: string;
    country: string;
  } | null;
};

export function CheckoutForm({ defaultAddress }: Props) {
  const items = useCartStore((state) => state.items);

  const subtotal = useCartStore((state) => state.subtotal);

  const clearCart = useCartStore((state) => state.clearCart);

  const currentSubtotal = subtotal();

  const [isPending, startTransition] = useTransition();

  const [couponCode, setCouponCode] = useState("");

  const [discount, setDiscount] = useState(0);

  const total = Math.max(currentSubtotal - discount, 0);

  const [couponMessage, setCouponMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
  });

  useEffect(() => {
    if (defaultAddress) {
      reset({
        fullName: defaultAddress.fullName,
        phone: defaultAddress.phone,
        street: defaultAddress.street,
        city: defaultAddress.city,
        state: defaultAddress.state,
        zipCode: defaultAddress.zipCode,
        country: defaultAddress.country,
      });
    }
  }, [defaultAddress, reset]);

  async function applyCoupon() {
    const result = await validateCouponAction(couponCode);

    if (!result.valid || !result.coupon) {
      setDiscount(0);
      setCouponMessage("Invalid coupon");
      return;
    }

    const coupon = result.coupon;

    let calculatedDiscount = 0;

    if (coupon.discountType === "PERCENTAGE") {
      calculatedDiscount = currentSubtotal * (coupon.value / 100);
    } else {
      calculatedDiscount = coupon.value;
    }

    setDiscount(calculatedDiscount);
    setCouponMessage(`Coupon applied: ${coupon.code}`);
  }

  function onSubmit(data: CheckoutInput) {
    startTransition(async () => {
      const result = await createOrderAction({
        formData: data,
        items,
      });

      if (result.success) {
        clearCart();

        window.location.href = result.paymentUrl;
      }
    });
  }

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border bg-white p-12 text-center shadow-sm">
        <h2 className="text-3xl font-black">Your cart is empty</h2>

        <p className="mt-3 text-muted-foreground">
          Add products before continuing to checkout.
        </p>

        <a
          href="/products"
          className="mt-8 inline-flex rounded-2xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
        >
          Browse products
        </a>
      </div>
    );
  }

  return (
    <div className="grid gap-10 xl:grid-cols-[1.3fr_420px]">
      {/* FORM */}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h2 className="text-3xl font-black tracking-tight">
            Shipping details
          </h2>

          <p className="mt-2 text-muted-foreground">
            Complete your order information
          </p>
        </div>

        <div className="grid gap-5 rounded-3xl border bg-white p-8 shadow-sm">
          {/* FULL NAME */}

          <div>
            <label className="mb-2 block text-sm font-medium">Full name</label>

            <input
              {...register("fullName")}
              placeholder="John Doe"
              className="w-full rounded-2xl border bg-background px-4 py-3 outline-none transition focus:border-violet-500"
            />

            {errors.fullName && (
              <p className="mt-2 text-sm text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* PHONE */}

          <div>
            <label className="mb-2 block text-sm font-medium">Phone</label>

            <input
              {...register("phone")}
              placeholder="+52 55..."
              className="w-full rounded-2xl border bg-background px-4 py-3 outline-none transition focus:border-violet-500"
            />

            {errors.phone && (
              <p className="mt-2 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* STREET */}

          <div>
            <label className="mb-2 block text-sm font-medium">Street</label>

            <input
              {...register("street")}
              placeholder="Street address"
              className="w-full rounded-2xl border bg-background px-4 py-3 outline-none transition focus:border-violet-500"
            />

            {errors.street && (
              <p className="mt-2 text-sm text-red-500">
                {errors.street.message}
              </p>
            )}
          </div>

          {/* CITY + STATE */}

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">City</label>

              <input
                {...register("city")}
                placeholder="Mexico City"
                className="w-full rounded-2xl border bg-background px-4 py-3 outline-none transition focus:border-violet-500"
              />

              {errors.city && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">State</label>

              <input
                {...register("state")}
                placeholder="CDMX"
                className="w-full rounded-2xl border bg-background px-4 py-3 outline-none transition focus:border-violet-500"
              />

              {errors.state && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>

          {/* ZIP + COUNTRY */}

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">ZIP Code</label>

              <input
                {...register("zipCode")}
                placeholder="01000"
                className="w-full rounded-2xl border bg-background px-4 py-3 outline-none transition focus:border-violet-500"
              />

              {errors.zipCode && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.zipCode.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Country</label>

              <input
                {...register("country")}
                placeholder="Mexico"
                className="w-full rounded-2xl border bg-background px-4 py-3 outline-none transition focus:border-violet-500"
              />

              {errors.country && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <button
          disabled={isPending || items.length === 0}
          className="w-full rounded-2xl bg-violet-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Redirecting to payment..." : "Continue to payment"}
        </button>
      </form>

      {/* SUMMARY */}

      <aside className="h-fit rounded-3xl border bg-white p-8 shadow-sm lg:sticky lg:top-24">
        <h2 className="text-2xl font-black">Order summary</h2>

        <div className="mt-6 space-y-5">
          {items.map((item) => (
            <div key={item.variantId} className="flex gap-4">
              <img
                src={item.imageUrl}
                alt={item.productName}
                className="h-20 w-20 rounded-2xl object-cover"
              />

              <div className="flex-1">
                <p className="font-semibold">{item.productName}</p>

                <p className="text-sm text-muted-foreground">
                  {item.variantName}
                </p>

                <p className="mt-1 text-sm">Qty: {item.quantity}</p>
              </div>

              <p className="font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t pt-6">
          <label className="mb-2 block text-sm font-medium">Coupon Code</label>

          <div className="flex gap-2">
            <input
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="WELCOME10"
              className="flex-1 rounded-xl border px-4 py-3"
            />

            <button
              type="button"
              onClick={applyCoupon}
              className="rounded-xl bg-black px-4 py-3 font-medium text-white"
            >
              Apply
            </button>
          </div>

          {couponMessage && (
            <p className="mt-2 text-sm text-muted-foreground">
              {couponMessage}
            </p>
          )}
        </div>

        <div className="mt-8 space-y-4 border-t pt-6">
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Subtotal</span>

            <span>${currentSubtotal.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="flex items-center justify-between text-green-600">
              <span>Discount</span>

              <span>
                -$
                {discount.toFixed(2)}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between text-muted-foreground">
            <span>Shipping</span>

            <span>Free</span>
          </div>

          <div className="flex items-center justify-between border-t pt-4 text-2xl font-black">
            <span>Total</span>

            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
