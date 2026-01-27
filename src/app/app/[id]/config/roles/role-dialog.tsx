import { PERMISSION_KEYS, PermissionText } from "@/components/permission-text";
import { Trans, useLingui } from "@lingui/react/macro";
import { CrossCircledIcon, Pencil1Icon } from "@radix-ui/react-icons";
import {
  Button,
  Callout,
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
import { useEffect, useState } from "react";
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

type RoleDialogProps = {
  clubId: string;
  open: boolean;
  mode: "new" | "edit";
  role?: Role | null;
  roles: Role[];
  forms: { id: string; name: string }[];
  error?: string | null;
  onClose: () => void;
  onCreate: (
    payload: Omit<Role, "id"> & { name: string },
  ) => Promise<void> | void;
  onSave: (
    roleId: string,
    payload: Omit<Role, "id"> & { name: string },
  ) => Promise<void> | void;
};

export default function RoleDialog({
  clubId,
  open,
  mode,
  role,
  roles,
  forms,
  error,
  onClose,
  onCreate,
  onSave,
}: RoleDialogProps) {
  const { t } = useLingui();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(PERMISSION_KEYS.map((k) => [k, false])),
  );
  const [reviewerRole, setReviewerRole] = useState<string | null>(null);
  const [approvalRequired, setApprovalRequired] = useState(false);
  const [formId, setFormId] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    if (mode === "edit" && role) {
      setName(role.name);
      setDescription(role.description ?? "");
      setPermissions(role.permissions);
      setReviewerRole(role.absenceReportReviewerRole);
      setApprovalRequired(role.absenceReportApprovalRequired);
      setFormId(role.absenceReportFormId);
    } else {
      setName("");
      setDescription("");
      setPermissions(
        Object.fromEntries(PERMISSION_KEYS.map((k) => [k, false])),
      );
      setReviewerRole(null);
      setApprovalRequired(false);
      setFormId(null);
    }
    setLocalError(null);
  }, [open, mode, role]);

  function submit() {
    setLocalError(null);
    if (!name.trim()) {
      setLocalError(t`Role name required`);
      return;
    }
    if (formId === null) {
      setLocalError(t`Absence report template must be selected`);
      return;
    }
    const payload = {
      name: name.trim(),
      description: description,
      permissions,
      absenceReportReviewerRole: reviewerRole,
      absenceReportApprovalRequired: approvalRequired,
      absenceReportFormId: formId,
    };
    if (mode === "new") {
      onCreate(payload);
    } else if (mode === "edit" && role) {
      onSave(role.id, payload);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={(o) => (!o ? onClose() : null)}>
      <Dialog.Content>
        <Dialog.Title>
          {mode === "new" ? (
            <Trans>Create Role</Trans>
          ) : (
            <Trans>Edit Role</Trans>
          )}
        </Dialog.Title>
        <Dialog.Description>
          {mode === "new" ? (
            <Trans>Fill in the details for the new role.</Trans>
          ) : (
            <Trans>Edit details for {name}</Trans>
          )}
        </Dialog.Description>
        <Flex direction="column" gap="2" className={styles.dialogBody}>
          {(localError || error) && (
            <Callout.Root color="red">
              <Callout.Icon>
                <CrossCircledIcon />
              </Callout.Icon>
              <Callout.Text>{localError ?? error}</Callout.Text>
            </Callout.Root>
          )}

          <TextField.Root
            placeholder={t`Role name`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField.Root
            placeholder={t`Role description`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Heading size="2">
            <Trans>Permissions</Trans>
          </Heading>
          <CheckboxCards.Root
            value={Object.entries(permissions)
              .filter(([_, v]) => v)
              .map(([k, _]) => k)}
            onValueChange={(values: string[]) => {
              const newPerms: Record<string, boolean> = {};
              PERMISSION_KEYS.forEach((k) => {
                newPerms[k] = values.includes(k);
              });
              setPermissions(newPerms);
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
                  Configure reviewer/approval and choose the template used for
                  this role.
                </Trans>
              </Text>
            </Flex>
            <Flex direction="row" align="center" gap="2" justify="between">
              <Text>
                <Trans>Reviewer role</Trans>
              </Text>
              <Select.Root
                value={reviewerRole ?? "~"}
                onValueChange={(value) =>
                  setReviewerRole(value === "~" ? null : value)
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
            <Flex
              direction="row"
              align="center"
              gap="2"
              justify="between"
              style={{ opacity: reviewerRole ? 1 : 0.5 }}
            >
              <Flex direction="column" gap="1">
                <Text>
                  <Trans>Approval required for reports</Trans>
                </Text>
                {reviewerRole === null && (
                  <Text size="2" color="gray">
                    <Trans>
                      You must set a reviewer for the role in order to require
                      approval for absence reports. Note that if no reviewer is
                      set, no reviews will be required for approval of this
                      role's reports.
                    </Trans>
                  </Text>
                )}
              </Flex>
              <Switch
                checked={approvalRequired}
                disabled={!reviewerRole}
                onCheckedChange={(checked) =>
                  setApprovalRequired(Boolean(checked))
                }
              />
            </Flex>

            <Flex direction="row" align="center" gap="2" justify="between">
              <Text>
                <Trans>Absence report template</Trans>
              </Text>
              <Flex align="center" gap="2">
                <Tooltip
                  content={
                    formId ? t`Edit template` : t`Select a template first`
                  }
                >
                  <IconButton
                    variant="soft"
                    aria-label={t`Open template editor`}
                    disabled={!formId}
                    asChild
                  >
                    <Link
                      href={
                        formId
                          ? `/app/${clubId}/club/config/absence-forms/${formId}`
                          : "#"
                      }
                      target="_blank"
                      onClick={(e) => {
                        if (!formId) e.preventDefault();
                      }}
                    >
                      <Pencil1Icon />
                    </Link>
                  </IconButton>
                </Tooltip>
                <Select.Root
                  value={formId ?? ""}
                  onValueChange={(value) =>
                    setFormId(value === "" ? null : value)
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
          </Flex>

          <Flex gap="2">
            <Button onClick={submit}>
              {mode === "new" ? <Trans>Create</Trans> : <Trans>Save</Trans>}
            </Button>
            <Button variant="soft" onClick={() => onClose()}>
              <Trans>Cancel</Trans>
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
