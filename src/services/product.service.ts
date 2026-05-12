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
  const products =
    await prisma.product.findMany({
      where: {
        active: true,

        ...(query && {
          OR: [
            {
              name: {
                contains: query,

                mode: "insensitive",
              },
            },

            {
              brand: {
                contains: query,

                mode: "insensitive",
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
    products.sort(
      (a, b) =>
        a.variants[0].price -
        b.variants[0].price
    );
  }

  if (sort === "price_desc") {
    products.sort(
      (a, b) =>
        b.variants[0].price -
        a.variants[0].price
    );
  }

  return products;
}

export async function getProductBySlug(
  slug: string
) {
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

export async function getAdminProducts() {
  return prisma.product.findMany({
    include: {
      category: true,

      variants: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAdminProductById(
  id: string
) {
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