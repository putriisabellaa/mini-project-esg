import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const langCookie = request.cookies.get("NEXT_LOCALE")?.value || "en-US"; // Default ke English

  // Jika URL tidak diawali dengan prefix bahasa yang benar, lakukan redirect
  const validLanguages = ["en-US", "id-ID", "ch-CH"];
  const currentLang = pathname.split("/")[1]; // Ambil prefix bahasa dari URL
  if (!validLanguages.includes(currentLang)) {
    return NextResponse.redirect(new URL(`/${langCookie}${pathname}`, request.url));
  }

  // Redirect jika tidak memiliki token dan mencoba akses dashboard
  const loginPage = `/${currentLang}`; // Halaman login sesuai bahasa
  const dashboardPage = `/${currentLang}/dashboard`; // Dashboard sesuai bahasa

  if (!token && pathname.startsWith(`/${currentLang}/dashboard`)) {
    return NextResponse.redirect(new URL(loginPage, request.url));
  }

  // Redirect ke dashboard jika sudah login dan berada di halaman login
  if (token && pathname === `/${currentLang}`) {
    return NextResponse.redirect(new URL(dashboardPage, request.url));
  }

  // Jalankan middleware internasionalisasi terakhir agar tidak mengganggu redirect
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(en-US|id-ID|ch-CH)/:path*"], 
};
