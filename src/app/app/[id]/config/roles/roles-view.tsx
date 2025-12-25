"use client";

import type { Database } from "@/@types/database.types";
import { createClient } from "@/lib/supabase/client";
import { Trans, useLingui } from "@lingui/react/macro";
import { Flex, Heading, SegmentedControl, Skeleton } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { lazy, Suspense, use, useCallback, useEffect, useState } from "react";
import RoleDialog, { Role } from "./role-dialog";
import RolesManager from "./roles-manager";

const RolesGraph = lazy(() => import("./roles-graph"));

type RolesViewProps = {
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
};

export default function RolesView({
  clubId,
  rolesPromise,
  formsPromise,
}: RolesViewProps) {
  const { t } = useLingui();
  const initial = use(rolesPromise) ?? [];
  const formsInitial = use(formsPromise) ?? [];
  const [roles, setRoles] = useState<Role[]>(() =>
    (initial ?? []).map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      permissions: normalizePermissions(r.permissions),
      absenceReportReviewerRole: r.absence_report_reviewer_role ?? null,
      absenceReportApprovalRequired: r.absence_report_approval_required,
      absenceReportFormId: r.absence_report_form ?? null,
    }))
  );
  const [forms] = useState<{ id: string; name: string }[]>(() =>
    (formsInitial ?? []).map((f) => ({ id: f.id, name: f.name }))
  );

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const viewParam = searchParams.get("view") ?? "list";
  const [view, setView] = useState<"list" | "graph">(
    viewParam === "graph" ? "graph" : "list"
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", view);
    router.replace(`${pathname}?${params.toString()}`);
  }, [view, router, pathname, searchParams.toString()]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"new" | "edit">("new");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [error, setError] = useState<string | null>(null);

  function openCreate() {
    setSelectedRole(null);
    setDialogMode("new");
    setDialogOpen(true);
  }
  const openEdit = useCallback(
    (roleId: string) => {
      const r = roles.find((x) => x.id === roleId) ?? null;
      setSelectedRole(r);
      setDialogMode("edit");
      setDialogOpen(true);
    },
    [roles]
  );

  async function onSave(
    roleId: string,
    payload: Omit<Role, "id"> & { name: string }
  ) {
    setError(null);
    const supabase = createClient();
    try {
      await supabase
        .from("roles")
        .update({
          name: payload.name,
          description: payload.description,
          permissions: payload.permissions,
          absence_report_reviewer_role: payload.absenceReportReviewerRole,
          absence_report_approval_required:
            payload.absenceReportApprovalRequired,
          absence_report_form: payload.absenceReportFormId,
        })
        .eq("id", roleId)
        .throwOnError();
      setRoles((prev) =>
        prev.map((r) =>
          r.id === roleId
            ? {
                ...r,
                name: payload.name,
                description: payload.description,
                permissions: payload.permissions,
                absenceReportReviewerRole: payload.absenceReportReviewerRole,
                absenceReportApprovalRequired:
                  payload.absenceReportApprovalRequired,
                absenceReportFormId: payload.absenceReportFormId,
              }
            : r
        )
      );
      setDialogOpen(false);
    } catch (e) {
      console.error("Error saving role:", e);
      setError(t`Failed to save role. Please try again later.`);
    }
  }

  async function onCreate(payload: Omit<Role, "id"> & { name: string }) {
    setError(null);
    const supabase = createClient();
    try {
      const { data } = await supabase
        .from("roles")
        .insert({
          club_id: clubId,
          name: payload.name,
          description: payload.description,
          permissions: payload.permissions,
          absence_report_reviewer_role: payload.absenceReportReviewerRole,
          absence_report_approval_required:
            payload.absenceReportApprovalRequired,
          absence_report_form: payload.absenceReportFormId,
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
            absenceReportFormId: data.absence_report_form ?? null,
          },
        ]);
      }
      setDialogOpen(false);
    } catch (e) {
      console.error("Error creating role:", e);
      setError(t`Failed to create role. Please try again later.`);
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
      setRoles(roles.filter((r) => r.id !== roleId));
    } catch (e: unknown) {
      console.error("Error deleting role:", e);
      setError(t`Failed to delete role. Please try again later.`);
    }
  }

  return (
    <Flex direction="column" flexGrow="1" p="4">
      <Flex justify="between" align="center" mb="3">
        <Heading size="5" as="h3">
          <Trans>Manage roles</Trans>
        </Heading>
        <SegmentedControl.Root
          value={view}
          onValueChange={(v: "list" | "graph") => setView(v)}
        >
          <SegmentedControl.Item value="list">
            <Trans>List</Trans>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="graph">
            <Trans>Graph</Trans>
          </SegmentedControl.Item>
        </SegmentedControl.Root>
      </Flex>

      {view === "list" ? (
        <RolesManager
          roles={roles}
          onEditRole={openEdit}
          onCreateRole={openCreate}
          onDeleteRole={deleteRole}
        />
      ) : (
        <Suspense fallback={<Skeleton height="100%" />}>
          <RolesGraph
            roles={roles}
            onEditRole={openEdit}
            onCreateRole={openCreate}
            onDeleteRole={deleteRole}
          />
        </Suspense>
      )}

      <RoleDialog
        clubId={clubId}
        open={dialogOpen}
        mode={dialogMode}
        role={selectedRole}
        roles={roles}
        forms={forms}
        error={error}
        onClose={() => setDialogOpen(false)}
        onCreate={onCreate}
        onSave={onSave}
      />
    </Flex>
  );
}

export function normalizePermissions(
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
