"use client";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

import { useDebounce } from "@/hooks/useDebounce";

export function SearchBar() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const debouncedSearch =
    useDebounce(search);

  useEffect(() => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (debouncedSearch) {
      params.set(
        "search",
        debouncedSearch
      );
    } else {
      params.delete("search");
    }

    router.push(
      `/products?${params.toString()}`
    );
  }, [
    debouncedSearch,
    router,
    searchParams,
  ]);

  return (
    <input
      type="text"
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      placeholder="Search products..."
      className="border rounded-lg px-4 py-2 w-full"
    />
  );
}
