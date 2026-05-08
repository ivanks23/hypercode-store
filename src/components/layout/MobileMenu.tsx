"use client";

import Link from "next/link";
import { useState } from "react";

import { Menu, ShoppingCart } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-10 flex flex-col gap-6">
          <Link
  href="/"
  onClick={() => setIsOpen(false)}
  className="text-lg font-semibold"
>
            Home
          </Link>

          <Link
            href="/products"
            onClick={() => setIsOpen(false)}
            className="text-lg font-semibold"
          >
            Products
          </Link>

          <Link
            href="/categories"
            onClick={() => setIsOpen(false)}
            className="text-lg font-semibold"
          >
            Categories
          </Link>

          <Link
            href="/cart"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <ShoppingCart className="h-5 w-5" />
            Cart
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
