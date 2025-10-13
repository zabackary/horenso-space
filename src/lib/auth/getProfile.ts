import { Database } from "@/@types/database.types";
import { SupabaseClient, User } from "@supabase/supabase-js";

export interface Profile {
  user: User;
  avatar_url: string | null;
  bio: string | null;
  created_at: string | null;
  full_name: string;
  id: string | null;
  nickname: string | null;
  notifications_enabled: boolean | null;
  school: string | null;
}

export default async function getProfile(
  supabase: SupabaseClient<Database>
): Promise<Profile | null> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  if (error) {
    throw error;
  }
  return {
    user,
    ...data,
    full_name: data?.full_name || "", // to satisfy the non-null constraint (it should be non-null in practice, since it is only null for other users)
  };
}
