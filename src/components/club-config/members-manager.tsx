"use client";

import { createClient } from "@/lib/supabase/client";
import { Select, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import styles from "./members-manager.module.css";

type Member = {
  user_id: string;
  role_id: string;
};

type Role = { id: string; name: string };

export default function MembersManager({ clubId }: { clubId: string }) {
  const [members, setMembers] = useState<Member[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clubId]);

  async function load() {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    try {
      const [{ data: membersData }, { data: rolesData }] = await Promise.all([
        supabase
          .from("club_members")
          .select("user_id, role_id, public:profiles(display_name, email)")
          .eq("club_id", clubId),
        supabase.from("roles").select("id, name").eq("club_id", clubId),
      ]);

      setMembers(
        (membersData ?? []).map((m) => ({
          user_id: m.user_id,
          role_id: m.role_id,
        }))
      );
      setRoles((rolesData ?? []).map((r) => ({ id: r.id, name: r.name })));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  async function changeRole(memberId: string, newRoleId: string) {
    setError(null);
    const supabase = createClient();
    try {
      await supabase
        .from("club_members")
        .update({ role_id: newRoleId })
        .eq("user_id", memberId)
        .throwOnError();
      setMembers((prev) =>
        prev.map((m) =>
          m.user_id === memberId ? { ...m, role_id: newRoleId } : m
        )
      );
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <div className={styles.root}>
      <Text size="5">Members</Text>
      {error && <Text color="red">{error}</Text>}
      {loading ? (
        <Text>Loading…</Text>
      ) : members.length === 0 ? (
        <div className={styles.empty}>No members found.</div>
      ) : (
        <div>
          {members.map((m) => (
            <div key={m.user_id} className={styles.memberRow}>
              {/* <div className={styles.memberInfo}>
                <Text>
                  {m.profile?.display_name ?? m.profile?.email ?? m.user_id}
                </Text>
              </div> */}
              <div className={styles.controls}>
                <Select.Root
                  value={m.role_id}
                  onValueChange={(val) => changeRole(m.user_id, val)}
                >
                  <Select.Trigger content="Select role" value={m.role_id} />
                  <Select.Content>
                    {roles.map((r) => (
                      <Select.Item key={r.id} value={r.id}>
                        <Text>{r.name}</Text>
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
