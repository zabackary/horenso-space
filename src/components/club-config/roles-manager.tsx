"use client";

import type { Database } from "@/@types/database.types";
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
import { use, useState } from "react";
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

export default function RolesManager({
  clubId,
  rolesPromise,
}: {
  clubId: string;
  rolesPromise: Promise<Database["public"]["Tables"]["roles"]["Row"][]>;
}) {
  type RoleRow = Database["public"]["Tables"]["roles"]["Row"];

  const initial = (use(rolesPromise) ?? []) as RoleRow[];
  const [roles, setRoles] = useState<Role[]>(
    () =>
      initial.map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        permissions: normalizePermissions(r.permissions),
      })) ?? []
  );
  const [error, setError] = useState<string | null>(null);

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPermissions, setNewPermissions] = useState<Record<string, boolean>>(
    () => Object.fromEntries(PERMISSION_KEYS.map((k) => [k, false]))
  );

  function normalizePermissions(
    p: Database["public"]["Tables"]["roles"]["Row"]["permissions"]
  ): Record<string, boolean> {
    if (!p || typeof p !== "object" || Array.isArray(p)) return {};
    const entries = Object.entries(
      p as Record<
        string,
        Database["public"]["Tables"]["roles"]["Row"]["permissions"]
      >
    );
    const out: Record<string, boolean> = {};
    entries.forEach(([k, v]) => {
      out[k] = Boolean(v);
    });
    return out;
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
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  async function createRole() {
    if (!newName.trim()) return setError("Role name required");
    setError(null);
    const supabase = createClient();
    try {
      const { data } = await supabase
        .from("roles")
        .insert({
          club_id: clubId,
          name: newName.trim(),
          description: newDescription,
          permissions: normalizePermissions(newPermissions),
        })
        .throwOnError()
        .select()
        .single();
      if (data) {
        setRoles((prev) => [
          ...prev,
          {
            id: data.id,
            name: data.name,
            description: data.description,
            permissions: normalizePermissions(data.permissions),
          },
        ]);
      }
      setNewName("");
      setNewDescription("");
      setNewPermissions(
        Object.fromEntries(PERMISSION_KEYS.map((k) => [k, false]))
      );
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
      <Heading size="5" as="h3">
        Roles
      </Heading>

      {error && (
        <Callout.Root color="red">
          <Callout.Icon>
            <CrossCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <Flex direction="column" gap="3">
        {roles.length === 0 ? (
          <Text>No roles created yet.</Text>
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
                    <Button variant="soft">Permissions</Button>
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
            <Flex direction="column" gap="2" className={styles.dialogBody}>
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
