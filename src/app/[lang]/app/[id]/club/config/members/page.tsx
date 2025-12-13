import type { Database } from "@/@types/database.types";
import MembersManager from "@/components/club-config/members-manager";
import { createClient } from "@/lib/supabase/server";
import { Box, Spinner } from "@radix-ui/themes";
import React from "react";
import { ClubConfigTabNav } from "../layout";

type ClubMemberRow = Database["public"]["Tables"]["club_members"]["Row"];
type ProfileRow = Database["public"]["Views"]["profiles"]["Row"];
type RoleRow = Database["public"]["Tables"]["roles"]["Row"];

export default async function ClubMembersPage({
  params,
}: PageProps<"/[lang]/app/[id]/club/config/members">) {
  const { id } = await params;

  const supabase = await createClient();

  // Fetch club members (no profile join)
  const membersRes = await supabase
    .from("club_members")
    .select("*")
    .eq("club_id", id);
  const members: ClubMemberRow[] = membersRes.error
    ? []
    : membersRes.data ?? [];

  // Fetch profiles separately since the join doesnt work reliably
  const userIds = Array.from(new Set(members.map((m) => m.user_id)));
  const profiles: ProfileRow[] = userIds.length
    ? (
        await supabase
          .from("profiles")
          .select(
            "id, full_name, nickname, avatar_url, bio, created_at, school"
          )
          .in("id", userIds)
      ).data ?? []
    : [];

  const membersWithProfiles = members.map((m) => ({
    ...m,
    profile: profiles.find((p) => p.id === m.user_id) ?? null,
  }));

  const membersPromise = Promise.resolve(membersWithProfiles);
  const rolesPromise =
    (await supabase.from("roles").select("id, name").eq("club_id", id)).data ??
    ([] as RoleRow[]);

  return (
    <>
      <ClubConfigTabNav active="members" clubId={id} />
      <Box p="4">
        <React.Suspense fallback={<Spinner />}>
          <MembersManager
            membersPromise={membersPromise}
            rolesPromise={Promise.resolve(rolesPromise)}
            clubId={id}
          />
        </React.Suspense>
      </Box>
    </>
  );
}
