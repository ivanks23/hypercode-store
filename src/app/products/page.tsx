import { CategoryList } from "@/components/product/CategoryList";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SearchBar } from "@/components/product/SearchBar";

import { getCategories } from "@/services/category.service";
import { getProducts } from "@/services/product.service";

type Props = {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const products = await getProducts({
    category: params.category,
    search: params.search,
  });

  const categories = await getCategories();

  return (
    <main className="container mx-auto p-8">
      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3">
          <CategoryList
            categories={categories}
            currentCategory={params.category}
          />
        </div>

        <div className="lg:col-span-9">
          <ProductGrid products={products} />
        </div>
      </div>
    </main>
  );
}
