"use client";

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
import { useRouter } from "next/navigation";
import { useId, useState } from "react";

export function ClubCreateForm() {
  const a11yId = useId();
  const { t } = useLingui();

  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const [clubSchool, setClubSchool] = useState("");
  const [clubWebsite, setClubWebsite] = useState("");
  const [clubIsPublic, setClubIsPublic] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await supabase
        .from("clubs")
        .insert({
          name: clubName,
          description: clubDescription,
          school: clubSchool,
          website: clubWebsite,
          public: clubIsPublic,
          // TODO: Implement absence report schema
          absence_report_schema: {},
        })
        .throwOnError()
        .select()
        .single();
      if (data) {
        router.push(`/app/${data.id}`);
      } else {
        router.push("/app");
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <Flex direction="column" gap="2" my="4">
        <Text as="label" htmlFor={`${a11yId}-name`} size="2">
          <Trans id="club.name">Club name</Trans>{" "}
          <span aria-label="required">*</span>
        </Text>
        <TextField.Root
          placeholder={t({
            id: "club.namePlaceholder",
            message: "Your club",
          })}
          required
          id={`${a11yId}-name`}
          value={clubName}
          onChange={(e) => setClubName(e.target.value)}
        />
        <Text as="label" htmlFor={`${a11yId}-description`} size="2">
          <Trans id="club.description">Club description</Trans>
        </Text>
        <TextField.Root
          placeholder={t({
            id: "club.descriptionPlaceholder",
            message: "A short description",
          })}
          id={`${a11yId}-description`}
          value={clubDescription}
          onChange={(e) => setClubDescription(e.target.value)}
        />
        <Text as="label" htmlFor={`${a11yId}-school`} size="2">
          <Trans id="club.school">School</Trans>
        </Text>
        <TextField.Root
          placeholder={t({
            id: "club.schoolPlaceholder",
            message: "Your school",
          })}
          id={`${a11yId}-school`}
          value={clubSchool}
          onChange={(e) => setClubSchool(e.target.value)}
        />
        <Text as="label" htmlFor={`${a11yId}-website`} size="2">
          <Trans id="club.website">Website</Trans>
        </Text>
        <TextField.Root
          placeholder="https://example.com"
          type="url"
          id={`${a11yId}-website`}
          value={clubWebsite}
          onChange={(e) => setClubWebsite(e.target.value)}
        />
        <Text as="label" htmlFor={`${a11yId}-is-public`} size="2">
          <Trans id="club.privacy">
            Club privacy: {clubIsPublic ? "Public" : "Private"}
          </Trans>
        </Text>
        <Switch
          id={`${a11yId}-is-public`}
          checked={clubIsPublic}
          onCheckedChange={setClubIsPublic}
        />
        <Text size="1" color="gray" as="p">
          <Trans id="club.privacyDescription">
            If this is a public club, anyone can find it online and view the
            information you've provided here.
          </Trans>
        </Text>
        {error && (
          <Callout.Root color="red">
            <Callout.Icon>
              <CrossCircledIcon />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <Button type="submit" loading={isLoading}>
          <Trans id="club.createButton">Create club</Trans>
        </Button>
      </Flex>
    </form>
  );
}
