import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/products/ProductDetails";
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

      <ProductDetails
        product={{
          name: product.name,

          slug: product.slug,

          brand: product.brand,

          description:
            product.description,

          variants:
            product.variants.map(
              (variant) => ({
                id: variant.id,

                name:
                  variant.name,

                price:
                  variant.price,

                stock:
                  variant.stock,

                imageUrl:
                  variant.imageUrl,
              })
            ),
        }}
      />
    </main>
  );
}