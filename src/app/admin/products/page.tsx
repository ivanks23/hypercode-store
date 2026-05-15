import Link from "next/link";
import { Eye, Package, Pencil } from "lucide-react";
import { getAdminProducts } from "@/services/product.service";

type Props = {
  searchParams: Promise<{
    q?: string;

    page?: string;
  }>;
};

export default async function AdminProductsPage({ searchParams }: Props) {
  const { q, page } = await searchParams;

  const currentPage = page ? parseInt(page) : 1;

  const data = await getAdminProducts({
    query: q,

    page: currentPage,
  });

  const products = data.products;

  return (
    <div>
      {/* HEADER */}

      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-5xl font-black tracking-tight">Products</h1>

          <p className="mt-3 text-muted-foreground">
            Manage inventory and catalog visibility
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="rounded-2xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
        >
          Add Product
        </Link>
      </div>

      <form className="mb-8">
        <div className="flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search products..."
            className="h-12 w-full rounded-2xl border bg-white px-5 outline-none transition focus:border-violet-500"
          />

          <button
            type="submit"
            className="rounded-2xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            Search
          </button>
        </div>
      </form>

      {/* TABLE */}

      <div className="overflow-hidden rounded-[32px] border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* HEAD */}

            <thead className="border-b bg-muted/30">
              <tr className="text-left">
                <th className="px-6 py-5 font-semibold">Product</th>

                <th className="px-6 py-5 font-semibold">Category</th>

                <th className="px-6 py-5 font-semibold">Variants</th>

                <th className="px-6 py-5 font-semibold">Stock</th>

                <th className="px-6 py-5 font-semibold">Status</th>

                <th className="px-6 py-5 font-semibold">Actions</th>
              </tr>
            </thead>

            {/* BODY */}

            <tbody>
              {products.map((product) => {
                const totalStock = product.variants.reduce(
                  (acc, variant) => acc + variant.stock,
                  0,
                );

                const minPrice = Math.min(
                  ...product.variants.map((variant) => variant.price),
                );

                return (
                  <tr key={product.id} className="border-b last:border-0">
                    {/* PRODUCT */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.variants[0]?.imageUrl}
                          alt={product.name}
                          className="h-16 w-16 rounded-2xl object-cover"
                        />

                        <div>
                          <p className="font-bold">{product.name}</p>

                          <p className="mt-1 text-sm text-muted-foreground">
                            {product.brand}
                          </p>

                          <p className="mt-2 text-sm font-semibold">
                            From ${minPrice}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* CATEGORY */}

                    <td className="px-6 py-5">
                      <div className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
                        {product.category.name}
                      </div>
                    </td>

                    {/* VARIANTS */}

                    <td className="px-6 py-5">{product.variants.length}</td>

                    {/* STOCK */}

                    <td className="px-6 py-5">
                      <div>
                        <p className="font-semibold">
                          {product.variants[0]?.stock} units
                        </p>

                        {product.variants[0]?.stock === 0 && (
                          <span className="mt-2 inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                            Out of stock
                          </span>
                        )}

                        {product.variants[0]?.stock > 0 &&
                          product.variants[0]?.stock <= 5 && (
                            <span className="mt-2 inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                              Low stock
                            </span>
                          )}
                      </div>
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-4 py-2 text-sm font-medium ${
                          product.active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {product.active ? "Active" : "Hidden"}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/product/${product.slug}`}
                          className="flex h-10 w-10 items-center justify-center rounded-xl border transition hover:bg-muted"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>

                        <Link
                          href={`/admin/products/${product.id}`}
                          className="flex h-10 w-10 items-center justify-center rounded-xl border transition hover:bg-muted"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        {/* INFO */}

        <p className="text-sm text-muted-foreground">
          Page {data.currentPage} of {data.totalPages}
        </p>

        {/* BUTTONS */}

        <div className="flex items-center gap-3">
          {data.currentPage > 1 && (
            <Link
              href={{
                pathname: "/admin/products",

                query: {
                  q,

                  page: data.currentPage - 1,
                },
              }}
              className="rounded-xl border px-5 py-2 text-sm font-medium transition hover:bg-muted"
            >
              Previous
            </Link>
          )}

          {data.currentPage < data.totalPages && (
            <Link
              href={{
                pathname: "/admin/products",

                query: {
                  q,

                  page: data.currentPage + 1,
                },
              }}
              className="rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
