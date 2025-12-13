import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest } from "next/server";
import { i18nMiddleware } from "./lib/i18n/middleware";

export async function middleware(request: NextRequest) {
  // First, handle i18n
  const i18nResponse = i18nMiddleware(request);
  if (i18nResponse) {
    return i18nResponse;
  }

  // Then, update session
  const sessionResponse = await updateSession(request);
  return sessionResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.well-known|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
