import Link from "next/link";

type Props = {
  product: {
    id: string;

    slug: string;

    name: string;

    brand: string;

    variants: {
      imageUrl: string;

      price: number;
    }[];
  };
};

export function ProductCard({
  product,
}: Props) {
  const variant =
    product.variants[0];

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group rounded-2xl border bg-white p-4 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="overflow-hidden rounded-xl">
        <img
          src={variant?.imageUrl}
          alt={product.name}
          className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500">
          {product.brand}
        </p>

        <h2 className="mt-1 line-clamp-2 text-lg font-semibold">
          {product.name}
        </h2>

        <p className="mt-4 text-2xl font-bold">
          $
          {variant?.price}
        </p>
      </div>
    </Link>
  );
}
