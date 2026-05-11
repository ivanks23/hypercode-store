import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      className="group overflow-hidden rounded-3xl border bg-white/70 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative overflow-hidden">
        {/* BADGE */}

        <div className="absolute left-4 top-4 z-10 rounded-full border bg-white/80 px-3 py-1 text-xs font-medium backdrop-blur">
          Featured
        </div>

        {/* IMAGE */}

        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={variant?.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* CONTENT */}

      <div className="p-5">
        <p className="text-sm font-medium text-violet-600">
          {product.brand}
        </p>

        <h2 className="mt-2 line-clamp-2 text-xl font-bold tracking-tight">
          {product.name}
        </h2>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Starting at
            </p>

            <p className="text-3xl font-black tracking-tight">
              $
              {variant?.price}
            </p>
          </div>

          <Button
            size="icon"
            className="rounded-full"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Link>
  );
}