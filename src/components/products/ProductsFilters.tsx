import Link from "next/link";
import { getCategories } from "@/services/category.service";

type Props = {
  currentCategory?: string;
};

export async function ProductsFilters({
  currentCategory,
}: Props) {
  const categories =
    await getCategories();

  return (
    <aside className="w-full rounded-2xl border bg-white p-6">
      <div>
        <h2 className="text-lg font-bold">
          Categories
        </h2>

        <div className="mt-4 flex flex-col gap-3">
          <Link
            href="/products"
            className={`text-sm transition hover:text-black ${
              !currentCategory
                ? "font-bold text-black"
                : "text-gray-500"
            }`}
          >
            All products
          </Link>

          {categories.map(
            (category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className={`text-sm transition hover:text-black ${
                  currentCategory ===
                  category.slug
                    ? "font-bold text-black"
                    : "text-gray-500"
                }`}
              >
                {category.name}
              </Link>
            )
          )}
        </div>
      </div>
    </aside>
  );
}
