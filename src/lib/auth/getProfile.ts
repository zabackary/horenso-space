import type { Database } from "@/@types/database.types";
import type { SupabaseClient, User } from "@supabase/supabase-js";

export interface Profile {
  user: User;
  avatarUrl: string | null;
  bio: string | null;
  createdAt: string | null;
  fullName: string;
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
    avatarUrl: data.avatar_url,
    bio: data.bio,
    createdAt: data.created_at,
    fullName: data.full_name,
    id: data.id,
    nickname: data.nickname,
    school: data.school,
  };
}
