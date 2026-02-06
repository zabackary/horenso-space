import type { Database } from "@/@types/database.types";
import type { SupabaseClient, User } from "@supabase/supabase-js";

export interface Profile {
  user: User;
  avatar_url: string | null;
  bio: string | null;
  created_at: string | null;
  full_name: string;
  id: string;
  nickname: string | null;
  school: string | null;
}

export default async function getProfile(
  supabase: SupabaseClient<Database>,
  signal?: AbortSignal,
): Promise<Profile | null> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return null;
  }

  const { data, error } = await supabase
    .rpc("profiles_get", { p_user_id: user.id })
    .abortSignal(signal ?? new AbortController().signal);
  if (error) {
    throw error;
  }
  return data as Profile; // cast to Profile type
}
