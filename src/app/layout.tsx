import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tech Ecommerce",
  description: "Peripherals and tech parts store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}