import { Trans } from "@lingui/react/macro";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button, Card, Flex, Text } from "@radix-ui/themes";
import { Role } from "./role-dialog";
import styles from "./roles-manager.module.css";

export default function RolesManager({
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
  return (
    <Flex direction="column" className={styles.root} gap="3">
      <Flex direction="column" gap="3">
        {roles.length === 0 ? (
          <Text>No roles created yet.</Text>
        ) : (
          roles.map((role) => (
            <Card key={role.id} className={styles.roleCard}>
              <Flex align="center" gap="2" justify="between">
                <Flex direction="column">
                  <Text weight="bold">{role.name}</Text>
                  {role.description && (
                    <Text color="gray" size="2">
                      {role.description}
                    </Text>
                  )}
                </Flex>
                <Flex gap="2">
                  <Button variant="outline" onClick={() => onEditRole(role.id)}>
                    <Trans>Edit</Trans>
                  </Button>
                  <Button variant="soft" onClick={() => onDeleteRole(role.id)}>
                    <TrashIcon />
                    <Trans>Delete</Trans>
                  </Button>
                </Flex>
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
