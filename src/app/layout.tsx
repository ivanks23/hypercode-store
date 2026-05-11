import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "HyperCode Store",

  description:
    "Tech ecommerce built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <Navbar />

        {children}

        <CartDrawer />

        <Toaster richColors />
      </body>
    </html>
  );
}