import { createClient } from "@/lib/supabase/server";
import { Avatar, Flex, Heading } from "@radix-ui/themes";
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

  if (error) {
    // Fail quietly in the UI — render a minimal placeholder
    console.error("Failed to load profile", error);
    return (
      <div className={className}>
        <div className={styles.container}>
          <div className={styles.avatar} />
          <div className={styles.meta}>
            <div className={styles.name}>Unknown user</div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className={className}>
        <div className={styles.container}>
          <div className={styles.avatar} />
          <div className={styles.meta}>
            <div className={styles.name}>User not found</div>
          </div>
        </div>
      </div>
    );
  }

  const { avatar_url, full_name, nickname, bio, school, created_at } =
    profile as any;

  return (
    <div className={className}>
      <Flex gap="4" align="center">
        <Avatar
          src={avatar_url ?? undefined}
          alt={full_name ?? nickname ?? "Avatar"}
          fallback={(full_name ?? nickname ?? "?").charAt(0)}
          size="7"
          className={styles.avatar}
        />
        <div className={styles.meta}>
          <Heading as="h2" size="6">
            {full_name ?? nickname ?? "Unknown"}
            {nickname ? <>({nickname})</> : null}
          </Heading>
          {school ? <div className={styles.small}>{school}</div> : null}
          {created_at ? (
            <div className={styles.small}>
              Joined {new Date(created_at).toLocaleDateString()}
            </div>
          ) : null}
          {bio ? <div className={styles.bio}>{bio}</div> : null}
        </div>
      </Flex>
    </div>
  );
}
