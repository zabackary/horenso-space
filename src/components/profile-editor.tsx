"use client";

import { gravatarUpdateAction } from "@/actions/profile";
import type { Profile } from "@/lib/auth/getProfile";
import { useDebounceCallback } from "@/lib/debounce";
import { createClient } from "@/lib/supabase/client";
import { Trans, useLingui } from "@lingui/react/macro";
import { CheckCircledIcon, Pencil1Icon } from "@radix-ui/react-icons";
import {
  Avatar,
  Button,
  Callout,
  Flex,
  Spinner,
  Text,
  TextArea,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import { use, useId, useState } from "react";

import { GravatarQuickEditorCore } from "@gravatar-com/quick-editor";

export default function ProfileEditor({
  profilePromise,
}: {
  profilePromise: Promise<Profile>;
}) {
  const a11yId = useId();
  const { t, i18n } = useLingui();

  const profile = use(profilePromise);

  const [showFormSaving, setShowFormSaving] = useState<boolean | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
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
        setFormError(t`Error updating profile.`);
      } else {
        setShowFormSaving(false);
        setTimeout(() => setShowFormSaving(null), 2000);
      }
    })();
  }, 1000);
  const handleFormUpdate = (event: React.FormEvent) => {
    setShowFormSaving(true);
    setFormError(null);
    debounceFormUpdate(event);
  };

  const [profilePicture, setProfilePicture] = useState(() => profile.avatarUrl);
  const handleGravatarChange = () => {
    if (!profile.user.email) {
      setFormError(
        t`You don't have an email with your account. Add one in your login settings first.`,
      );
      return;
    }
    const quickEditorCore = new GravatarQuickEditorCore({
      email: profile.user.email,
      scope: ["avatars"],
      onClosed: () => {
        setShowFormSaving(true);
        setTimeout(async () => {
          // Wait a moment to ensure that Gravatar has processed the update before fetching the new avatar URL
          await handleGravatarUpdate(true);
        }, 1000);
      },
      locale: i18n.locale,
    });
    quickEditorCore.open();
  };
  const handleGravatarUpdate = async (showError: boolean = true) => {
    setShowFormSaving(true);
    setFormError(null);

    const { data, error } = await gravatarUpdateAction();
    if (error) {
      console.error("Error updating Gravatar:", error);
      let message: string;
      switch (error.code) {
        case "USER_FETCH_ERROR":
          message = t`Failed to fetch user information. Please try again.`;
          break;
        case "UNAUTHORIZED":
          message = t`You are not authorized to perform this action.`;
          break;
        case "NO_EMAIL":
          message = t`You don't have an email with your account. Add one in your login settings first.`;
          break;
        case "GRAVATAR_NOT_FOUND":
          message = t`No Gravatar found for your email. Upload a profile picture to Gravatar using that email then try again.`;
          break;
        case "PROFILE_UPDATE_ERROR":
          message = t`Failed to update profile with Gravatar. Please try again.`;
          break;
        case "UNEXPECTED_ERROR":
          message = t`An unexpected error occurred. Please try again.`;
          break;
        default:
          const _exhaustiveCheck: never = error.code;
          message = "";
      }
      if (showError) setFormError(message);
      setShowFormSaving(null);
    } else {
      setProfilePicture(data.newAvatarUrl);
      setShowFormSaving(false);
    }
  };

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
      {formError ? (
        <Callout.Root my="2" variant="soft" color="red">
          <Callout.Text>{formError}</Callout.Text>
        </Callout.Root>
      ) : null}
      {/* TODO: add profile public/private toggle here */}

      <Text as="p" mb="1">
        <Text as="label" htmlFor={`${a11yId}-pfp`} size="2">
          <Trans>Profile Picture</Trans>
        </Text>
      </Text>
      <Flex direction="column" align="start" gap="2">
        <Avatar
          src={profilePicture ?? undefined}
          alt={t`Profile picture of ${profile.fullName}`}
          fallback={profile.fullName[0]}
          size="5"
        />
        <Flex align="center" gap="2">
          <Button
            variant="outline"
            size="2"
            id={`${a11yId}-pfp`}
            onClick={handleGravatarChange}
            type="button"
          >
            <Pencil1Icon />
            <Trans>Edit</Trans>
          </Button>
          {profile.user.email && (
            <Button
              variant="outline"
              size="2"
              onClick={() => handleGravatarUpdate()}
              type="button"
            >
              <Trans>Use Gravatar for {profile.user.email}</Trans>
            </Button>
          )}
        </Flex>
        <Text as="p" size="2" color="gray">
          <Trans>
            Profile pictures on Horenso SPACE are managed with Gravatar. Update
            your profile picture on Gravatar then click "Use Gravatar". If you
            created your account with certain SNS services{" "}
            <Tooltip
              content={
                <Trans>
                  Profile pictures from Google accounts with the "only show my
                  profile picture to people I interact with" setting enabled may
                  not be visible.
                </Trans>
              }
            >
              <span
                style={{
                  textDecoration: "underline",
                  textDecorationStyle: "dotted",
                }}
              >
                such as Google
              </span>
            </Tooltip>
            , your profile picture may have been set automatically.
          </Trans>
        </Text>
      </Flex>

      <Text as="p" mb="1">
        <Text as="label" htmlFor={`${a11yId}-name`} size="2">
          <Trans>Full Name</Trans> <span aria-label="required">*</span>
        </Text>
      </Text>
      <TextField.Root
        name="full_name"
        defaultValue={profile.fullName}
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
