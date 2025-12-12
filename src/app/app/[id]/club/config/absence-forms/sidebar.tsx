"use client";

import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./layout.module.css";

type FormItem = { id: string; name: string; updated_at: string };

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
                <Link href={`/app/${clubId}/club/config/absence-forms/${f.id}`}>
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
