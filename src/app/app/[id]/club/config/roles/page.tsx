import RolesManager from "@/components/club-config/roles-manager";
import { createClient } from "@/lib/supabase/server";
import { Box, Spinner } from "@radix-ui/themes";
import React from "react";
import { ClubConfigTabNav } from "../layout";

import type { Database } from "@/@types/database.types";

type RoleRow = Database["public"]["Tables"]["roles"]["Row"];

export default async function ClubRolesPage({
  params,
}: PageProps<"/app/[id]/club/config/roles">) {
  // permission check handled in layout
  const { id } = await params;
  const supabase = await createClient();

  const rolesRes = await supabase
    .from("roles")
    .select("id, name, description, permissions")
    .eq("club_id", id)
    .order("created_at", { ascending: true });
  const roles: RoleRow[] = (rolesRes.data ?? []) as RoleRow[];

  const rolesPromise = Promise.resolve(roles);

  return (
    <>
      <ClubConfigTabNav active="roles" clubId={id} />
      <Box p="4">
        <React.Suspense fallback={<Spinner />}>
          <RolesManager clubId={id} rolesPromise={rolesPromise} />
        </React.Suspense>
      </Box>
    </>
  );
}
