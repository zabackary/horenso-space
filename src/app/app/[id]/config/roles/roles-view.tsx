"use client";

import type { Database } from "@/@types/database.types";
import { createClient } from "@/lib/supabase/client";
import { useLingui } from "@lingui/react/macro";
import { Box, Flex, SegmentedControl, Text } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import RoleDialog, { Role } from "./role-dialog";
import RolesGraph from "./roles-graph";
import RolesManager from "./roles-manager";

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
      absenceReportFormId: (r as any).absence_report_form ?? null,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"new" | "edit">("new");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [error, setError] = useState<string | null>(null);

  function openCreate() {
    setSelectedRole(null);
    setDialogMode("new");
    setDialogOpen(true);
  }
  function openEdit(roleId: string) {
    const r = roles.find((x) => x.id === roleId) ?? null;
    setSelectedRole(r);
    setDialogMode("edit");
    setDialogOpen(true);
  }

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
            absenceReportFormId: (data as any).absence_report_form ?? null,
          },
        ]);
      }
      setDialogOpen(false);
    } catch (e) {
      console.error("Error creating role:", e);
      setError(t`Failed to create role. Please try again later.`);
    }
  }

  return (
    <Box>
      <Flex justify="between" align="center" mb="3">
        <Text weight="bold">Roles</Text>
        <SegmentedControl.Root
          value={view}
          onValueChange={(v) => setView(v as any)}
        >
          <SegmentedControl.Item value="list">List</SegmentedControl.Item>
          <SegmentedControl.Item value="graph">Graph</SegmentedControl.Item>
        </SegmentedControl.Root>
      </Flex>

      {view === "list" ? (
        <RolesManager
          clubId={clubId}
          roles={roles}
          forms={forms}
          onEditRole={openEdit}
          onCreateRole={openCreate}
          onRolesChange={setRoles}
        />
      ) : (
        <RolesGraph clubId={clubId} roles={roles} forms={forms} />
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
    </Box>
  );
}

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
