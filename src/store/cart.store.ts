"use client";

import { create } from "zustand";

import { persist } from "zustand/middleware";

import { CartItem } from "@/types/cart";

type CartStore = {
  items: CartItem[];

  isOpen: boolean;

  openCart: () => void;

  closeCart: () => void;

  toggleCart: () => void;

  addItem: (
    item: CartItem
  ) => void;

  removeItem: (
    variantId: string
  ) => void;

  updateQuantity: (
    variantId: string,
    quantity: number
  ) => void;

  clearCart: () => void;

  totalItems: () => number;

  subtotal: () => number;
};

export const useCartStore =
  create<CartStore>()(
    persist(
      (set, get) => ({
        items: [],

        isOpen: false,

        openCart: () =>
          set({
            isOpen: true,
          }),

        closeCart: () =>
          set({
            isOpen: false,
          }),

        toggleCart: () =>
          set({
            isOpen:
              !get().isOpen,
          }),

        addItem: (item) => {
          const items =
            get().items;

          const existingItem =
            items.find(
              (i) =>
                i.variantId ===
                item.variantId
            );

          if (existingItem) {
            set({
              items: items.map(
                (i) =>
                  i.variantId ===
                  item.variantId
                    ? {
                        ...i,

                        quantity:
                          i.quantity +
                          item.quantity,
                      }
                    : i
              ),
            });
          } else {
            set({
              items: [
                ...items,
                item,
              ],
            });
          }

          get().openCart();
        },

        removeItem: (
          variantId
        ) => {
          set({
            items:
              get().items.filter(
                (item) =>
                  item.variantId !==
                  variantId
              ),
          });
        },

        updateQuantity: (
          variantId,
          quantity
        ) => {
          if (
            quantity <= 0
          ) {
            return get().removeItem(
              variantId
            );
          }

          set({
            items:
              get().items.map(
                (item) =>
                  item.variantId ===
                  variantId
                    ? {
                        ...item,
                        quantity,
                      }
                    : item
              ),
          });
        },

        clearCart: () => {
          set({
            items: [],
          });
        },

        totalItems: () => {
          return get().items.reduce(
            (
              acc,
              item
            ) =>
              acc +
              item.quantity,
            0
          );
        },

        subtotal: () => {
          return get().items.reduce(
            (
              acc,
              item
            ) =>
              acc +
              item.price *
                item.quantity,
            0
          );
        },
      }),

      {
        name:
          "cart-storage",
      }
    )
  );