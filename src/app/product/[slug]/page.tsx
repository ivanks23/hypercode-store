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
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  console.log(product);

  if (!product) {
    notFound();
  }

  const defaultVariant =
    product.variants[0];

  return (
    <main className="container mx-auto p-8">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          {defaultVariant ? (
            <img
              src={defaultVariant.imageUrl}
              alt={product.name}
              className="rounded-xl w-full"
            />
          ) : (
            <div className="aspect-square bg-gray-200 rounded-xl flex items-center justify-center">
              No image available
            </div>
          )}
        </div>

        <div>
          <p className="text-gray-500">
            {product.brand}
          </p>

          <h1 className="text-4xl font-bold mt-2">
            {product.name}
          </h1>

          <p className="mt-4">
            {product.description}
          </p>

          <p className="text-3xl font-bold mt-6">
            {defaultVariant
              ? `$${defaultVariant.price}`
              : "Out of stock"}
          </p>

          {defaultVariant && (
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
          )}
        </div>
      </div>
    </main>
  );
}
