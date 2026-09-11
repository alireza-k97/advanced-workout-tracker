import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

async function verifyToken(token) {
  try {
    await jwtVerify(token, encodedKey);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;

  const isAuthenticated = token ? await verifyToken(token) : false;

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/workouts/:path*", "/progress/:path*"],
};
