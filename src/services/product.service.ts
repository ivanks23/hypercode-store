import { prisma } from "@/lib/prisma";

type GetProductsInput = {
  query?: string;

  category?: string;

  sort?: string;
};

export async function getProducts({
  query,
  category,
  sort,
}: GetProductsInput = {}) {
  const products = await prisma.product.findMany({
    where: {
      active: true,

      ...(query && {
        OR: [
          {
            name: {
              contains: query,

              mode: "insensitive" as const,
            },
          },

          {
            brand: {
              contains: query,

              mode: "insensitive" as const,
            },
          },
        ],
      }),

      ...(category && {
        category: {
          slug: category,
        },
      }),
    },

    include: {
      variants: true,

      category: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  if (sort === "price_asc") {
    products.sort((a, b) => a.variants[0].price - b.variants[0].price);
  }

  if (sort === "price_desc") {
    products.sort((a, b) => b.variants[0].price - a.variants[0].price);
  }

  return products;
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: {
      slug,
    },

    include: {
      variants: true,

      category: true,
    },
  });
}

type AdminProductsInput = {
  query?: string;

  page?: number;
};

export async function getAdminProducts({
  query,
  page = 1,
}: AdminProductsInput) {
  const limit = 10;

  const skip = (page - 1) * limit;

  const where = query
    ? {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive" as const,
            },
          },

          {
            brand: {
              contains: query,
              mode: "insensitive" as const,
            },
          },

          {
            slug: {
              contains: query,
              mode: "insensitive" as const,
            },
          },

          {
            category: {
              name: {
                contains: query,
                mode: "insensitive" as const,
              },
            },
          },

          {
            variants: {
              some: {
                sku: {
                  contains: query,
                  mode: "insensitive" as const,
                },
              },
            },
          },
        ],
      }
    : {};

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,

      include: {
        category: true,

        variants: true,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: limit,

      skip,
    }),

    prisma.product.count({
      where,
    }),
  ]);

  return {
    products,

    total,

    totalPages: Math.ceil(total / limit),

    currentPage: page,
  };
}

export async function getAdminProductById(id: string) {
  return prisma.product.findUnique({
    where: {
      id,
    },

    include: {
      variants: true,

      category: true,
    },
  });
}
