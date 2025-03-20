import { NextRequest, NextResponse } from "next/server";
import { getUrl } from "./lib/get-url";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(
    process.env.SESSION_COOKIE_NAME || "authenticationjs.session-token"
  );
  const pathname = request.nextUrl.pathname;

  if (pathname === "/login" && token) {
    const redirectUrl = getUrl("/app/admin/dashboard");
    console.log(`Redirecionando para: ${redirectUrl}`);
    return NextResponse.redirect(new URL(getUrl("/app/admin/dashboard")));
  }

  if (pathname.includes("/app/admin/dashboard") && !token) {
    const redirectUrl = getUrl("/login");
    console.log(`Redirecionando para: ${redirectUrl}`);
    return NextResponse.redirect(new URL(getUrl("/login")));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};