"use client";

import { createClient } from "@/lib/supabase/client";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import {
  Button,
  Callout,
  Dialog,
  DropdownMenu,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import styles from "./roles-manager.module.css";

const PERMISSION_KEYS = [
  "canWriteFiles",
  "canReadFiles",
  "canWriteOwnReport",
  "canReadAllReports",
  "canWriteReportReview",
  "canWriteCalendar",
  "canReadCalendar",
  "canManageClub",
];

type Role = {
  id: string;
  name: string;
  description?: string | null;
  permissions: Record<string, boolean>;
};

export default function RolesManager({ clubId }: { clubId: string }) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPermissions, setNewPermissions] = useState<Record<string, boolean>>(
    () => Object.fromEntries(PERMISSION_KEYS.map((k) => [k, false]))
  );

  useEffect(() => {
    loadRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clubId]);

  async function loadRoles() {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    try {
      const { data } = await supabase
        .from("roles")
        .select("id, name, description, permissions")
        .eq("club_id", clubId)
        .order("created_at", { ascending: true });
      setRoles(
        (data ?? []).map((r: any) => ({
          id: r.id,
          name: r.name,
          description: r.description,
          permissions: r.permissions,
        }))
      );
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  async function saveRole(role: Role) {
    setError(null);
    const supabase = createClient();
    try {
      await supabase
        .from("roles")
        .update({
          name: role.name,
          description: role.description,
          permissions: role.permissions,
        })
        .eq("id", role.id)
        .throwOnError();
      await loadRoles();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  async function deleteRole(roleId: string) {
    if (!confirm("Delete this role? This cannot be undone.")) return;
    setError(null);
    const supabase = createClient();
    try {
      await supabase.from("roles").delete().eq("id", roleId).throwOnError();
      await loadRoles();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  async function createRole() {
    if (!newName.trim()) return setError("Role name required");
    setError(null);
    const supabase = createClient();
    try {
      await supabase
        .from("roles")
        .insert({
          club_id: clubId,
          name: newName.trim(),
          description: newDescription,
          permissions: newPermissions,
        })
        .throwOnError();
      setNewName("");
      setNewDescription("");
      setNewPermissions(
        Object.fromEntries(PERMISSION_KEYS.map((k) => [k, false]))
      );
      await loadRoles();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  function togglePermissionForRole(roleId: string, key: string) {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === roleId
          ? {
              ...r,
              permissions: { ...r.permissions, [key]: !r.permissions[key] },
            }
          : r
      )
    );
  }

  return (
    <Flex direction="column" className={styles.root}>
      <Heading size="5">Roles</Heading>

      {error && (
        <Callout.Root color="red">
          <Callout.Icon>
            <CrossCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <Flex direction="column" gap="3">
        {loading ? (
          <Text>Loading roles…</Text>
        ) : (
          roles.map((role) => (
            <Flex key={role.id} direction="column" className={styles.roleCard}>
              <Flex align="center" gap="2">
                <TextField.Root
                  value={role.name}
                  onChange={(e) =>
                    setRoles((prev) =>
                      prev.map((p) =>
                        p.id === role.id ? { ...p, name: e.target.value } : p
                      )
                    )
                  }
                />
                <Button onClick={() => saveRole(role)}>Save</Button>
                <Button color="red" onClick={() => deleteRole(role.id)}>
                  Delete
                </Button>
              </Flex>

              <Flex direction="column" className={styles.descriptionField}>
                <TextField.Root
                  value={role.description ?? ""}
                  onChange={(e) =>
                    setRoles((prev) =>
                      prev.map((p) =>
                        p.id === role.id
                          ? { ...p, description: e.target.value }
                          : p
                      )
                    )
                  }
                />
              </Flex>

              <Flex direction="column" className={styles.permissions}>
                <Text size="2">Permissions</Text>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="soft">
                      Permissions <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    {PERMISSION_KEYS.map((k) => (
                      <DropdownMenu.CheckboxItem
                        key={k}
                        checked={Boolean(role.permissions[k])}
                        onCheckedChange={() =>
                          togglePermissionForRole(role.id, k)
                        }
                      >
                        {k}
                      </DropdownMenu.CheckboxItem>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>
            </Flex>
          ))
        )}
      </Flex>

      <Flex direction="column" className={styles.createSection} gap="2">
        <Dialog.Root>
          <Dialog.Trigger>
            <Button>Create role</Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Heading size="6">Create new role</Heading>
            <Flex direction="column" gap="2" style={{ marginTop: 8 }}>
              <TextField.Root
                placeholder="Role name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <TextField.Root
                placeholder="Description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />

              <Text size="2">Permissions</Text>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button variant="soft">Choose permissions</Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  {PERMISSION_KEYS.map((k) => (
                    <DropdownMenu.CheckboxItem
                      key={k}
                      checked={Boolean(newPermissions[k])}
                      onCheckedChange={(v) =>
                        setNewPermissions((p) => ({ ...p, [k]: Boolean(v) }))
                      }
                    >
                      {k}
                    </DropdownMenu.CheckboxItem>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Root>

              <Flex gap="2">
                <Button onClick={createRole}>Create</Button>
                <Dialog.Close>
                  <Button variant="soft">Cancel</Button>
                </Dialog.Close>
              </Flex>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      </Flex>
    </Flex>
  );
}
