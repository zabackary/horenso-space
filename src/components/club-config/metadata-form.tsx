"use client";

import { CrossCircledIcon } from "@radix-ui/react-icons";
import {
  Button,
  Callout,
  Flex,
  Switch,
  Text,
  TextField,
} from "@radix-ui/themes";
import { use, useId, useState } from "react";
import type { Database } from "@/@types/database.types";
import { createClient } from "@/lib/supabase/client";
import styles from "./metadata-form.module.css";

type ClubRow = Database["public"]["Tables"]["clubs"]["Row"];

export default function MetadataForm({
  clubPromise,
}: {
  clubPromise: Promise<ClubRow | null>;
}) {
  const a11yId = useId();
  const club = use(clubPromise);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState<boolean>(Boolean(club?.public));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(
      Array.from(formData.entries()).map(([k, v]) => [k, v === "" ? null : v]),
    ) as Record<string, FormDataEntryValue | null>;
    const supabase = createClient();
    try {
      if (!club) throw new Error("Club not found");
      await supabase
        .from("clubs")
        .update({
          name: (data["name"] as string) ?? "",
          description: (data["description"] as string) ?? null,
          website: (data["website"] as string) ?? null,
          public: data["public"] === "on" || data["public"] === "true",
        })
        .eq("id", club.id)
        .throwOnError();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className={styles.form}>
      <Flex direction="column" gap="2">
        <Flex direction="column" className={styles.field}>
          <Text as="label" htmlFor={`${a11yId}-name`} size="2">
            Club name
          </Text>
          <TextField.Root
            name="name"
            id={`${a11yId}-name`}
            defaultValue={club?.name ?? ""}
            required
          />
        </Flex>

        <Flex direction="column" className={styles.field}>
          <Text as="label" htmlFor={`${a11yId}-description`} size="2">
            Club description
          </Text>
          <TextField.Root
            name="description"
            id={`${a11yId}-description`}
            defaultValue={club?.description ?? ""}
          />
        </Flex>

        <Flex direction="column" className={styles.field}>
          <Text as="label" htmlFor={`${a11yId}-website`} size="2">
            Website
          </Text>
          <TextField.Root
            name="website"
            id={`${a11yId}-website`}
            type="url"
            defaultValue={club?.website ?? ""}
          />
        </Flex>

        <Flex align="center" gap="2" className={styles.field}>
          <Text as="label" htmlFor={`${a11yId}-is-public`} size="2">
            Club privacy: {isPublic ? "Public" : "Private"}
          </Text>
          <input
            id={`${a11yId}-hidden-public`}
            type="hidden"
            name="public"
            value={isPublic ? "true" : "false"}
          />
          <Switch
            id={`${a11yId}-is-public`}
            checked={isPublic}
            onCheckedChange={(v) => setIsPublic(Boolean(v))}
          />
        </Flex>

        {error && (
          <Callout.Root color="red">
            <Callout.Icon>
              <CrossCircledIcon />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}

        <Flex className={styles.actions}>
          <Button type="submit" loading={isLoading}>
            Save
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}
