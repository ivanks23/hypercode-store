import { z } from "zod";

export const createProductSchema =
  z.object({
    name: z
      .string()
      .min(2),

    slug: z
      .string()
      .min(2),

    description: z
      .string()
      .min(10),

    brand: z
      .string()
      .min(2),

    categoryId:
      z.string(),

    active:
      z.boolean(),

    variantName:
      z.string()
      .min(1),

    sku: z
      .string()
      .min(1),

    price: z.coerce
      .number()
      .positive(),

    stock: z.coerce
      .number()
      .min(0),

    imageUrl: z
      .url(),
  });

export type CreateProductInput =
  z.infer<
    typeof createProductSchema
  >;