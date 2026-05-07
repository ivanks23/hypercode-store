import Link from "next/link";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    brand: string;
    variants: {
      price: number;
      imageUrl: string;
    }[];
  };
};

export function ProductCard({
  product,
}: ProductCardProps) {
  const firstVariant = product.variants[0];

  return (
    <article className="border rounded-xl p-4">
      <Link href={`/product/${product.slug}`}>
        <img
          src={firstVariant.imageUrl}
          alt={product.name}
          className="w-full rounded-lg"
        />
      </Link>

      <div className="mt-4">
        <p className="text-sm text-gray-500">
          {product.brand}
        </p>

        <h2 className="font-semibold">
          {product.name}
        </h2>

        <p className="mt-2 text-xl font-bold">
          ${firstVariant.price}
        </p>
      </div>
    </article>
  );
}