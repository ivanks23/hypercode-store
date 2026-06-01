import Link from "next/link";

export function AccountSidebar() {
  return (
    <aside className="rounded-[32px] border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-bold">
        My Account
      </h2>

      <nav className="space-y-2">

        <Link
          href="/account"
          className="block rounded-xl px-4 py-3 transition hover:bg-gray-100"
        >
          Dashboard
        </Link>

        <Link
          href="/account/profile"
          className="block rounded-xl px-4 py-3 transition hover:bg-gray-100"
        >
          Profile
        </Link>

        <Link
          href="/account/addresses"
          className="block rounded-xl px-4 py-3 transition hover:bg-gray-100"
        >
          Addresses
        </Link>

        <Link
          href="/account/billing"
          className="block rounded-xl px-4 py-3 transition hover:bg-gray-100"
        >
          Billing Data
        </Link>

        <Link
          href="/orders"
          className="block rounded-xl px-4 py-3 transition hover:bg-gray-100"
        >
          My Orders
        </Link>

      </nav>
    </aside>
  );
}