"use client";

import { useSuspenseQuery } from "@apollo/client/react";
import { Trans, useLingui } from "@lingui/react/macro";
import { Flex, Heading, SegmentedControl, Skeleton } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { lazy, Suspense, use, useCallback, useEffect, useState } from "react";
import type { Database } from "@/@types/database.types";
import PaginationControls from "@/components/ui/pagination-controls";
import { gql } from "@/gql";
import { createClient } from "@/lib/supabase/client";
import {
  DEFAULT_PAGE_SIZE,
  useCursorPagination,
} from "@/lib/useCursorPagination";
import RoleDialog, { type Role } from "./role-dialog";
import RolesManager from "./roles-manager";

const RolesGraph = lazy(() => import("./roles-graph"));

// Caps the unpaginated fetch used for the graph view and the reviewer-role
// dropdown, which both need every role in the club rather than one page.
const ALL_ROLES_CAP = 100;

const clubRolesViewQuery = gql(`
  query ClubRolesView($clubId: UUID!, $first: Int!, $after: Cursor, $allFirst: Int!) {
    page: rolesCollection(
      filter: { clubId: { eq: $clubId } }
      orderBy: { createdAt: AscNullsLast }
      first: $first
      after: $after
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          name
          description
          permissions
          absenceReportReviewerRole
          absenceReportApprovalRequired
          absenceReportForm
        }
      }
    }
    all: rolesCollection(
      filter: { clubId: { eq: $clubId } }
      orderBy: { createdAt: AscNullsLast }
      first: $allFirst
    ) {
      edges {
        node {
          id
          name
          description
          permissions
          absenceReportReviewerRole
          absenceReportApprovalRequired
          absenceReportForm
        }
      }
    }
  }
`);

type RoleNode = {
  id: string;
  name: string;
  description?: string | null;
  permissions: string;
  absenceReportReviewerRole?: string | null;
  absenceReportApprovalRequired: boolean;
  absenceReportForm?: string | null;
};

function toRole(node: RoleNode): Role {
  return {
    id: node.id,
    name: node.name,
    description: node.description,
    permissions: parseGraphQLPermissions(node.permissions),
    absenceReportReviewerRole: node.absenceReportReviewerRole ?? null,
    absenceReportApprovalRequired: node.absenceReportApprovalRequired,
    absenceReportFormId: node.absenceReportForm ?? null,
  };
}

type RolesViewProps = {
  clubId: string;
  formsPromise: PromiseLike<
    Pick<
      Database["public"]["Tables"]["absence_report_forms"]["Row"],
      "id" | "name"
    >[]
  >;
};

export default function RolesView({ clubId, formsPromise }: RolesViewProps) {
  const { t } = useLingui();
  const formsInitial = use(formsPromise) ?? [];
  const [forms] = useState<{ id: string; name: string }[]>(() =>
    (formsInitial ?? []).map((f) => ({ id: f.id, name: f.name })),
  );

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const search = searchParams.toString();
  const viewParam = searchParams.get("view") ?? "list";
  const [view, setView] = useState<"list" | "graph">(
    viewParam === "graph" ? "graph" : "list",
  );

  useEffect(() => {
    const params = new URLSearchParams(search);
    params.set("view", view);
    router.replace(`${pathname}?${params.toString()}`);
  }, [view, router, pathname, search]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"new" | "edit">("new");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { after, first, hasPrevious, goToNext, goToPrevious } =
    useCursorPagination(DEFAULT_PAGE_SIZE);

  const { data, refetch: refetchRoles } = useSuspenseQuery(clubRolesViewQuery, {
    variables: { clubId, first, after, allFirst: ALL_ROLES_CAP },
  });

  const pagedRoles = (data?.page?.edges ?? []).map((e) => toRole(e.node));
  const pageInfo = data?.page?.pageInfo;
  const allRoles = (data?.all?.edges ?? []).map((e) => toRole(e.node));

  function openCreate() {
    setSelectedRole(null);
    setDialogMode("new");
    setDialogOpen(true);
  }
  const openEdit = useCallback(
    (roleId: string) => {
      const r =
        allRoles.find((x) => x.id === roleId) ??
        pagedRoles.find((x) => x.id === roleId) ??
        null;
      setSelectedRole(r);
      setDialogMode("edit");
      setDialogOpen(true);
    },
    [allRoles, pagedRoles],
  );

  async function onSave(
    roleId: string,
    payload: Omit<Role, "id"> & { name: string },
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
      await refetchRoles();
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
      await supabase
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
        .throwOnError();
      await refetchRoles();
      setDialogOpen(false);
    } catch (e) {
      console.error("Error creating role:", e);
      setError(t`Failed to create role. Please try again later.`);
    }
  }

  async function deleteRole(roleId: string) {
    if (
      !confirm(
        t`Are you sure you want to delete this role? This action cannot be undone.`,
      )
    )
      return;
    setError(null);
    const supabase = createClient();
    try {
      await supabase.from("roles").delete().eq("id", roleId).throwOnError();
      await refetchRoles();
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
        <Flex direction="column" gap="3">
          <RolesManager
            roles={pagedRoles}
            onEditRole={openEdit}
            onCreateRole={openCreate}
            onDeleteRole={deleteRole}
          />
          <PaginationControls
            hasPrevious={hasPrevious}
            hasNext={pageInfo?.hasNextPage ?? false}
            onPrevious={goToPrevious}
            onNext={() => goToNext(pageInfo?.endCursor)}
          />
        </Flex>
      ) : (
        <Suspense fallback={<Skeleton height="100%" />}>
          <RolesGraph
            roles={allRoles}
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
        roles={allRoles}
        forms={forms}
        error={error}
        onClose={() => setDialogOpen(false)}
        onCreate={onCreate}
        onSave={onSave}
      />
    </Flex>
  );
}

function parseGraphQLPermissions(raw: string): Record<string, boolean> {
  try {
    return normalizePermissions(JSON.parse(raw));
  } catch {
    return {};
  }
}

export function normalizePermissions(
  p: Database["public"]["Tables"]["roles"]["Row"]["permissions"],
): Record<string, boolean> {
  if (!p || typeof p !== "object" || Array.isArray(p)) return {};
  const entries = Object.entries(
    p as Record<
      string,
      Database["public"]["Tables"]["roles"]["Row"]["permissions"]
    >,
  );
  const out: Record<string, boolean> = {};
  entries.forEach(([k, v]) => {
    out[k] = Boolean(v);
  });
  return out;
}
