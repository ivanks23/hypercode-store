"use client";

import { useState } from "react";
import { Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

type Variant = {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
};

type Props = {
  product: {
    name: string;
    slug: string;
    brand: string;
    description: string;
    variants: Variant[];
  };
};

export function ProductDetails({ product }: Props) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const outOfStock = selectedVariant.stock <= 0;

  const [selectedImage, setSelectedImage] = useState(
    product.variants[0].imageUrl,
  );

  const [quantity, setQuantity] = useState(1);

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
      {/* GALLERY */}

      <div className="grid gap-4 lg:grid-cols-[100px_1fr]">
        {/* THUMBNAILS */}

        <div className="order-2 flex gap-3 lg:order-1 lg:flex-col">
          {product.variants.map((variant) => {
            const isActive = selectedImage === variant.imageUrl;

            return (
              <button
                key={variant.id}
                onClick={() => {
                  setSelectedImage(variant.imageUrl);
                  setQuantity(1);
                }}
                className={`overflow-hidden rounded-2xl border transition-all ${
                  isActive
                    ? "border-violet-600 ring-2 ring-violet-300"
                    : "hover:border-violet-300"
                }`}
              >
                <img
                  src={variant.imageUrl}
                  alt={variant.name}
                  className="aspect-square h-24 w-24 object-cover"
                />
              </button>
            );
          })}
        </div>

        {/* MAIN IMAGE */}

        <div className="relative order-1 overflow-hidden rounded-[36px] border bg-white/70 p-4 shadow-sm backdrop-blur lg:order-2">
          <div className="absolute left-8 top-8 z-10 rounded-full border bg-white/80 px-4 py-1 text-sm font-medium backdrop-blur">
            {selectedVariant.stock > 0 ? "In stock" : "Out of stock"}
          </div>

          <div className="overflow-hidden rounded-[28px] bg-muted">
            <img
              src={selectedImage}
              alt={product.name}
              className="aspect-square w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* INFO */}

      <div>
        <div className="inline-flex rounded-full border bg-violet-500/10 px-4 py-1 text-sm font-medium text-violet-700">
          {product.brand}
        </div>

        <h1 className="mt-5 text-5xl font-black tracking-tight">
          {product.name}
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        {/* VARIANTS */}

        <div className="mt-8">
          <p className="mb-4 text-sm font-medium text-muted-foreground">
            Choose version
          </p>

          <div className="flex flex-wrap gap-3">
            {product.variants.map((variant) => {
              const isSelected = selectedVariant.id === variant.id;

              return (
                <button
                  key={variant.id}
                  onClick={() => {
                    setSelectedVariant(variant);

                    setSelectedImage(variant.imageUrl);
                    setQuantity(1);
                  }}
                  className={`rounded-2xl border px-5 py-3 text-left transition-all ${
                    isSelected
                      ? "border-violet-600 bg-violet-50 shadow-md"
                      : "bg-white hover:border-violet-300"
                  }`}
                >
                  <p className="font-semibold">{variant.name}</p>

                  <p className="text-sm text-muted-foreground">
                    ${variant.price}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* PRICE */}

        <div className="mt-10 flex items-end gap-3">
          <p className="text-5xl font-black tracking-tight">
            ${selectedVariant.price}
          </p>

          <span className="pb-1 text-sm text-muted-foreground">MXN</span>
        </div>

        {/* STOCK */}

        <div className="mt-4">
          {selectedVariant.stock > 0 ? (
            <div className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              {selectedVariant.stock} units available
            </div>
          ) : (
            <div className="inline-flex rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700">
              Out of stock
            </div>
          )}
        </div>

        {/* QUANTITY */}

        <div className="mt-6 flex items-center gap-4">
          <p className="text-lg font-medium">Quantity:</p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full border bg-white text-lg font-bold text-violet-600 hover:bg-violet-100"
            >
              <Minus className="h-5 w-5" />
            </button>

            <span className="text-xl font-bold">{quantity}</span>

            <button
              onClick={() =>
                setQuantity(Math.min(selectedVariant.stock, quantity + 1))
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border bg-white text-lg font-bold text-violet-600 hover:bg-violet-100"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* TRUST */}

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 rounded-2xl border bg-white/60 p-4">
            <Truck className="h-5 w-5 text-violet-600" />

            <div>
              <p className="font-medium">Free shipping</p>

              <p className="text-sm text-muted-foreground">
                On orders over $1999 MXN
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border bg-white/60 p-4">
            <ShieldCheck className="h-5 w-5 text-violet-600" />

            <div>
              <p className="font-medium">Official warranty</p>

              <p className="text-sm text-muted-foreground">
                Genuine products with support
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}

        <div className="mt-10">
          {outOfStock ? (
            <button
              disabled
              className="rounded-2xl bg-gray-300 px-8 py-4 font-semibold text-gray-600"
            >
              Out of stock
            </button>
          ) : (
            <AddToCartButton
              item={{
                variantId: selectedVariant.id,

                productSlug: product.slug,

                productName: product.name,

                variantName: selectedVariant.name,

                imageUrl: selectedVariant.imageUrl,

                price: selectedVariant.price,

                quantity: 1,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
