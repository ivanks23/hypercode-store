"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
  const router = useRouter();

  const searchParams = useSearchParams();

  function handleSearch(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const value = event.target.value;

    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.push(`/products?${params.toString()}`);
  }

  return (
    <input
      type="text"
      placeholder="Search products..."
      onChange={handleSearch}
      className="border rounded-lg px-4 py-2 w-full"
    />
  );
}