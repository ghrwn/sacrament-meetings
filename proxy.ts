// Next.js 16 uses proxy.ts in place of the deprecated middleware.ts convention.
export { auth as proxy } from "./auth";

export const config = {
  matcher: ["/meetings/new/:path*", "/meetings/:id/edit/:path*"],
};
