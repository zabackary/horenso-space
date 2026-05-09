"use client";

import { logout } from "@/actions/auth";
import { Trans, useLingui } from "@lingui/react/macro";
import {
  ChatBubbleIcon,
  ExitIcon,
  GearIcon,
  HomeIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import {
  Avatar,
  Badge,
  Button,
  DropdownMenu,
  IconButton,
  Tooltip,
} from "@radix-ui/themes";
import * as Sentry from "@sentry/nextjs";
import Link from "next/link";

export interface AppHeaderMenuProps {
  profile: {
    fullName: string;
    avatarUrl?: string | null;
  };
  clubs: { name: string; id: string }[];
}

export function AppHeaderMenu({ profile, clubs }: AppHeaderMenuProps) {
  const { t } = useLingui();

  const handleReportBug = async () => {
    const feedback = Sentry.getFeedback();
    // TODO: get radix theming for CSS variables here
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
      {clubs ? (
        <DropdownMenu.Root>
          <Tooltip content={<Trans>Select a club</Trans>} style={{ zIndex: 1 }}>
            <DropdownMenu.Trigger>
              <Button size="3" variant="outline">
                <HomeIcon />
                <Badge>{clubs.length}</Badge>
              </Button>
            </DropdownMenu.Trigger>
          </Tooltip>
          <DropdownMenu.Content align="center" style={{ zIndex: 1 }}>
            <DropdownMenu.Item asChild>
              <Link href="/app">
                <Trans>Home</Trans>
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            {clubs.map((club) => (
              <DropdownMenu.Item asChild key={club.id}>
                <Link href={`/app/${club.id}`}>{club.name}</Link>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ) : (
        <Button asChild size="3" variant="outline">
          <Link href="/app/club/create">
            <Trans>Create a club</Trans>
          </Link>
        </Button>
      )}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="ghost">
            <Avatar
              src={profile.avatarUrl ?? undefined}
              alt={profile.fullName}
              fallback={profile.fullName.charAt(0).toUpperCase()}
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
