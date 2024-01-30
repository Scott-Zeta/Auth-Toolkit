import authConfig from './auth.config';
import NextAuth from 'next-auth';
import {
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  apiAuthPrefix,
  authRoutes,
} from './routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // Use the route and auth status to decide which is public or private route here
  // Entire app is protected by default
  const isLoggedIn = !!req.auth;
  console.log('Route:', req.nextUrl.pathname);
  console.log('Is authenticated:', isLoggedIn);

  const { nextUrl } = req;
  const isAuthApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAuthApiRoute) {
    //always allow auth api routes
    return null;
  }

  if (isAuthRoute) {
    // allow auth routes if not logged in
    // if already logged in, redirect to dashboard
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    // redirect any non-public routes without logged in
    return Response.redirect(new URL('/auth/login', nextUrl));
  }

  // allow public routes by default
  return null;
});

// Optionally, don't invoke Middleware on some paths
// Everything match the regex will be invoke in the auth() middleware above
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
