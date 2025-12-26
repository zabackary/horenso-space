import { Box } from "@radix-ui/themes";
import ProfileEditor from "@/components/profile-editor";
import getProfile from "@/lib/auth/getProfile";
import { createClient } from "@/lib/supabase/server";

export default async function ProfileSettingsPage() {
  const supabase = await createClient();
  const profile = getProfile(supabase).then((data) => data!); // we know the user is logged in

  return (
    <Box p="4">
      <ProfileEditor profilePromise={profile} />
    </Box>
  );
}
