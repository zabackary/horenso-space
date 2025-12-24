"use client";

import { createClient } from "@/lib/supabase/client";
import { useLingui } from "@lingui/react/macro";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Card, Flex, IconButton } from "@radix-ui/themes";
import {
  Background,
  Controls,
  Handle,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useMemo, useState } from "react";
import RoleDialog, { Role } from "./role-dialog";
import styles from "./roles-manager.module.css";

type RolesGraphProps = {
  clubId: string;
  roles: Role[];
  forms: { id: string; name: string }[];
};

type RoleNodeData = {
  label: string;
  onEdit: () => void;
};

function RoleNode({ data }: NodeProps<RoleNodeData>) {
  return (
    <div className={styles.roleNode}>
      <Handle type="target" position={Position.Top} />
      <Flex align="center" gap="2">
        <span className={styles.roleNodeLabel}>{data.label}</span>
        <IconButton
          size="1"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            data.onEdit();
          }}
          className={styles.roleNodeEditButton}
        >
          <Pencil1Icon />
        </IconButton>
      </Flex>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

const nodeTypes = {
  roleNode: RoleNode,
};

export default function RolesGraph({ clubId, roles, forms }: RolesGraphProps) {
  const { t } = useLingui();
  const [localRoles, setLocalRoles] = useState<Role[]>(roles);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"new" | "edit">("edit");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { nodes, edges } = useMemo(
    () => buildGraph(localRoles, openEdit),
    [localRoles]
  );

  function openEdit(role: Role) {
    setSelectedRole(role);
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
      setLocalRoles((prev) =>
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
        setLocalRoles((prev) => [
          ...prev,
          {
            id: data.id,
            name: data.name,
            description: data.description,
            permissions: normalizePermissions(data.permissions as any),
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
    <Flex direction="column" gap="3">
      <Card>
        <div style={{ width: "100%", height: 480 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            nodesDraggable={true}
            nodesConnectable={false}
            elementsSelectable={true}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </Card>

      <RoleDialog
        clubId={clubId}
        open={dialogOpen}
        mode={dialogMode}
        role={selectedRole}
        roles={localRoles}
        forms={forms}
        error={error}
        onClose={() => setDialogOpen(false)}
        onCreate={onCreate}
        onSave={onSave}
      />
    </Flex>
  );
}

function normalizePermissions(
  p: Record<string, unknown> | null
): Record<string, boolean> {
  if (!p || typeof p !== "object" || Array.isArray(p)) return {};
  const entries = Object.entries(p as Record<string, unknown>);
  const out: Record<string, boolean> = {};
  entries.forEach(([k, v]) => {
    out[k] = Boolean(v);
  });
  return out;
}

function buildGraph(
  roles: Role[],
  onEdit: (role: Role) => void
): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = roles.map((r, idx) => ({
    id: r.id,
    type: "roleNode",
    data: {
      label: r.name,
      onEdit: () => onEdit(r),
    },
    position: { x: (idx % 4) * 250, y: Math.floor(idx / 4) * 120 },
    draggable: true,
  }));
  const edges: Edge[] = [];
  roles.forEach((r) => {
    if (r.absenceReportReviewerRole) {
      edges.push({
        id: `${r.id}->${r.absenceReportReviewerRole}`,
        source: r.id,
        target: r.absenceReportReviewerRole,
      });
    }
  });
  return { nodes, edges };
}
