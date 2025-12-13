import ClubCard from "@/components/ui/club-card";
import UserProfile from "@/components/ui/user-profile";
import getProfile from "@/lib/auth/getProfile";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { Trans } from "@lingui/react/macro";
import { Flex, Heading } from "@radix-ui/themes";
import { redirect } from "next/navigation";

export default async function UserPage({
  params,
}: PageProps<"/app/users/[id]">) {
  const { id } = await params;
  await initLingui();

  const supabase = await createClient();
  const ownProfile = await getProfile(supabase);

  if (ownProfile?.id === id) {
    redirect("/app/users/me");
  }

  const { data: mutualClubs } = await supabase
    .from("club_members")
    .select("joined_clubs(*)")
    .eq("user_id", id);

  return (
    <Flex p="4" direction="column" gap="2">
      <UserProfile id={id} />
      {mutualClubs && mutualClubs.length > 0 && (
        <Flex direction="column" gap="1">
          <Heading>
            <Trans id="user.commonClubs">Common Clubs</Trans>
          </Heading>
          <Flex gap="2" wrap="wrap">
            <ClubCard club={mutualClubs[0].joined_clubs} />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}
