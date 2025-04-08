import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname == "/login" ||
    request.nextUrl.pathname == "/register" ||
    request.nextUrl.pathname == "/api/user" ||
    request.nextUrl.pathname == "/api/user/login"
  ) {
    return NextResponse.next();
  }
  const token = request.cookies.get("token")?.value;
  if (!process.env.JWT_SECRET) {
    return new Response("JWT_SECRET is absent", {
      status: 500,
    });
  }
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const payload = await jwtVerify(token, secret);
    console.log(payload);
    if (!payload) {
      // scenario, when token is expired or invalid
      throw new Error("No token");
    }
    const userId = payload.payload.id as string;
    console.log(request.nextUrl.pathname);
    // if (request.nextUrl.pathname == "/admin/dashboard") {
    //   await dbConnect();
    //   const existingUser = await userModel.findById(userId);
    //   console.log({ existingUser });
    //   if (!existingUser.isAdmin) {
    //     return NextResponse.redirect(new URL("/login", request.url));
    //   }
    // }

    const response = NextResponse.next();
    response.headers.set("userId", userId);
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
