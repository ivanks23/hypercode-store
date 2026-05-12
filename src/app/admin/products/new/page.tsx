import { getCategories } from "@/services/category.service";

import { CreateProductForm } from "@/components/admin/CreateProductForm";

export default async function NewProductPage() {
  const categories =
    await getCategories();

  return (
    <div>
      {/* HEADER */}

      <div className="mb-10">
        <h1 className="text-5xl font-black tracking-tight">
          Add Product
        </h1>

        <p className="mt-3 text-muted-foreground">
          Create a new product for the catalog
        </p>
      </div>

      {/* FORM */}

      <div className="max-w-4xl">
        <CreateProductForm
          categories={
            categories
          }
        />
      </div>
    </div>
  );
}