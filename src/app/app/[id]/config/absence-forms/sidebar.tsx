"use client";

import { Drawer } from "@/components/ui/drawer";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { Trans } from "@lingui/react/macro";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  Button,
  Card,
  Flex,
  Heading,
  Text,
  VisuallyHidden,
} from "@radix-ui/themes";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import styles from "./layout.module.css";

type FormItem = { id: string; name: string; updated_at: string };

function FormsList({
  clubId,
  forms,
  selectedId,
  onSelect,
}: {
  clubId: string;
  forms: FormItem[];
  selectedId: string | undefined;
  onSelect?: () => void;
}) {
  return (
    <Flex direction="column" gap="3">
      <Heading size="3">
        <Trans>Absence report templates</Trans>
      </Heading>
      <Flex direction="column" gap="2">
        {forms.length === 0 ? (
          <Text className={styles.empty}>
            <Trans>No absence report templates found.</Trans>
          </Text>
        ) : (
          forms.map((f) => {
            const selected = selectedId === f.id;
            return (
              <Card
                key={f.id}
                className={`${styles.templateCard} ${
                  selected ? styles.templateCardSelected : ""
                }`}
                onClick={() => {
                  onSelect?.();
                }}
                asChild
              >
                <Link href={`/app/${clubId}/config/absence-forms/${f.id}`}>
                  <Flex direction="column" gap="1">
                    <Text weight="bold">{f.name}</Text>
                    <Text size="1" className={styles.templateMeta}>
                      <Trans>
                        Updated at: {new Date(f.updated_at).toLocaleString()}
                      </Trans>
                    </Text>
                  </Flex>
                </Link>
              </Card>
            );
          })
        )}
      </Flex>
      <Button asChild>
        <Link
          href={`/app/${clubId}/config/absence-forms/new`}
          onClick={onSelect}
        >
          <Trans>Create new template</Trans>
        </Link>
      </Button>
    </Flex>
  );
}

export default function Sidebar({
  clubId,
  forms,
}: {
  clubId: string;
  forms: FormItem[];
}) {
  const params = useParams<{ id: string; formId?: string }>();
  const currentFormId = params?.formId as string | undefined;
  const selectedId = currentFormId ?? forms[0]?.id;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (isMobile) {
    return (
      <>
        <Button asChild className={styles.menuButton}>
          <Link
            href={`/app/${clubId}/config/absence-forms`}
            onClick={(e) => {
              e.preventDefault();
              setDrawerOpen(true);
            }}
          >
            <ChevronDownIcon /> <Trans>Select template</Trans>
          </Link>
        </Button>
        <Drawer.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
          <Drawer.Portal>
            <Drawer.Overlay />
            <Drawer.Content>
              <Drawer.Title>
                <Trans>Select absence form</Trans>
              </Drawer.Title>
              <Drawer.Description asChild>
                <VisuallyHidden>
                  <Trans>Select an absence form template</Trans>
                </VisuallyHidden>
              </Drawer.Description>
              <div className={styles.drawerContent}>
                <FormsList
                  clubId={clubId}
                  forms={forms}
                  selectedId={selectedId}
                  onSelect={() => setDrawerOpen(false)}
                />
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </>
    );
  }

  return <FormsList clubId={clubId} forms={forms} selectedId={selectedId} />;
}
