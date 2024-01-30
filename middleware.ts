import authConfig from './auth.config';
import NextAuth from 'next-auth';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // Use the route and auth status to decide which is public or private route here
  // Entire app is protected by default
  const isLoggedIn = !!req.auth;
  console.log('Route:', req.nextUrl.pathname);
  console.log('Is authenticated:', isLoggedIn);
});

// Optionally, don't invoke Middleware on some paths
// Everything match the regex will be invoke in the auth() middleware above
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
