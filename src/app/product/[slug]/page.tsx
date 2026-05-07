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

  if (!product) {
    notFound();
  }

  return (
    <main className="container mx-auto p-8">
      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={product.variants[0].imageUrl}
          alt={product.name}
          className="rounded-xl"
        />

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
            ${product.variants[0].price}
          </p>

          <AddToCartButton
            item={{
              variantId: product.variants[0].id,
              productSlug: product.slug,
              productName: product.name,
              variantName: product.variants[0].name,
              imageUrl: product.variants[0].imageUrl,
              price: product.variants[0].price,
            }}
          />
        </div>
      </div>
    </main>
  );
}
