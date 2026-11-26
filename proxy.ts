import { auth } from "./auth";

export const proxy = auth((request) => {
  if (!request.auth?.user) {
    const loginUrl = new URL("/login", request.nextUrl.origin);
    loginUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.pathname + request.nextUrl.search,
    );
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/meetings/new/:path*", "/meetings/:id/edit/:path*"],
};
