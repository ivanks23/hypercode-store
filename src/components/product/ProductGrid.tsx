import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: any[];
};

export function ProductGrid({
  products,
}: ProductGridProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </section>
  );
}
