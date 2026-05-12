"use server";

import { prisma } from "@/lib/prisma";

import {
  createProductSchema,
} from "@/schemas/product.schema";

export async function createProductAction(
  formData: unknown
) {
  const validated =
    createProductSchema.parse(
      formData
    );

  await prisma.product.create({
    data: {
      name:
        validated.name,

      slug:
        validated.slug,

      description:
        validated.description,

      brand:
        validated.brand,

      active:
        validated.active,

      categoryId:
        validated.categoryId,

      variants: {
        create: {
          name:
            validated.variantName,

          sku:
            validated.sku,

          price:
            validated.price,

          stock:
            validated.stock,

          imageUrl:
            validated.imageUrl,
        },
      },
    },
  });

  return {
    success: true,
  };
}