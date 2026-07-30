import type { SupabaseClient, User } from "@supabase/supabase-js";
import type { Database } from "@/@types/database.types";

/**
 * Get the current authenticated user in a Server Action, throwing if there
 * isn't one. Row Level Security remains the source of truth for
 * authorization; this only guards against acting as an anonymous user.
 */
export async function requireUser(
  supabase: SupabaseClient<Database>,
): Promise<User> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    throw new Error("User not authenticated");
  }
  return user;
}
