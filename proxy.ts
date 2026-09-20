import { NextResponse } from "next/server";

import { auth } from "@/auth";

const authenticatedRoutes = ["/account", "/orders", "/checkout", "/cart"];

export const proxy = auth((request) => {
  const pathname = request.nextUrl.pathname;
  const isLoggedIn = Boolean(request.auth?.user);
  const isAdmin = request.auth?.user?.role === "ADMIN";

  const needsAuth = authenticatedRoutes.some((route) => pathname.startsWith(route));

  if (needsAuth && !isLoggedIn) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isLoggedIn && (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register"))) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
