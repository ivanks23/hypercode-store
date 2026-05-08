import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="border-b bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto grid gap-10 px-4 py-20 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            HyperCode Store
          </p>

          <h1 className="mt-4 text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            Tech peripherals
            for modern setups.
          </h1>

          <p className="mt-6 max-w-lg text-lg text-gray-600">
            High-quality keyboards,
            mice, laptop parts,
            batteries, displays and
            accessories for your
            workstation.
          </p>

          <div className="mt-8 flex gap-4">
            <Button asChild size="lg">
              <Link href="/products">
                Shop now
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
            >
              <Link href="/categories">
                Browse categories
              </Link>
            </Button>
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <img
            src="https://placehold.co/800x600"
            alt="Gaming setup"
            className="rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
