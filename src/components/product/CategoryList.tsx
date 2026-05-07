import Link from "next/link";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Props = {
  categories: Category[];
  currentCategory?: string;
};

export function CategoryList({
  categories,
  currentCategory,
}: Props) {
  return (
    <aside className="space-y-2">
      <h2 className="font-bold text-lg mb-4">
        Categories
      </h2>

      <Link
        href="/products"
        className={
          !currentCategory
            ? "font-bold"
            : ""
        }
      >
        All
      </Link>

      {categories.map((category) => (
        <div key={category.id}>
          <Link
            href={`/products?category=${category.slug}`}
            className={
              currentCategory === category.slug
                ? "font-bold"
                : ""
            }
          >
            {category.name}
          </Link>
        </div>
      ))}
    </aside>
  );
}
