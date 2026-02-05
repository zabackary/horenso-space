import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Do not run code between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getClaims() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  // Update the user's metadata in the DB if it is not populated and the relevant
  // claims are populated.
  // We only do this if the issued at timestamp is within the last 10 seconds
  // to avoid updating metadata on every request.
  if (user) {
    const issuedAt = data?.claims?.iat;
    const now = Math.floor(Date.now() / 1000);
    const isNewLogin = issuedAt && now - issuedAt < 10;

    if (isNewLogin) {
      // First, check if metadata fields are missing
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", user.sub)
        .single();

      if (profileError) {
        console.error(
          "Error fetching profile for metadata update:",
          profileError,
        );
      } else {
        const updates: { full_name?: string; avatar_url?: string } = {};
        if (!profileData?.full_name && data?.claims?.name) {
          updates.full_name = data.claims.name;
        }
        if (!profileData?.avatar_url && data?.claims?.picture) {
          updates.avatar_url = data.claims.picture;
        }

        if (Object.keys(updates).length > 0) {
          const { error: updateError } = await supabase
            .from("profiles")
            .update(updates)
            .eq("id", user.sub);
          if (updateError) {
            console.error("Error updating profile metadata:", updateError);
          }
        }
      }
    }
  }

  // Redirect to login if user is not authenticated and trying to access a private path
  const pathname = request.nextUrl.pathname;
  const isPrivatePath = pathname.startsWith("/app");

  if (!user && isPrivatePath) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
