"use client";

import { createClient } from "@/lib/supabase/client";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import {
  Button,
  Callout,
  Flex,
  Switch,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useEffect, useId, useState } from "react";

export default function MetadataForm({ clubId }: { clubId: string }) {
  const a11yId = useId();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const supabase = createClient();
      try {
        const { data } = await supabase
          .from("clubs")
          .select("name, description, website, public")
          .eq("id", clubId)
          .single();
        if (!mounted) return;
        if (data) {
          setName(data.name ?? "");
          setDescription(data.description ?? "");
          setWebsite(data.website ?? "");
          setIsPublic(Boolean(data.public));
        }
      } catch (e) {
        // ignore; show nothing
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [clubId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const supabase = createClient();
    try {
      await supabase
        .from("clubs")
        .update({ name, description, website, public: isPublic })
        .eq("id", clubId)
        .throwOnError();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <Flex direction="column" gap="2" my="4">
        <Text as="label" htmlFor={`${a11yId}-name`} size="2">
          Club name
        </Text>
        <TextField.Root
          id={`${a11yId}-name`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Text as="label" htmlFor={`${a11yId}-description`} size="2">
          Club description
        </Text>
        <TextField.Root
          id={`${a11yId}-description`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Text as="label" htmlFor={`${a11yId}-website`} size="2">
          Website
        </Text>
        <TextField.Root
          id={`${a11yId}-website`}
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />

        <Text as="label" htmlFor={`${a11yId}-is-public`} size="2">
          Club privacy: {isPublic ? "Public" : "Private"}
        </Text>
        <Switch
          id={`${a11yId}-is-public`}
          checked={isPublic}
          onCheckedChange={setIsPublic}
        />

        {error && (
          <Callout.Root color="red">
            <Callout.Icon>
              <CrossCircledIcon />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}

        <Button type="submit" loading={isLoading}>
          Save
        </Button>
      </Flex>
    </form>
  );
}
