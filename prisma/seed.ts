import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const keyboards = await prisma.category.create({
    data: {
      name: "Keyboards",
      slug: "keyboards",
    },
  });

  const mouse = await prisma.category.create({
    data: {
      name: "Mouse",
      slug: "mouse",
    },
  });

  await prisma.product.create({
    data: {
      name: "Keychron K2",
      slug: "keychron-k2",
      description: "Wireless mechanical keyboard",
      brand: "Keychron",
      categoryId: keyboards.id,

      variants: {
        create: [
          {
            name: "Red Switch",
            sku: "K2-RED",
            price: 1899,
            stock: 10,
            imageUrl:
              "https://placehold.co/600x400",
            attributes: {
              switch: "Red",
            },
          },
          {
            name: "Brown Switch",
            sku: "K2-BROWN",
            price: 1899,
            stock: 8,
            imageUrl:
              "https://placehold.co/600x400",
            attributes: {
              switch: "Brown",
            },
          },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Logitech G Pro X Superlight",
      slug: "gpro-superlight",
      description: "Gaming mouse",
      brand: "Logitech",
      categoryId: mouse.id,

      variants: {
        create: [
          {
            name: "Black",
            sku: "SUPERLIGHT-BLK",
            price: 2499,
            stock: 15,
            imageUrl:
              "https://placehold.co/600x400",
            attributes: {
              color: "Black",
            },
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });