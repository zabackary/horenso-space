"use client";

import type { Database } from "@/@types/database.types";
import { useDebounceCallback } from "@/lib/debounce";
import { createClient } from "@/lib/supabase/client";
import { CrossCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import {
  Button,
  Callout,
  Card,
  CheckboxCards,
  Dialog,
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

  const [createRoleDialogOpen, setCreateRoleDialogOpen] = useState(false);
  const [permissionDialogRoleId, setPermissionDialogRoleId] = useState<
    string | null
  >(null);

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
  async function saveRole(roleId: string) {
    const role = roles.find((r) => r.id === roleId);
    if (!role) return;
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

  const saveRoleDebounced = useDebounceCallback(saveRole, 1000);

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
    } finally {
      setCreateRoleDialogOpen(false);
    }
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
            <Card key={role.id}>
              <Flex align="center" gap="2">
                <TextField.Root
                  value={role.name}
                  onChange={(e) => {
                    setRoles((prev) =>
                      prev.map((p) =>
                        p.id === role.id ? { ...p, name: e.target.value } : p
                      )
                    );
                    saveRoleDebounced(role.id);
                  }}
                />
                <Button
                  variant="outline"
                  onClick={() => setPermissionDialogRoleId(role.id)}
                >
                  Edit permissions
                </Button>
                <Button variant="soft" onClick={() => deleteRole(role.id)}>
                  <TrashIcon />
                  Delete
                </Button>
              </Flex>

              <Flex direction="column" className={styles.descriptionField}>
                <TextField.Root
                  value={role.description ?? ""}
                  placeholder="Description"
                  onChange={(e) => {
                    setRoles((prev) =>
                      prev.map((p) =>
                        p.id === role.id
                          ? { ...p, description: e.target.value }
                          : p
                      )
                    );
                    saveRoleDebounced(role.id);
                  }}
                />
              </Flex>
            </Card>
          ))
        )}
      </Flex>

      <Flex
        direction="row"
        className={styles.createSection}
        gap="2"
        align="center"
      >
        <Dialog.Root
          open={createRoleDialogOpen}
          onOpenChange={setCreateRoleDialogOpen}
        >
          <Dialog.Trigger>
            <Button>Create role</Button>
          </Dialog.Trigger>
          <Dialog.Content asChild>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createRole();
              }}
            >
              <Dialog.Title>Create new role</Dialog.Title>
              <Dialog.Description>
                Fill in the details for the new role.
              </Dialog.Description>
              <Flex direction="column" gap="2" className={styles.dialogBody}>
                <TextField.Root
                  placeholder="Role name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                />
                <TextField.Root
                  placeholder="Description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  required
                />

                <Text size="2">Permissions</Text>
                <CheckboxCards.Root
                  value={Object.entries(newPermissions)
                    .filter(([_, v]) => v)
                    .map(([k, _]) => k)}
                  onValueChange={(values) => {
                    const newPerms: Record<string, boolean> = {};
                    PERMISSION_KEYS.forEach((k) => {
                      newPerms[k] = values.includes(k);
                    });
                    setNewPermissions(newPerms);
                  }}
                >
                  {PERMISSION_KEYS.map((k) => (
                    <CheckboxCards.Item key={k} value={k}>
                      {k}
                    </CheckboxCards.Item>
                  ))}
                </CheckboxCards.Root>

                <Flex gap="2">
                  <Button type="submit">Create</Button>
                  <Button
                    variant="soft"
                    type="button"
                    onClick={() => setCreateRoleDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </Flex>
              </Flex>
            </form>
          </Dialog.Content>
        </Dialog.Root>
      </Flex>

      <Dialog.Root
        open={permissionDialogRoleId !== null}
        onOpenChange={(open) => {
          if (!open) setPermissionDialogRoleId(null);
        }}
      >
        <Dialog.Content>
          <Dialog.Title>Edit Permissions</Dialog.Title>
          <Dialog.Description>
            Toggle permissions for{" "}
            {roles.find((r) => r.id === permissionDialogRoleId)?.name}
          </Dialog.Description>
          <CheckboxCards.Root
            my="2"
            value={Object.entries(
              roles.find((r) => r.id === permissionDialogRoleId)?.permissions ??
                {}
            )
              .filter(([_, v]) => v)
              .map(([k, _]) => k)}
            onValueChange={(values) => {
              if (!permissionDialogRoleId) return;
              const newPerms: Record<string, boolean> = {};
              PERMISSION_KEYS.forEach((k) => {
                newPerms[k] = values.includes(k);
              });
              setRoles((prev) =>
                prev.map((r) =>
                  r.id === permissionDialogRoleId
                    ? { ...r, permissions: newPerms }
                    : r
                )
              );
            }}
          >
            {PERMISSION_KEYS.map((k) => (
              <CheckboxCards.Item key={k} value={k}>
                {k}
              </CheckboxCards.Item>
            ))}
          </CheckboxCards.Root>
          <Flex justify="end" gap="2" className={styles.dialogFooter}>
            <Button
              variant="soft"
              onClick={() => setPermissionDialogRoleId(null)}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                if (!permissionDialogRoleId) return;
                saveRole(permissionDialogRoleId);
                setPermissionDialogRoleId(null);
              }}
            >
              Save
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Flex>
  );
}
