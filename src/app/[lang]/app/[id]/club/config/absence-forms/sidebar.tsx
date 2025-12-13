"use client";

import { Drawer } from "@/components/ui/drawer";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
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
      <Heading size="3">Templates</Heading>
      <Flex direction="column" gap="2">
        {forms.length === 0 ? (
          <Text className={styles.empty}>No templates yet.</Text>
        ) : (
          forms.map((f) => {
            const selected = selectedId === f.id;
            return (
              <Card
                key={f.id}
                className={`${styles.templateCard} ${
                  selected ? styles.templateCardSelected : ""
                }`}
                asChild
              >
                <Link
                  href={`/app/${clubId}/club/config/absence-forms/${f.id}`}
                  onClick={(e) => {
                    onSelect?.();
                  }}
                >
                  <Flex direction="column" gap="1">
                    <Text weight="bold">{f.name}</Text>
                    <Text size="1" className={styles.templateMeta}>
                      Updated {new Date(f.updated_at).toLocaleDateString()}
                    </Text>
                  </Flex>
                </Link>
              </Card>
            );
          })
        )}
      </Flex>
      <Button asChild>
        <Link href={`/app/${clubId}/club/config/absence-forms/new`}>
          Create new
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

  const selectedForm = forms.find((f) => f.id === selectedId);

  if (isMobile) {
    return (
      <Drawer.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
        <Button asChild className={styles.menuButton}>
          <Drawer.Trigger
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              width: "100%",
            }}
          >
            <span>{selectedForm?.name || "Select template"}</span>
            <ChevronDownIcon />
          </Drawer.Trigger>
        </Button>
        <Drawer.Portal>
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Title>Templates</Drawer.Title>
            <Drawer.Description style={{ display: "none" }}>
              Select an absence form template
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
    );
  }

  return <FormsList clubId={clubId} forms={forms} selectedId={selectedId} />;
}
