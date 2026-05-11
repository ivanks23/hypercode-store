import Link from "next/link";
import { ChevronRight, ShieldCheck, Truck } from "lucide-react";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { getProductBySlug } from "@/services/product.service";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({
  params,
}: Props) {
  const { slug } =
    await params;

  const product =
    await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const defaultVariant =
    product.variants[0];

  return (
    <main className="container mx-auto px-6 py-10">
      {/* BREADCRUMBS */}

      <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link
          href="/"
          className="hover:text-black"
        >
          Home
        </Link>

        <ChevronRight className="h-4 w-4" />

        <Link
          href="/products"
          className="hover:text-black"
        >
          Products
        </Link>

        <ChevronRight className="h-4 w-4" />

        <span className="text-black">
          {product.name}
        </span>
      </div>

      {/* PRODUCT */}

      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        {/* IMAGE */}

        <div className="relative overflow-hidden rounded-[36px] border bg-white/70 p-4 shadow-sm backdrop-blur">
          <div className="absolute left-8 top-8 z-10 rounded-full border bg-white/80 px-4 py-1 text-sm font-medium backdrop-blur">
            Featured
          </div>

          {defaultVariant ? (
            <div className="overflow-hidden rounded-[28px] bg-muted">
              <img
                src={
                  defaultVariant.imageUrl
                }
                alt={product.name}
                className="aspect-square w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
          ) : (
            <div className="flex aspect-square items-center justify-center rounded-[28px] bg-muted text-muted-foreground">
              No image available
            </div>
          )}
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

          {/* PRICE */}

          <div className="mt-8 flex items-end gap-3">
            <p className="text-5xl font-black tracking-tight">
              {defaultVariant
                ? `$${defaultVariant.price}`
                : "--"}
            </p>

            <span className="pb-1 text-sm text-muted-foreground">
              MXN
            </span>
          </div>

          {/* FEATURES */}

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border bg-white/60 p-4">
              <Truck className="h-5 w-5 text-violet-600" />

              <div>
                <p className="font-medium">
                  Free shipping
                </p>

                <p className="text-sm text-muted-foreground">
                  On orders over
                  $1999 MXN
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border bg-white/60 p-4">
              <ShieldCheck className="h-5 w-5 text-violet-600" />

              <div>
                <p className="font-medium">
                  Official warranty
                </p>

                <p className="text-sm text-muted-foreground">
                  Genuine products
                  with support
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}

          <div className="mt-10">
            {defaultVariant ? (
              <AddToCartButton
                item={{
                  variantId:
                    defaultVariant.id,

                  productSlug:
                    product.slug,

                  productName:
                    product.name,

                  variantName:
                    defaultVariant.name,

                  imageUrl:
                    defaultVariant.imageUrl,

                  price:
                    defaultVariant.price,
                }}
              />
            ) : (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
                Product unavailable
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}