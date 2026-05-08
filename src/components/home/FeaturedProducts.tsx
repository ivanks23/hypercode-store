import { ProductCard } from "@/components/products/ProductCard";
import { getProducts } from "@/services/product.service";

export async function FeaturedProducts() {
  const products =
    await getProducts();

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Featured
          </p>

          <h2 className="mt-2 text-4xl font-bold tracking-tight">
            Popular products
          </h2>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products
          .slice(0, 4)
          .map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
      </div>
    </section>
  );
}
