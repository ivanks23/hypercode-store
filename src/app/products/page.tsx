import Link from "next/link";

import { ProductCard } from "@/components/products/ProductCard";
import { ProductsFilters } from "@/components/products/ProductsFilters";

import { getProducts } from "@/services/product.service";

type Props = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    sort?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: Props) {
  const params =
    await searchParams;

  const products =
    await getProducts({
      query: params.q,
      category: params.category,
      sort: params.sort,
    });

  return (
    <main className="container mx-auto p-8">
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Products
          </h1>

          <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-500">
            {params.q && (
              <span>
                Search:
                {" "}
                <strong>
                  {params.q}
                </strong>
              </span>
            )}

            {params.category && (
              <span>
                Category:
                {" "}
                <strong>
                  {params.category}
                </strong>
              </span>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-sm text-gray-500">
              Sort by:
            </span>

            <div className="flex flex-wrap gap-2">
              <Link
                href={{
                  pathname: "/products",
                  query: {
                    ...params,
                    sort: "newest",
                  },
                }}
                className={`rounded-lg border px-3 py-1 text-sm transition ${
                  !params.sort ||
                  params.sort ===
                    "newest"
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
              >
                Newest
              </Link>

              <Link
                href={{
                  pathname: "/products",
                  query: {
                    ...params,
                    sort: "price_asc",
                  },
                }}
                className={`rounded-lg border px-3 py-1 text-sm transition ${
                  params.sort ===
                  "price_asc"
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
              >
                Lowest Price
              </Link>

              <Link
                href={{
                  pathname: "/products",
                  query: {
                    ...params,
                    sort: "price_desc",
                  },
                }}
                className={`rounded-lg border px-3 py-1 text-sm transition ${
                  params.sort ===
                  "price_desc"
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
              >
                Highest Price
              </Link>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          {products.length}
          {" "}
          products
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <div>
          <ProductsFilters
            currentCategory={
              params.category
            }
          />
        </div>

        <div>
          {products.length === 0 && (
            <div className="rounded-xl border p-10 text-center">
              <h2 className="text-2xl font-semibold">
                No products found
              </h2>

              <p className="mt-2 text-gray-500">
                Try another search.
              </p>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
