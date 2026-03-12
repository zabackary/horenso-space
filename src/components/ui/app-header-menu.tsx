"use client";

import { logout } from "@/actions/auth";
import { Profile } from "@/lib/auth/getProfile";
import { Trans, useLingui } from "@lingui/react/macro";
import {
  ChatBubbleIcon,
  ExitIcon,
  GearIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import { Avatar, DropdownMenu, IconButton } from "@radix-ui/themes";
import * as Sentry from "@sentry/nextjs";
import Link from "next/link";

export interface AppHeaderMenuProps {
  profile: Profile;
}

export function AppHeaderMenu({ profile }: AppHeaderMenuProps) {
  const { t } = useLingui();

  const handleReportBug = async () => {
    const feedback = Sentry.getFeedback();
    const dialog = await feedback?.createForm({
      formTitle: t`Report a bug`,
      submitButtonLabel: t`Send bug report`,
      cancelButtonLabel: t`Cancel`,
      confirmButtonLabel: t`Confirm`,
      addScreenshotButtonLabel: t`Add a screenshot`,
      removeScreenshotButtonLabel: t`Remove screenshot`,
      nameLabel: t`Name`,
      namePlaceholder: t`Your name`,
      emailLabel: t`Email`,
      emailPlaceholder: t`your.email@example.org`,
      isRequiredLabel: t`(required)`,
      messageLabel: t`Description`,
      messagePlaceholder: t`What's the bug? What did you expect?`,
      successMessageText: t`Thank you for your report!`,
      highlightToolText: t`Highlight`,
      hideToolText: t`Hide`,
      removeHighlightText: t`Remove`,
    });
    if (dialog) {
      dialog.appendToDom();
      dialog.open();
    }
  };

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="ghost">
            <Avatar
              src={profile.avatar_url ?? undefined}
              alt={profile.full_name}
              fallback={profile.full_name.charAt(0).toUpperCase()}
            />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end" sideOffset={5} style={{ zIndex: 1 }}>
          <form style={{ display: "contents" }}>
            <DropdownMenu.Item asChild>
              <Link href="/app/users/me">
                <GearIcon />
                <Trans>Profile and settings</Trans>
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild>
              <Link href="/docs">
                <QuestionMarkCircledIcon />
                <Trans>Help center</Trans>
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => handleReportBug()}>
              <ChatBubbleIcon />
              <Trans>Report bug</Trans>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item asChild>
              <button formAction={logout}>
                <ExitIcon />
                <Trans>Log out</Trans>
              </button>
            </DropdownMenu.Item>
          </form>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
}
