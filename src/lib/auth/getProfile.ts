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
    .from("profiles")
    .select("id, avatar_url, bio, created_at, full_name, nickname, school")
    .abortSignal(signal ?? new AbortController().signal)
    .eq("id", user.id)
    .single();
  if (error) {
    throw error;
  }
  return {
    user,
    avatar_url: data.avatar_url,
    bio: data.bio,
    created_at: data.created_at,
    full_name: data.full_name,
    id: data.id,
    nickname: data.nickname,
    school: data.school,
  };
}
