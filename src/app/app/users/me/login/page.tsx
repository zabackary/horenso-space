import LoginAuthProvidersSettings from "@/components/auth/login-auth-providers-settings";
import { createClient } from "@/lib/supabase/server";
import { Box } from "@radix-ui/themes";

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
