"use client";

import Link from "next/link";

import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useCartStore } from "@/store/cart.store";

export function CartDrawer() {
  const items =
    useCartStore(
      (state) => state.items
    );

  const isOpen =
    useCartStore(
      (state) => state.isOpen
    );

  const closeCart =
    useCartStore(
      (state) =>
        state.closeCart
    );

  const subtotal =
    useCartStore(
      (state) => state.subtotal
    );

  const removeItem =
    useCartStore(
      (state) =>
        state.removeItem
    );

  const updateQuantity =
    useCartStore(
      (state) =>
        state.updateQuantity
    );

  return (
    <>
      {/* BACKDROP */}

      {isOpen && (
        <div
          onClick={closeCart}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        />
      )}

      {/* DRAWER */}

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l bg-white shadow-2xl transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* HEADER */}

        <div className="flex items-center justify-between border-b p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-violet-500/10 p-2 text-violet-700">
              <ShoppingBag className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Your Cart
              </h2>

              <p className="text-sm text-muted-foreground">
                {items.length}
                {" "}
                items
              </p>
            </div>
          </div>

          <Button
            size="icon"
            variant="ghost"
            onClick={closeCart}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* CONTENT */}

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="rounded-full bg-muted p-5">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Your cart is empty
              </h3>

              <p className="mt-2 text-muted-foreground">
                Add some products to
                get started.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item) => (
                <article
                  key={
                    item.variantId
                  }
                  className="flex gap-4 rounded-3xl border bg-white/70 p-4"
                >
                  <img
                    src={item.imageUrl}
                    alt={
                      item.productName
                    }
                    className="h-24 w-24 rounded-2xl object-cover"
                  />

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="line-clamp-2 font-bold">
                          {
                            item.productName
                          }
                        </h3>

                        <p className="text-sm text-muted-foreground">
                          {
                            item.variantName
                          }
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          removeItem(
                            item.variantId
                          )
                        }
                        className="text-muted-foreground transition hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4">
                      <p className="text-xl font-black">
                        $
                        {item.price}
                      </p>

                      <div className="flex items-center gap-2 rounded-full border px-2 py-1">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.variantId,
                              item.quantity -
                                1
                            )
                          }
                          className="rounded-full p-1 transition hover:bg-muted"
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <span className="min-w-[20px] text-center text-sm font-medium">
                          {
                            item.quantity
                          }
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.variantId,
                              item.quantity +
                                1
                            )
                          }
                          className="rounded-full p-1 transition hover:bg-muted"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}

        {items.length > 0 && (
          <div className="border-t p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-lg text-muted-foreground">
                Subtotal
              </span>

              <span className="text-3xl font-black">
                $
                {subtotal()}
              </span>
            </div>

            <Button
              asChild
              size="lg"
              className="w-full"
            >
              <Link
                href="/checkout"
                onClick={
                  closeCart
                }
              >
                Continue to checkout
              </Link>
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}