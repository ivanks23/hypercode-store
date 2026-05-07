"use client";

import { useTransition } from "react";

import {
  useForm,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  checkoutSchema,
  CheckoutInput,
} from "@/schemas/checkout.schema";

import { useCartStore } from "@/store/cart.store";

import { createOrderAction } from "@/actions/create-order";

export function CheckoutForm() {
  const items = useCartStore(
    (state) => state.items
  );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const [isPending, startTransition] =
    useTransition();

  const {
    register,
    handleSubmit,
  } = useForm<CheckoutInput>({
    resolver:
      zodResolver(
        checkoutSchema
      ),
  });

  function onSubmit(
    data: CheckoutInput
  ) {
    startTransition(async () => {
      const result =
        await createOrderAction({
          formData: data,
          items,
        });

      if (result.success) {
        clearCart();

      window.location.href = 
        result.paymentUrl;
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <input
        {...register("fullName")}
        placeholder="Full name"
        className="border rounded-lg p-3 w-full"
      />

      <input
        {...register("phone")}
        placeholder="Phone"
        className="border rounded-lg p-3 w-full"
      />

      <input
        {...register("street")}
        placeholder="Street"
        className="border rounded-lg p-3 w-full"
      />

      <input
        {...register("city")}
        placeholder="City"
        className="border rounded-lg p-3 w-full"
      />

      <input
        {...register("state")}
        placeholder="State"
        className="border rounded-lg p-3 w-full"
      />

      <input
        {...register("zipCode")}
        placeholder="ZIP Code"
        className="border rounded-lg p-3 w-full"
      />

      <input
        {...register("country")}
        placeholder="Country"
        className="border rounded-lg p-3 w-full"
      />

      <button
        disabled={isPending}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        {isPending
          ? "Processing..."
          : "Place order"}
      </button>
    </form>
  );
}
