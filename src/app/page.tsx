import Link from "next/link";

import { Button } from "@/components/ui/button";

import { getProducts } from "@/services/product.service";

import { ProductCard } from "@/components/products/ProductCard";

export default async function HomePage() {
  const products =
    await getProducts();

  const featuredProducts =
    products.slice(0, 3);

  return (
    <main>
      {/* HERO */}

      <section className="relative overflow-hidden">
        <div className="container mx-auto grid gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border bg-white/70 px-4 py-1 text-sm backdrop-blur">
              New generation gaming gear
            </div>

            <h1 className="max-w-2xl text-5xl font-black tracking-tight sm:text-6xl">
              Build your
              {" "}
              ultimate
              {" "}
              setup.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Premium gaming peripherals,
              professional accessories,
              and high-performance tech
              designed for serious players.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/products">
                  Shop now
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
              >
                <Link href="/products">
                  Explore products
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 blur-3xl" />

            <div className="relative rounded-[40px] border bg-white/60 p-6 shadow-2xl backdrop-blur">
              <img
                src="https://placehold.co/900x700"
                alt="Gaming setup"
                className="rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}

      <section className="container mx-auto px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              Categories
            </h2>

            <p className="mt-2 text-muted-foreground">
              Explore our curated tech
              collections.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/products?category=mice"
            className="group rounded-3xl border bg-white/60 p-8 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="text-4xl">
              🖱️
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Gaming Mice
            </h3>

            <p className="mt-2 text-muted-foreground">
              Precision and speed for
              competitive gaming.
            </p>
          </Link>

          <Link
            href="/products?category=keyboards"
            className="group rounded-3xl border bg-white/60 p-8 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="text-4xl">
              ⌨️
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Keyboards
            </h3>

            <p className="mt-2 text-muted-foreground">
              Mechanical performance
              meets premium design.
            </p>
          </Link>

          <Link
            href="/products?category=headsets"
            className="group rounded-3xl border bg-white/60 p-8 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="text-4xl">
              🎧
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Headsets
            </h3>

            <p className="mt-2 text-muted-foreground">
              Immersive sound built for
              gamers and creators.
            </p>
          </Link>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}

      <section className="container mx-auto px-6 py-16">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              Featured Products
            </h2>

            <p className="mt-2 text-muted-foreground">
              Our most popular gear.
            </p>
          </div>

          <Button
            asChild
            variant="outline"
          >
            <Link href="/products">
              View all
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            )
          )}
        </div>
      </section>

      {/* CTA */}

      <section className="container mx-auto px-6 pb-24">
        <div className="relative overflow-hidden rounded-[40px] border bg-gradient-to-br from-violet-500/10 via-white to-fuchsia-500/10 p-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black">
              Upgrade your setup today.
            </h2>

            <p className="mt-4 text-lg text-muted-foreground">
              Discover premium gaming
              gear and take your
              experience to the next
              level.
            </p>

            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/products">
                  Start shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}