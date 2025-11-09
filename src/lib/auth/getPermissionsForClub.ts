import { Database } from "@/@types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Get the permissions for the current user in a specific club.
 *
 * @param supabase The Supabase client to use making the request
 * @param clubId The ID of the club to query
 * @param signal An abort signal
 * @returns The permissions and associated role in club
 * @throws if the user is not logged in or can't access said club
 */
export default async function getPermissionsForClub(
  supabase: SupabaseClient<Database>,
  clubId: string,
  signal?: AbortSignal
): Promise<{
  permissions: string[];
  roleName: string;
  roleId: string;
}> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error("User not logged in");
  }

  const { data, error } = await supabase
    .from("club_members")
    .select("roles ( permissions, name, id )")
    .eq("club_id", clubId)
    .eq("user_id", user.id)
    .eq("accepted", true)
    .eq("roles.club_id", clubId)
    .abortSignal(signal ?? new AbortController().signal)
    .single();
  if (error) {
    throw error;
  }
  return {
    permissions: Object.entries(
      data.roles.permissions as Record<string, boolean>
    )
      .filter(([_role, hasRole]) => hasRole)
      .map(([role, _]) => role),
    roleName: data.roles.name,
    roleId: data.roles.id,
  };
}
