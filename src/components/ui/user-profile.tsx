import { createClient } from "@/lib/supabase/server";
import { Avatar, Flex, Heading, Text } from "@radix-ui/themes";
import styles from "./user-profile.module.css";

export interface UserProfileProps {
  id: string;
  className?: string;
}

export default async function UserProfile({ id, className }: UserProfileProps) {
  const supabase = await createClient();

  // The public "profiles" view proxies public fields and resolves avatar_url
  const { data: profile, error } = await supabase
    .from("profiles")
    .select(`id, full_name, nickname, avatar_url, bio, school, created_at`)
    .eq("id", id)
    .maybeSingle();

  if (!profile || error) {
    return (
      <Flex gap="4" align="center">
        <Avatar fallback=" " size="7" className={styles.avatar} />
        <Flex direction="column" gap="1">
          <Heading as="h2" size="6">
            Unknown user
          </Heading>
        </Flex>
      </Flex>
    );
  }

  const { avatar_url, full_name, nickname, bio, school, created_at } = profile;

  return (
    <Flex gap="4" align="center" className={className}>
      <Avatar
        src={avatar_url ?? undefined}
        alt={full_name ?? nickname ?? "Avatar"}
        fallback={(full_name ?? nickname ?? "?").charAt(0)}
        size="7"
        className={styles.avatar}
      />
      <Flex direction="column" gap="1">
        <Heading as="h2" size="6">
          {full_name ?? "Unknown"}
          {nickname ? <>({nickname})</> : null}
        </Heading>
        {school ? (
          <Heading size="3" color="gray">
            {school}
          </Heading>
        ) : null}
        {created_at ? (
          <Heading size="3" color="gray">
            Joined {new Date(created_at).toLocaleDateString()}
          </Heading>
        ) : null}
        {bio ? <Text size="3">{bio}</Text> : null}
      </Flex>
    </Flex>
  );
}
