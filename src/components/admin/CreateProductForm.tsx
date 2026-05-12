"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductAction } from "@/actions/admin/create-product";
import { updateProductAction } from "@/actions/admin/update-product";

import {
  createProductSchema,
  CreateProductInput,
} from "@/schemas/product.schema";

type Props = {
  categories: {
    id: string;
    name: string;
  }[];

  initialData?: {
    id: string;
    name: string;
    slug: string;
    description: string;
    brand: string;
    active: boolean;
    categoryId: string;

    variants: {
      id: string;
      name: string;
      sku: string;
      price: number;
      stock: number;
      imageUrl: string;
    }[];
  };
};

export function CreateProductForm({ categories, initialData }: Props) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProductSchema),

    defaultValues: {
      name: initialData?.name || "",

      slug: initialData?.slug || "",

      description: initialData?.description || "",

      brand: initialData?.brand || "",

      categoryId: initialData?.categoryId || "",

      active: initialData?.active ?? true,

      variantName: initialData?.variants[0]?.name || "",

      sku: initialData?.variants[0]?.sku || "",

      price: initialData?.variants[0]?.price || 0,

      stock: initialData?.variants[0]?.stock || 0,

      imageUrl: initialData?.variants[0]?.imageUrl || "",
    },
  });

  function onSubmit(data: CreateProductInput) {
    startTransition(async () => {
      if (initialData) {
        const result = await updateProductAction(
          initialData.id,
          initialData.variants[0].id,
          data,
        );

        if (result.success) {
          window.location.href = "/admin/products";
        }

        return;
      }

      const result = await createProductAction(data);

      if (result.success) {
        window.location.href = "/admin/products";
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      {/* PRODUCT INFO */}

      <section className="rounded-[32px] border bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">Product Information</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* NAME */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Product Name
            </label>

            <input
              {...register("name")}
              className="w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-violet-500"
              placeholder="MacBook Pro M4"
            />

            {errors.name && (
              <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* SLUG */}

          <div>
            <label className="mb-2 block text-sm font-medium">Slug</label>

            <input
              {...register("slug")}
              className="w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-violet-500"
              placeholder="macbook-pro-m4"
            />
          </div>

          {/* BRAND */}

          <div>
            <label className="mb-2 block text-sm font-medium">Brand</label>

            <input
              {...register("brand")}
              className="w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-violet-500"
              placeholder="Apple"
            />
          </div>

          {/* CATEGORY */}

          <div>
            <label className="mb-2 block text-sm font-medium">Category</label>

            <select
              {...register("categoryId")}
              className="w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-violet-500"
            >
              <option value="">Select category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* DESCRIPTION */}

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium">Description</label>

          <textarea
            {...register("description")}
            rows={5}
            className="w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-violet-500"
            placeholder="High-performance laptop for developers and creators..."
          />
        </div>

        {/* ACTIVE */}

        <div className="mt-6 flex items-center gap-3">
          <input type="checkbox" {...register("active")} className="h-5 w-5" />

          <label className="font-medium">Product active</label>
        </div>
      </section>

      {/* VARIANT */}

      <section className="rounded-[32px] border bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">Initial Variant</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* VARIANT NAME */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Variant Name
            </label>

            <input
              {...register("variantName")}
              className="w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-violet-500"
              placeholder="16GB / 512GB"
            />
          </div>

          {/* SKU */}

          <div>
            <label className="mb-2 block text-sm font-medium">SKU</label>

            <input
              {...register("sku")}
              className="w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-violet-500"
              placeholder="MBP-M4-16-512"
            />
          </div>

          {/* PRICE */}

          <div>
            <label className="mb-2 block text-sm font-medium">Price</label>

            <input
              type="number"
              step="0.01"
              {...register("price")}
              className="w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-violet-500"
            />
          </div>

          {/* STOCK */}

          <div>
            <label className="mb-2 block text-sm font-medium">Stock</label>

            <input
              type="number"
              {...register("stock")}
              className="w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-violet-500"
            />
          </div>
        </div>

        {/* IMAGE */}

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium">Image URL</label>

          <input
            {...register("imageUrl")}
            className="w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-violet-500"
            placeholder="https://..."
          />
        </div>
      </section>

      {/* CTA */}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-2xl bg-violet-600 px-8 py-4 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50"
      >
        {isPending ? "Creating product..." : "Create Product"}
      </button>
    </form>
  );
}
