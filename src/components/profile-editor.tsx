"use client";

import type { Profile } from "@/lib/auth/getProfile";
import { useDebounceCallback } from "@/lib/debounce";
import { createClient } from "@/lib/supabase/client";
import { Trans, useLingui } from "@lingui/react/macro";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Callout, Spinner, Text, TextArea, TextField } from "@radix-ui/themes";
import { use, useId, useState } from "react";

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
        formData.entries().map(([k, v]) => [
          k,
          // Omit empty strings for optional fields
          // full_name has a required constraint, so we don't omit it
          k !== "full_name" && v === "" ? null : v,
        ]),
      );

      const supabase = createClient();
      const { error } = await supabase
        .from("profiles")
        .update(data)
        .eq("id", profile.id)
        .single();
      if (error) {
        console.error("Error updating profile:", error);
      } else {
        setShowFormSaving(false);
        setTimeout(() => setShowFormSaving(null), 2000);
      }
    })();
  }, 1000);
  const handleFormUpdate = (event: React.FormEvent) => {
    setShowFormSaving(true);
    debounceFormUpdate(event);
  };

  const { t } = useLingui();

  return (
    <form onChange={handleFormUpdate}>
      {showFormSaving !== null ? (
        <Callout.Root my="2">
          <Callout.Icon>
            {showFormSaving ? <Spinner /> : <CheckCircledIcon />}
          </Callout.Icon>
          <Callout.Text>
            {showFormSaving ? t`Saving...` : t`Saved!`}
          </Callout.Text>
        </Callout.Root>
      ) : null}
      {/* TODO: add profile public/private toggle here */}
      {/* TODO: add profile picture upload here */}

      <Text as="p" mb="1">
        <Text as="label" htmlFor={`${a11yId}-name`} size="2">
          <Trans>Full Name</Trans> <span aria-label="required">*</span>
        </Text>
      </Text>
      <TextField.Root
        name="full_name"
        defaultValue={profile.full_name}
        placeholder={t`Your full name`}
        type="text"
        required
        autoComplete="name"
        id={`${a11yId}-name`}
      />

      <Text as="p" mt="4" mb="1">
        <Text as="label" htmlFor={`${a11yId}-nickname`} size="2">
          <Trans>Nickname</Trans>
        </Text>
      </Text>
      <TextField.Root
        name="nickname"
        defaultValue={profile.nickname ?? ""}
        placeholder={t`What people call you`}
        type="text"
        autoComplete="name"
        id={`${a11yId}-nickname`}
      />

      <Text as="p" mt="4" mb="1">
        <Text as="label" htmlFor={`${a11yId}-school`} size="2">
          <Trans>School</Trans>
        </Text>
      </Text>
      <TextField.Root
        name="school"
        defaultValue={profile.school ?? ""}
        placeholder={t`Your school name`}
        type="text"
        id={`${a11yId}-school`}
      />

      <Text as="p" mt="4" mb="1">
        <Text as="label" htmlFor={`${a11yId}-bio`} size="2">
          <Trans>Biography</Trans>
        </Text>
      </Text>
      <TextArea
        name="bio"
        defaultValue={profile.bio ?? ""}
        placeholder={t`Born in 〇〇.`}
        id={`${a11yId}-bio`}
      />
    </form>
  );
}
