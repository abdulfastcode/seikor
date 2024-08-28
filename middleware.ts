import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define an array of protected routes
const protectedRoutes = ["/user-info"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Check if the current path is in the protectedRoutes array
  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!token) {
      // If token is not present, redirect to login
      console.log("No token, redirecting to login");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // Prevent redirection to auth routes if token is available
  if (token && request.nextUrl.pathname.includes("auth")) {
    console.log("Token present, redirecting away from auth route");
    return NextResponse.redirect(new URL("/user-info", request.url));
  }

  // For all other routes, continue as normal
  return NextResponse.next();
}

// Update the config to match all protected routes
export const config = {
  matcher: protectedRoutes,
};
