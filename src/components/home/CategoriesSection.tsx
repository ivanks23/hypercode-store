import Link from "next/link";
import { getCategories } from "@/services/category.service";

export async function CategoriesSection() {
  const categories =
    await getCategories();

  return (
    <section className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-20">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Categories
          </p>

          <h2 className="mt-2 text-4xl font-bold tracking-tight">
            Shop by category
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(
            (category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group rounded-2xl border bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight">
                      {category.name}
                    </h3>

                    <p className="mt-3 text-sm text-gray-500">
                      Explore products
                      and accessories.
                    </p>
                  </div>

                  <div className="mt-8 text-sm font-medium text-black">
                    View products →
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}
