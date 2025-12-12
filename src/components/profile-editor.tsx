"use client";

import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Callout, Spinner, Text, TextArea, TextField } from "@radix-ui/themes";
import { use, useId, useState } from "react";
import type { Profile } from "@/lib/auth/getProfile";
import { useDebounceCallback } from "@/lib/debounce";
import { createClient } from "@/lib/supabase/client";

export default function ProfileEditor({
  profilePromise,
}: {
  profilePromise: Promise<Profile>;
}) {
  const a11yId = useId();

  const profile = use(profilePromise);

  const [showFormSaving, setShowFormSaving] = useState<boolean | null>(null);
  const debounceFormUpdate = useDebounceCallback((event: React.FormEvent) => {
    event.preventDefault();

    (async () => {
      const form = (event.target as HTMLInputElement | HTMLTextAreaElement)
        .form!;
      const formData = new FormData(form);
      const data = Object.fromEntries(
        formData.entries().map(([k, v]) => [k, v === "" ? null : v]),
      );

      const supabase = createClient();
      const { error } = await supabase
        .from("profiles")
        .update(data)
        .eq("id", profile?.id ?? "")
        .single();
      if (!error) {
        setShowFormSaving(false);
      }
    })();
  }, 1000);
  const handleFormUpdate = (event: React.FormEvent) => {
    setShowFormSaving(true);
    debounceFormUpdate(event);
  };

  return (
    <form onChange={handleFormUpdate}>
      {showFormSaving !== null ? (
        <Callout.Root my="2">
          <Callout.Icon>
            {showFormSaving ? <Spinner /> : <CheckCircledIcon />}
          </Callout.Icon>
          <Callout.Text>{showFormSaving ? "Saving..." : "Saved!"}</Callout.Text>
        </Callout.Root>
      ) : null}
      {/* TODO: add profile public/private toggle here */}
      {/* TODO: add profile picture upload here */}

      <Text as="p" mt="4" mb="1">
        <Text as="label" htmlFor={`${a11yId}-name`} size="2">
          Full name <span aria-label="required">*</span>
        </Text>
      </Text>
      <TextField.Root
        name="full_name"
        defaultValue={profile.full_name}
        placeholder="Your full name"
        type="text"
        required
        autoComplete="name"
        id={`${a11yId}-name`}
      />

      <Text as="p" mt="4" mb="1">
        <Text as="label" htmlFor={`${a11yId}-nickname`} size="2">
          Nickname
        </Text>
      </Text>
      <TextField.Root
        name="nickname"
        defaultValue={profile.nickname ?? ""}
        placeholder="Your nickname"
        type="text"
        autoComplete="name"
        id={`${a11yId}-nickname`}
      />

      <Text as="p" mt="4" mb="1">
        <Text as="label" htmlFor={`${a11yId}-school`} size="2">
          School
        </Text>
      </Text>
      <TextField.Root
        name="school"
        defaultValue={profile.school ?? ""}
        placeholder="通っている学校名"
        type="text"
        id={`${a11yId}-school`}
      />

      <Text as="p" mt="4" mb="1">
        <Text as="label" htmlFor={`${a11yId}-bio`} size="2">
          Biography
        </Text>
      </Text>
      <TextArea
        name="bio"
        defaultValue={profile.bio ?? ""}
        placeholder="〇〇出身。"
        id={`${a11yId}-bio`}
      />
    </form>
  );
}
