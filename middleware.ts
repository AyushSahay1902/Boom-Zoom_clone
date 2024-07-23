// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// //Create Route Matcher allows tus to make routes that are not protected by Clerk private.

// const protectedRoutes = createRouteMatcher([
//     '/',
//     '/upcoming',
//     'recordings',
//     '/previous',
//     '/personal-room',
//     'meeting(.*)',
//   ]);

//   export default clerkMiddleware((auth: ClerkMiddlewareAuth, req: NextRequest) => {
//       if (protectedRoutes(req)) return auth().protect();

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protectedRoute = createRouteMatcher([
  "/",
  "/upcoming",
  "/meeting(.*)",
  "/previous",
  "/recordings",
  "/personal-room",
]);

export default clerkMiddleware((auth, req) => {
  if (protectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
