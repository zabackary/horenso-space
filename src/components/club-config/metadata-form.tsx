"use client";

import type { Database } from "@/@types/database.types";
import { createClient } from "@/lib/supabase/client";
import { Trans, useLingui } from "@lingui/react/macro";
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
import styles from "./metadata-form.module.css";

type ClubRow = Database["public"]["Tables"]["clubs"]["Row"];

export default function MetadataForm({
  clubPromise,
}: {
  clubPromise: Promise<ClubRow | null>;
}) {
  const a11yId = useId();
  const club = use(clubPromise);
  const { t } = useLingui();

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
      Array.from(formData.entries()).map(([k, v]) => [k, v === "" ? null : v])
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
      console.error("Error saving club metadata:", err);
      setError(
        t({
          id: "clubConfig.metadataForm.saveError",
          message: "Failed to save club metadata. Please try again later.",
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className={styles.form}>
      <Flex direction="column" gap="2">
        <Flex direction="column" className={styles.field}>
          <Text as="label" htmlFor={`${a11yId}-name`} size="2">
            <Trans id="club.name">Club name</Trans>
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
            <Trans id="club.description">Club description</Trans>
          </Text>
          <TextField.Root
            name="description"
            id={`${a11yId}-description`}
            defaultValue={club?.description ?? ""}
          />
        </Flex>

        <Flex direction="column" className={styles.field}>
          <Text as="label" htmlFor={`${a11yId}-website`} size="2">
            <Trans id="club.website">Website</Trans>
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
            <Trans id="club.privacy">
              Club privacy:{" "}
              {isPublic ? (
                <Trans id="club.privacy.public">Public</Trans>
              ) : (
                <Trans id="club.privacy.private">Private</Trans>
              )}
            </Trans>
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
            <Trans id="common.save">Save</Trans>
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}
