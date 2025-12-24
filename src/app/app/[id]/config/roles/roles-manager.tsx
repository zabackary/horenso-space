import { createClient } from "@/lib/supabase/client";
import { Trans, useLingui } from "@lingui/react/macro";
import { CrossCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button, Callout, Card, Flex, Heading, Text } from "@radix-ui/themes";
import styles from "./roles-manager.module.css";

export type Role = {
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
  roles,
  forms,
  onEditRole,
  onCreateRole,
  onRolesChange,
}: {
  clubId: string;
  roles: Role[];
  forms: { id: string; name: string }[];
  onEditRole: (roleId: string) => void;
  onCreateRole: () => void;
  onRolesChange: (roles: Role[]) => void;
}) {
  const { t } = useLingui();
  const [error, setError] = useState<string | null>(null);

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
      onRolesChange(roles.filter((r) => r.id !== roleId));
    } catch (e: unknown) {
      console.error("Error deleting role:", e);
      setError(t`Failed to delete role. Please try again later.`);
    }
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
            <Card key={role.id} className={styles.roleCard}>
              <Flex align="center" gap="2">
                <Flex direction="column" style={{ flexGrow: 1 }}>
                  <Text weight="bold">{role.name}</Text>
                  {role.description && (
                    <Text color="gray" size="2">
                      {role.description}
                    </Text>
                  )}
                </Flex>
                <Button variant="outline" onClick={() => onEditRole(role.id)}>
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
        <Button onClick={() => onCreateRole()}>
          <Trans>Create new role</Trans>
        </Button>
      </Flex>
    </Flex>
  );
}

import { useState } from "react";
