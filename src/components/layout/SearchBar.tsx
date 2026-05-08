"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  const router = useRouter();

  const [query, setQuery] =
    useState("");

  function handleSearch(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!query.trim()) {
      router.push("/products");

      return;
    }

    router.push(
      `/products?q=${encodeURIComponent(
        query
      )}`
    );
  }

  return (
    <form
      onSubmit={handleSearch}
      className="relative w-full"
    >
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

      <Input
        placeholder="Search products..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        className="pl-10"
      />
    </form>
  );
}
