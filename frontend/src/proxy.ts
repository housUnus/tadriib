import createIntlMiddleware from "next-intl/middleware"
import {routing} from './i18n/routing';
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server";
import { getToken, encode, JWT} from "next-auth/jwt";
import {
  PUBLIC_ROUTES,
  AUTH_ROUTES,
  REDIRECT_AFTER_LOGIN,
  DEFAULT_LOGIN_ROUTE
} from "@/lib/auth/routes";

import { refreshAccessToken } from "@/lib/auth/authentication";

interface AppJWT extends JWT {
  access_token?: string
  expiry?: {
    access: number
    refresh: number
  }
}

const intlMiddleware = createIntlMiddleware(routing)

async function authMiddleware (request: NextRequest) {

  const { nextUrl } = request;
  const pathname = nextUrl.pathname.replace(/^\/(en|ar)(?=\/|$)/, '');
  
  const session = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  }) as AppJWT | null;

  const isAuthenticated = !!session?.access_token;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  let Response = null

  // Token & Refresh are expired 
  if (!isPublicRoute && (session?.expiry?.access && Date.now() >= session.expiry.access)) {
    const TokenIsExpired = isAuthenticated && Date.now() >= session.expiry.access
    const RefreshIsExpired = isAuthenticated && Date.now() >= session.expiry.refresh && Date.now() >= session.expiry.access
    
    if (RefreshIsExpired && TokenIsExpired && isAuthRoute) {
      return intlMiddleware(request)
    }

    if (RefreshIsExpired) { 
      // Create a response and the session cookies
      const response = NextResponse.redirect(new URL(DEFAULT_LOGIN_ROUTE, nextUrl));
      response.cookies.set("authjs.csrf-token", "", { maxAge: 0 });
      response.cookies.set("authjs.session-token", "", { maxAge: 0 });
      return response;
    }

    if (TokenIsExpired) { 
      const secret = process.env.AUTH_SECRET
      if (!secret) {
        throw new Error("AUTH_SECRET is not defined")
      }
      // Create a response and the session cookies
      const new_token = await refreshAccessToken(session);
      const encoded_token = await encode({token:new_token, secret: secret, salt: "authjs.session-token",});
      const response = intlMiddleware(request)
      response.cookies.set("authjs.session-token", encoded_token);
      return response;
    }
  }

  //   Redirect if it's an authentication url used by nextAuth 
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL(REDIRECT_AFTER_LOGIN, nextUrl));
  }

  if(!isAuthenticated && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_ROUTE, nextUrl));
  }

  return intlMiddleware(request);
}

const middleware = (request: NextRequest) => {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname.replace(/^\/(en|ar)(?=\/|$)/, '');

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

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