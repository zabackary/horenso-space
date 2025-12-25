import { Trans } from "@lingui/react/macro";
import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import { Card, Flex, IconButton, Tooltip } from "@radix-ui/themes";
import {
  Background,
  Controls,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from "dagre";
import { useEffect } from "react";
import { Role } from "./role-dialog";
import styles from "./roles-manager.module.css";

type RoleNodeData = {
  label: string;
  onEdit: () => void;
};

function RoleNode({ data }: NodeProps<Node<RoleNodeData>>) {
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

export default function RolesGraph({
  roles,
  onEditRole,
  onCreateRole,
  onDeleteRole,
}: {
  roles: Role[];
  onEditRole: (roleId: string) => void;
  onCreateRole: () => void;
  onDeleteRole: (roleId: string) => void;
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<RoleNodeData>>(
    []
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  // Build graph when roles change
  useEffect(() => {
    const graph = buildGraph(roles, onEditRole);
    setNodes(graph.nodes);
    setEdges(graph.edges);
  }, [roles, onEditRole, setEdges, setNodes]);

  return (
    <Flex direction="column" gap="3" flexGrow="1" asChild>
      <Card className={styles.rolesGraphCard}>
        <Tooltip content={<Trans>Add role</Trans>}>
          <IconButton
            size="4"
            variant="outline"
            className={styles.addRoleButton}
            onClick={(e) => {
              e.stopPropagation();
              onCreateRole();
            }}
          >
            <PlusIcon />
          </IconButton>
        </Tooltip>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          nodesDraggable={true}
          nodesConnectable={false}
          elementsSelectable={true}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </Card>
    </Flex>
  );
}

function buildGraph(
  roles: Role[],
  onEdit: (roleId: string) => void
): { nodes: Node<RoleNodeData>[]; edges: Edge[] } {
  const nodes: Node<RoleNodeData>[] = roles.map((r) => ({
    id: r.id,
    type: "roleNode",
    data: {
      label: r.name,
      onEdit: () => onEdit(r.id),
    },
    position: { x: 0, y: 0 },
    draggable: true,
  }));
  const edges: Edge[] = [];
  roles.forEach((r) => {
    if (r.absenceReportReviewerRole) {
      edges.push({
        id: `${r.id}->${r.absenceReportReviewerRole}`,
        source: r.id,
        target: r.absenceReportReviewerRole,
        markerEnd: { type: MarkerType.ArrowClosed },
      });
    }
  });

  // Dagre layout (top-to-bottom)
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: "TB", ranksep: 60, nodesep: 40 });
  g.setDefaultEdgeLabel(() => ({}));

  nodes.forEach((n) => {
    g.setNode(n.id, { width: 180, height: 56 });
  });
  edges.forEach((e) => {
    g.setEdge(String(e.source), String(e.target));
  });

  dagre.layout(g);
  nodes.forEach((n) => {
    const pos = g.node(n.id);
    if (pos && typeof pos.x === "number" && typeof pos.y === "number") {
      n.position = { x: pos.x, y: pos.y };
    }
  });

  return { nodes, edges };
}
