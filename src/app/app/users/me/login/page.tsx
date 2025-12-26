import { Box } from "@radix-ui/themes";
import LoginAuthProvidersSettings from "@/components/login-auth-providers-settings";
import { createClient } from "@/lib/supabase/server";

export default async function LoginSettingsPage() {
  const supabase = await createClient();
  const identitiesPromise = supabase.auth
    .getUserIdentities()
    .then(({ data, error }) => {
      if (error) {
        throw error;
      }
      return data.identities;
    });

  return (
    <Box p="4">
      <LoginAuthProvidersSettings identitiesPromise={identitiesPromise} />
    </Box>
  );
}
