import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn =
    !!req.auth;

  const pathname =
    req.nextUrl.pathname;

  /* ACCOUNT */

  if (
    pathname.startsWith(
      "/account"
    ) ||
    pathname.startsWith(
      "/orders"
    )
  ) {
    if (!isLoggedIn) {
      return NextResponse.redirect(
        new URL(
          "/login",
          req.url
        )
      );
    }
  }

  /* ADMIN */

  if (
    pathname.startsWith(
      "/admin"
    )
  ) {
    if (
      !isLoggedIn ||
      req.auth?.user
        ?.role !== "ADMIN"
    ) {
      return NextResponse.redirect(
        new URL("/", req.url)
      );
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/account/:path*",
    "/orders/:path*",
    "/admin/:path*",
  ],
};