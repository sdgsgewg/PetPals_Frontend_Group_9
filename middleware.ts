// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token");

  console.log(token);

  // Proteksi hanya untuk halaman /transactions dan turunannya
  if (pathname.startsWith("/my-pets") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (pathname.startsWith("/my-services") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (pathname.startsWith("/transactions") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (pathname.startsWith("/profile") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/my-pets/:path*",
    "/my-services/:path*",
    "/transactions/:path*",
    "/profile/:path*",
  ],
};
