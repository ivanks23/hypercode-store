import Link from "next/link";

import {
  CheckCircle2,
} from "lucide-react";

export default function SuccessPage() {
  return (
    <main className="container mx-auto flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="max-w-xl rounded-[32px] border bg-white p-12 text-center shadow-sm">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>

        <h1 className="mt-8 text-5xl font-black tracking-tight">
          Payment approved
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          Your order has been received
          successfully.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/products"
            className="rounded-2xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            Continue shopping
          </Link>

          <Link
            href="/"
            className="rounded-2xl border px-6 py-3 font-semibold transition hover:bg-muted"
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}