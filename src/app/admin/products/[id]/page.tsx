import { notFound } from "next/navigation";
import { CreateProductForm } from "@/components/admin/CreateProductForm";
import { getCategories } from "@/services/category.service";
import { getAdminProductById } from "@/services/product.service";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({
  params,
}: Props) {
  const { id } =
    await params;

  const [
    product,
    categories,
  ] = await Promise.all([
    getAdminProductById(
      id
    ),

    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div>
      {/* HEADER */}

      <div className="mb-10">
        <h1 className="text-5xl font-black tracking-tight">
          Edit Product
        </h1>

        <p className="mt-3 text-muted-foreground">
          Update product information and inventory
        </p>
      </div>

      {/* FORM */}

      <div className="max-w-4xl">
        <CreateProductForm
          categories={
            categories
          }
          initialData={
            product
          }
        />
      </div>
    </div>
  );
}