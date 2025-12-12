"use client";

import type { Database } from "@/@types/database.types";
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
  Select,
  Switch,
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
  absenceReportReviewerRole: string | null;
  absenceReportApprovalRequired: boolean;
};

export default function RolesManager({
  clubId,
  rolesPromise,
}: {
  clubId: string;
  rolesPromise: PromiseLike<
    Pick<
      Database["public"]["Tables"]["roles"]["Row"],
      | "id"
      | "name"
      | "description"
      | "permissions"
      | "absence_report_reviewer_role"
      | "absence_report_approval_required"
    >[]
  >;
}) {
  const initial = use(rolesPromise) ?? [];
  const [roles, setRoles] = useState<Role[]>(
    () =>
      initial.map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        permissions: normalizePermissions(r.permissions),
        absenceReportReviewerRole: r.absence_report_reviewer_role ?? null,
        absenceReportApprovalRequired: r.absence_report_approval_required,
      })) ?? []
  );
  const [error, setError] = useState<string | null>(null);

  const [editDialogRoleId, setEditDialogRoleId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPermissions, setEditPermissions] = useState<
    Record<string, boolean>
  >(() => Object.fromEntries(PERMISSION_KEYS.map((k) => [k, false])));
  const [editAbsenceReportReviewerRole, setEditAbsenceReportReviewerRole] =
    useState<string | null>(null);
  const [
    editAbsenceReportApprovalRequired,
    setEditAbsenceReportApprovalRequired,
  ] = useState(false);

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
          absence_report_approval_required: role.absenceReportApprovalRequired,
          absence_report_reviewer_role: role.absenceReportReviewerRole,
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
    if (!editName.trim()) return setError("Role name required");
    setError(null);
    const supabase = createClient();
    try {
      const { data } = await supabase
        .from("roles")
        .insert({
          club_id: clubId,
          name: editName.trim(),
          description: editDescription,
          permissions: editPermissions,
          absence_report_reviewer_role: editAbsenceReportReviewerRole,
          absence_report_approval_required: editAbsenceReportApprovalRequired,
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
            absenceReportReviewerRole:
              data.absence_report_reviewer_role ?? null,
            absenceReportApprovalRequired:
              data.absence_report_approval_required,
          },
        ]);
      }
      resetEditDialog();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  function resetEditDialog() {
    setEditDialogRoleId(null);
    setEditName("");
    setEditDescription("");
    setEditPermissions(
      Object.fromEntries(PERMISSION_KEYS.map((k) => [k, false]))
    );
    setEditAbsenceReportReviewerRole(null);
    setEditAbsenceReportApprovalRequired(false);
  }

  function openEditDialog(roleId: string) {
    const role = roles.find((r) => r.id === roleId);
    if (!role) return;
    setEditDialogRoleId(roleId);
    setEditName(role.name);
    setEditDescription(role.description ?? "");
    setEditPermissions(role.permissions);
    setEditAbsenceReportReviewerRole(role.absenceReportReviewerRole);
    setEditAbsenceReportApprovalRequired(role.absenceReportApprovalRequired);
  }

  function openCreateDialog() {
    setEditDialogRoleId("new");
    setEditName("");
    setEditDescription("");
    setEditPermissions(
      Object.fromEntries(PERMISSION_KEYS.map((k) => [k, false]))
    );
    setEditAbsenceReportReviewerRole(null);
    setEditAbsenceReportApprovalRequired(false);
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
                <Flex direction="column" style={{ flexGrow: 1 }}>
                  <Text weight="bold">{role.name}</Text>
                  {role.description && (
                    <Text color="gray" size="2">
                      {role.description}
                    </Text>
                  )}
                </Flex>
                <Button
                  variant="outline"
                  onClick={() => openEditDialog(role.id)}
                >
                  Edit
                </Button>
                <Button variant="soft" onClick={() => deleteRole(role.id)}>
                  <TrashIcon />
                  Delete
                </Button>
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
        <Button onClick={() => openCreateDialog()}>Create role</Button>
      </Flex>

      <Dialog.Root
        open={editDialogRoleId !== null}
        onOpenChange={(open) => {
          if (!open) resetEditDialog();
        }}
      >
        <Dialog.Content asChild>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (editDialogRoleId === "new") {
                createRole();
              } else if (editDialogRoleId) {
                saveRole(editDialogRoleId);
                resetEditDialog();
              }
            }}
          >
            <Dialog.Title>
              {editDialogRoleId === "new" ? "Create new role" : "Edit role"}
            </Dialog.Title>
            <Dialog.Description>
              {editDialogRoleId === "new"
                ? "Fill in the details for the new role."
                : `Edit details for ${editName}`}
            </Dialog.Description>
            <Flex direction="column" gap="2" className={styles.dialogBody}>
              <TextField.Root
                placeholder="Role name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
              />
              <TextField.Root
                placeholder="Description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />

              <Heading size="2">Permissions</Heading>
              <CheckboxCards.Root
                value={Object.entries(editPermissions)
                  .filter(([_, v]) => v)
                  .map(([k, _]) => k)}
                onValueChange={(values) => {
                  const newPerms: Record<string, boolean> = {};
                  PERMISSION_KEYS.forEach((k) => {
                    newPerms[k] = values.includes(k);
                  });
                  setEditPermissions(newPerms);
                }}
              >
                {PERMISSION_KEYS.map((k) => (
                  <CheckboxCards.Item key={k} value={k}>
                    {k}
                  </CheckboxCards.Item>
                ))}
              </CheckboxCards.Root>

              <Heading size="2">Absence reports</Heading>
              <Flex direction="column" gap="2">
                <Flex direction="row" align="center" gap="2">
                  <Text style={{ flexGrow: 1 }}>Reviewer role</Text>
                  <Select.Root
                    value={editAbsenceReportReviewerRole ?? "~"}
                    onValueChange={(value) =>
                      setEditAbsenceReportReviewerRole(
                        value === "~" ? null : value
                      )
                    }
                  >
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Item value="~">(None)</Select.Item>
                      {roles.map((r) => (
                        <Select.Item key={r.id} value={r.id}>
                          {r.name}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Flex>
                <Flex direction="row" align="center" gap="2">
                  <Text style={{ flexGrow: 1 }}>Approval required</Text>
                  <Switch
                    checked={editAbsenceReportApprovalRequired}
                    onCheckedChange={(checked) =>
                      setEditAbsenceReportApprovalRequired(Boolean(checked))
                    }
                  />
                </Flex>
              </Flex>

              <Flex gap="2">
                <Button type="submit">
                  {editDialogRoleId === "new" ? "Create" : "Save"}
                </Button>
                <Button
                  variant="soft"
                  type="button"
                  onClick={() => resetEditDialog()}
                >
                  Cancel
                </Button>
              </Flex>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </Flex>
  );
}
