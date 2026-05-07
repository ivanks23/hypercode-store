import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-5xl font-bold">
        Hyper Code Store 
      </h1>

      <p className="mt-4 text-lg">
        Periféricos y componentes de computadora de alta calidad a precios competitivos. <br /> Encuentra todo lo que necesitas para tu setup ideal.
      </p>

      <Link
        href="/products"
        className="inline-block mt-8 bg-black text-white px-6 py-3 rounded-lg"
      >
        Buscar productos
      </Link>
    </main>
  );
}
