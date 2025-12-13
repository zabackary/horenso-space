"use client";

import { logout } from "@/actions/auth";
import { Profile } from "@/lib/auth/getProfile";
import { Avatar, Dialog, DropdownMenu, IconButton } from "@radix-ui/themes";
import Link from "next/dist/client/link";
import { lazy, useState } from "react";

const FeedbackForm = lazy(() => import("../feedback-form"));

export interface AppHeaderMenuProps {
  profile: Profile;
}

export function AppHeaderMenu({ profile }: AppHeaderMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="ghost">
            <Avatar
              src={profile.avatar_url ?? undefined}
              alt={profile.full_name}
              fallback={profile.full_name.charAt(0)}
            />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end" sideOffset={5} style={{ zIndex: 1 }}>
          <form style={{ display: "contents" }}>
            <DropdownMenu.Item asChild>
              <Link href="/app/users/me">Profile and Settings</Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => setIsOpen(true)}>
              Send Feedback
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item asChild>
              <button formAction={logout}>Logout</button>
            </DropdownMenu.Item>
          </form>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Content>
          <Dialog.Title>Send Feedback</Dialog.Title>
          <Dialog.Description>
            We appreciate your feedback to help us improve.
          </Dialog.Description>
          <FeedbackForm handleClose={() => setIsOpen(false)} />
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
