"use client";

import {
  LogOut,
} from "lucide-react";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
      className="rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-muted"
    >
      <span className="flex items-center gap-2">
        <LogOut className="h-4 w-4" />

        Logout
      </span>
    </button>
  );
}