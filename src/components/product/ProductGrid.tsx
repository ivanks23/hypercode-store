import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: any[];
};

export function ProductGrid({
  products,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="border rounded-xl p-10 text-center">
        <h2 className="text-2xl font-bold">
          No products found
        </h2>

        <p className="text-gray-500 mt-2">
          Try adjusting your filters or search.
        </p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </section>
  );
}
