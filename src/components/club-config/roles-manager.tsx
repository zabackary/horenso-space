"use client";

import type { Database } from "@/@types/database.types";
import { createClient } from "@/lib/supabase/client";
import { Trans, useLingui } from "@lingui/react/macro";
import {
  CrossCircledIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  Button,
  Callout,
  Card,
  CheckboxCards,
  Dialog,
  Flex,
  Heading,
  IconButton,
  Select,
  Switch,
  Text,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import Link from "next/link";
import { use, useState } from "react";
import { PERMISSION_KEYS, PermissionText } from "../permission-text";
import styles from "./roles-manager.module.css";

type Role = {
  id: string;
  name: string;
  description?: string | null;
  permissions: Record<string, boolean>;
  absenceReportReviewerRole: string | null;
  absenceReportApprovalRequired: boolean;
  absenceReportFormId: string | null;
};

export default function RolesManager({
  clubId,
  rolesPromise,
  formsPromise,
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
      | "absence_report_form"
    >[]
  >;
  formsPromise: PromiseLike<
    Pick<
      Database["public"]["Tables"]["absence_report_forms"]["Row"],
      "id" | "name"
    >[]
  >;
}) {
  const initial = use(rolesPromise) ?? [];
  const formsInitial = use(formsPromise) ?? [];
  const [roles, setRoles] = useState<Role[]>(
    () =>
      initial.map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        permissions: normalizePermissions(r.permissions),
        absenceReportReviewerRole: r.absence_report_reviewer_role ?? null,
        absenceReportApprovalRequired: r.absence_report_approval_required,
        absenceReportFormId: (r as any).absence_report_form ?? null,
      })) ?? []
  );
  const [error, setError] = useState<string | null>(null);
  const [forms] = useState<{ id: string; name: string }[]>(() =>
    (formsInitial ?? []).map((f) => ({ id: f.id, name: f.name }))
  );

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
  const [editAbsenceReportFormId, setEditAbsenceReportFormId] = useState<
    string | null
  >(null);

  const { t } = useLingui();

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
    if (editAbsenceReportFormId === null) {
      setError("Absence report template must be selected");
      return;
    }
    const supabase = createClient();
    try {
      await supabase
        .from("roles")
        .update({
          name: editName.trim(),
          description: editDescription,
          permissions: editPermissions,
          absence_report_reviewer_role: editAbsenceReportReviewerRole,
          absence_report_approval_required: editAbsenceReportApprovalRequired,
          absence_report_form: editAbsenceReportFormId,
        })
        .eq("id", role.id)
        .throwOnError();
      resetEditDialog();
    } catch (e: unknown) {
      console.error("Error saving role:", e);
      setError(t`Failed to save role. Please try again later.`);
    }
  }

  async function deleteRole(roleId: string) {
    if (
      !confirm(
        t`Are you sure you want to delete this role? This action cannot be undone.`
      )
    )
      return;
    setError(null);
    const supabase = createClient();
    try {
      await supabase.from("roles").delete().eq("id", roleId).throwOnError();
    } catch (e: unknown) {
      console.error("Error deleting role:", e);
      setError(t`Failed to delete role. Please try again later.`);
    }
  }

  async function createRole() {
    if (!editName.trim()) return setError("Role name required");
    setError(null);
    if (editAbsenceReportFormId === null) {
      setError(t`Absence report template must be selected`);
      return;
    }
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
          absence_report_form: editAbsenceReportFormId,
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
            absenceReportFormId: (data as any).absence_report_form ?? null,
          },
        ]);
      }
      resetEditDialog();
    } catch (e: unknown) {
      console.error("Error creating role:", e);
      setError(t`Failed to create role. Please try again later.`);
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
    setEditAbsenceReportFormId(null);
    setError(null);
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
    setEditAbsenceReportFormId(role.absenceReportFormId);
    setError(null);
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
    setEditAbsenceReportFormId(null);
  }

  return (
    <Flex direction="column" className={styles.root} gap="3">
      <Heading size="5" as="h3">
        <Trans>Manage roles</Trans>
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
                  <Trans>Edit</Trans>
                </Button>
                <Button variant="soft" onClick={() => deleteRole(role.id)}>
                  <TrashIcon />
                  <Trans>Delete</Trans>
                </Button>
              </Flex>
            </Card>
          ))
        )}
      </Flex>

      <Flex direction="row" gap="2" align="center">
        <Button onClick={() => openCreateDialog()}>
          <Trans>Create new role</Trans>
        </Button>
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
              }
            }}
          >
            <Dialog.Title>
              {editDialogRoleId === "new" ? (
                <Trans>Create Role</Trans>
              ) : (
                <Trans>Edit Role</Trans>
              )}
            </Dialog.Title>
            <Dialog.Description>
              {editDialogRoleId === "new" ? (
                <Trans>Fill in the details for the new role.</Trans>
              ) : (
                <Trans>Edit details for {editName}</Trans>
              )}
            </Dialog.Description>
            <Flex direction="column" gap="2" className={styles.dialogBody}>
              {error && (
                <Callout.Root color="red">
                  <Callout.Icon>
                    <CrossCircledIcon />
                  </Callout.Icon>
                  <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
              )}
              <TextField.Root
                placeholder={t`Role name`}
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
              />
              <TextField.Root
                placeholder={t`Role description`}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />

              <Heading size="2">
                <Trans>Permissions</Trans>
              </Heading>
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
                    <PermissionText permissionKey={k} />
                  </CheckboxCards.Item>
                ))}
              </CheckboxCards.Root>

              <Heading size="2">
                <Trans>Absence report settings</Trans>
              </Heading>
              <Flex direction="column" gap="2">
                <Flex direction="row" align="center" justify="between">
                  <Text size="2" color="gray">
                    <Trans>
                      Configure reviewer/approval and choose the template used
                      for this role.
                    </Trans>
                  </Text>
                </Flex>
                <Flex direction="row" align="center" gap="2">
                  <Text style={{ flexGrow: 1 }}>
                    <Trans>Reviewer role</Trans>
                  </Text>
                  <Select.Root
                    value={editAbsenceReportReviewerRole ?? "~"}
                    onValueChange={(value) =>
                      setEditAbsenceReportReviewerRole(
                        value === "~" ? null : value
                      )
                    }
                    required
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
                  <Text style={{ flexGrow: 1 }}>
                    <Trans>Approval required for reports</Trans>
                  </Text>
                  <Switch
                    checked={editAbsenceReportApprovalRequired}
                    onCheckedChange={(checked) =>
                      setEditAbsenceReportApprovalRequired(Boolean(checked))
                    }
                  />
                </Flex>

                <Flex direction="row" align="center" gap="2">
                  <Text style={{ flexGrow: 1 }}>
                    <Trans>Absence report template</Trans>
                  </Text>
                  <Tooltip
                    content={
                      editAbsenceReportFormId
                        ? t`Edit template`
                        : t`Select a template first`
                    }
                  >
                    <IconButton
                      variant="soft"
                      aria-label={t`Open template editor`}
                      disabled={!editAbsenceReportFormId}
                      asChild
                    >
                      <Link
                        href={
                          editAbsenceReportFormId
                            ? `/app/${clubId}/club/config/absence-forms/${editAbsenceReportFormId}`
                            : "#"
                        }
                        target="_blank"
                        onClick={(e) => {
                          if (!editAbsenceReportFormId) e.preventDefault();
                        }}
                      >
                        <Pencil1Icon />
                      </Link>
                    </IconButton>
                  </Tooltip>
                  <Select.Root
                    value={editAbsenceReportFormId ?? ""}
                    onValueChange={(value) =>
                      setEditAbsenceReportFormId(value === "" ? null : value)
                    }
                    name="absenceReportForm"
                    required
                  >
                    <Select.Trigger />
                    <Select.Content>
                      {forms.map((f) => (
                        <Select.Item key={f.id} value={f.id}>
                          {f.name}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Flex>
              </Flex>

              <Flex gap="2">
                <Button type="submit">
                  {editDialogRoleId === "new" ? (
                    <Trans>Create</Trans>
                  ) : (
                    <Trans>Save</Trans>
                  )}
                </Button>
                <Button
                  variant="soft"
                  type="button"
                  onClick={() => resetEditDialog()}
                >
                  <Trans>Cancel</Trans>
                </Button>
              </Flex>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </Flex>
  );
}
