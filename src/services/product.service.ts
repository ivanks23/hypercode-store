import { prisma } from "@/lib/prisma";

type GetProductsParams = {
  category?: string;
  search?: string;
  sort?: string;
};

export async function getProducts({
  category,
  search,
  sort,
}: GetProductsParams) {
  return prisma.product.findMany({
    where: {
      active: true,

      ...(category && {
        category: {
          slug: category,
        },
      }),

      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },

          {
            brand: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }),
    },

    include: {
      category: true,
      variants: true,
    },

    orderBy: 
      sort === "price_asc" 
      ? { 
        variants: { 
          _count: "desc", },
         }
      : { createdAt: "desc", },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: {
      slug,
    },

    include: {
      category: true,
      variants: true,
    },
  });
}
