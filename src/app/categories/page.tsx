import Link from "next/link";

import { getCategories } from "@/services/category.service";

export default async function CategoriesPage() {
  const categories =
    await getCategories();

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          Browse
        </p>

        <h1 className="mt-2 text-5xl font-bold tracking-tight">
          Categories
        </h1>

        <p className="mt-4 max-w-2xl text-gray-600">
          Explore our collection
          of peripherals, laptop
          parts and accessories.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(
          (category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group rounded-3xl border bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-52 flex-col justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                    Category
                  </p>

                  <h2 className="mt-3 text-3xl font-bold tracking-tight">
                    {category.name}
                  </h2>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    View products
                  </span>

                  <span className="text-2xl transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </main>
  );
}
