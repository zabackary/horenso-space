import ProfileEditor from "@/components/profile-editor";
import getProfile from "@/lib/auth/getProfile";
import { createClient } from "@/lib/supabase/server";
import { Box } from "@radix-ui/themes";
import { useId } from "react";
import { MeTabNav } from "../layout";

export default async function ProfileSettingsPage() {
  const a11yId = useId();

  const supabase = await createClient();
  const profile = (await getProfile(supabase))!; // we know the user is logged in

  return (
    <>
      <MeTabNav active="profile" />
      <Box p="4">
        <ProfileEditor />
      </Box>
    </>
  );
}
