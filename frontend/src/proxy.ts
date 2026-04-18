import createIntlMiddleware from "next-intl/middleware"
import { routing } from './i18n/routing';
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import {
  AUTH_ROUTES,
  REDIRECT_AFTER_LOGIN,
  DEFAULT_LOGIN_ROUTE,
  VERIFY_EMAIL_ROUTE,
  AUTH_PREFIX,
  PRIVATE_ROUTE_PREFIXES,
} from "@/lib/auth/routes";

import { AppJWT } from "./lib/schemas/auth";
import { isInstructorRoute } from "./lib/utils/utils";


const intlMiddleware = createIntlMiddleware(routing)

async function authMiddleware(request: NextRequest) {

  const { nextUrl } = request;
  const pathname = nextUrl.pathname.replace(/^\/(en|ar)(?=\/|$)/, '');

  const session = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  }) as AppJWT | null;

  const isAuthenticated = !!session?.access_token;
  const isEmailVerified = !!session?.user?.email_verified;

  const isPrivateRoute = PRIVATE_ROUTE_PREFIXES.some((prefix) =>
    pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  const isPublicRoute = !isPrivateRoute

  const isAuthRoute = pathname.includes(AUTH_PREFIX);
  const isEmailVerifyRoute = pathname === VERIFY_EMAIL_ROUTE;
  const isInstructor = session?.user?.active_role === "Teacher";

  //   Redirect if it's an authentication url used by nextAuth 
  if (isAuthenticated && !isEmailVerified && !isPublicRoute && !isEmailVerifyRoute) {
    return NextResponse.redirect(new URL(VERIFY_EMAIL_ROUTE, nextUrl));
  }

  if (isAuthRoute && isAuthenticated && !isEmailVerifyRoute) {
    return NextResponse.redirect(new URL(REDIRECT_AFTER_LOGIN, nextUrl));
  }

  if (!isAuthenticated && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_ROUTE, nextUrl));
  }

  if (!isInstructor && isInstructorRoute(pathname)) {
    return NextResponse.redirect(new URL('/', nextUrl));
  }


  return intlMiddleware(request);
}

const middleware = async (request: NextRequest) => {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname.replace(/^\/(en|ar)(?=\/|$)/, '');

  const isPrivateRoute = PRIVATE_ROUTE_PREFIXES.some((prefix) =>
    pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
  const isPublicRoute = !isPrivateRoute

  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  const session = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  }) as AppJWT | null;

  // Token & Refresh are expired 
  const RefreshTokenExpired = session?.error === "RefreshTokenExpired"

  if (RefreshTokenExpired) {
    const response = (isPrivateRoute || isAuthRoute)? intlMiddleware(request) : NextResponse.redirect(new URL(DEFAULT_LOGIN_ROUTE, nextUrl));
    response.cookies.set("authjs.csrf-token", "", { maxAge: 0 });
    response.cookies.set("authjs.session-token", "", { maxAge: 0 });
    return response;
  }

  if (isAuthRoute) {
    return (authMiddleware as any)(request)
  }

  if (isPublicRoute) {
    return intlMiddleware(request)
  } else {
    return (authMiddleware as any)(request)
  }
}


export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};

export default middleware