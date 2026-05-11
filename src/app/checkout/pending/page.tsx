import Link from "next/link";

import {
  Clock3,
} from "lucide-react";

export default function PendingPage() {
  return (
    <main className="container mx-auto flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="max-w-xl rounded-[32px] border bg-white p-12 text-center shadow-sm">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-yellow-100">
          <Clock3 className="h-12 w-12 text-yellow-600" />
        </div>

        <h1 className="mt-8 text-5xl font-black tracking-tight">
          Payment pending
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          Your payment is being reviewed.
        </p>

        <div className="mt-10">
          <Link
            href="/"
            className="rounded-2xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}