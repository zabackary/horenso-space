"use client";

import type { Profile } from "@/lib/auth/getProfile";
import { Trans, useLingui } from "@lingui/react/macro";
import { AlertDialog, Button, Flex, VisuallyHidden } from "@radix-ui/themes";
import { useState } from "react";

export interface UserShareActionsProps {
  profile: Profile;
}

export default function UserShareActions({ profile }: UserShareActionsProps) {
  const [shareSuccessOpen, setShareSuccessOpen] = useState(false);
  const [shareSuccessWasClipboard, setShareSuccessWasClipboard] =
    useState(false);
  const [shareErrorOpen, setShareErrorOpen] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  const { t } = useLingui();

  const handleShareProfile = () => {
    const profileUrl = `${window.location.origin}/app/users/${profile.id}`;
    const shareData = {
      title: `${profile.fullName}'s profile on Horenso Space`,
      url: profileUrl,
    };
    const shareViaClipboard = async () => {
      try {
        await navigator.clipboard.writeText(profileUrl);
        setShareSuccessOpen(true);
        setShareSuccessWasClipboard(true);
      } catch (error) {
        console.error("Failed to copy profile URL:", error);
        setShareError(error instanceof Error ? error.message : String(error));
        setShareErrorOpen(true);
      }
    };
    const shareViaWebShare = () => {
      if ("share" in navigator && navigator.canShare(shareData)) {
        navigator
          .share(shareData)
          .then(() => {
            setShareSuccessOpen(true);
            setShareSuccessWasClipboard(false);
          })
          .catch((error) => {
            if (error.name === "AbortError") {
              // User cancelled the share, do nothing
              return;
            }
            console.error("Error sharing profile:", error);
            const message =
              error instanceof Error ? error.message : String(error);
            setShareError(t`Failed to share profile: ${message}`);
            setShareErrorOpen(true);
          });
      } else {
        shareViaClipboard();
      }
    };
    shareViaWebShare();
  };

  const handleCopyUserId = () => {
    const userId = profile.id;
    navigator.clipboard.writeText(userId).catch((error) => {
      console.error("Failed to copy user ID:", error);
      const message = error instanceof Error ? error.message : String(error);
      setShareError(t`Failed to copy to clipboard: ${message}`);
      setShareErrorOpen(true);
    });
  };

  return (
    <>
      <Flex gap="2">
        <Button variant="outline" size="2" onClick={handleShareProfile}>
          <Trans>Share profile</Trans>
        </Button>
        <Button variant="outline" size="2" onClick={handleCopyUserId}>
          <Trans>Copy user ID</Trans>
        </Button>
      </Flex>
      <AlertDialog.Root
        open={shareSuccessOpen}
        onOpenChange={setShareSuccessOpen}
      >
        <AlertDialog.Content maxWidth="400px">
          <AlertDialog.Title>
            Profile shared{shareSuccessWasClipboard ? " to clipboard" : ""}
          </AlertDialog.Title>
          <VisuallyHidden>
            <AlertDialog.Description>
              {shareSuccessWasClipboard
                ? t`The profile URL has been copied to your clipboard.`
                : t`Your system share dialog should have opened.`}
            </AlertDialog.Description>
          </VisuallyHidden>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Action>
              <Button
                onClick={() => {
                  setShareSuccessOpen(false);
                }}
              >
                OK
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={shareErrorOpen} onOpenChange={setShareErrorOpen}>
        <AlertDialog.Content maxWidth="400px">
          <AlertDialog.Title>Failed to share profile</AlertDialog.Title>
          <AlertDialog.Description size="2">
            {shareError || "An unknown error occurred."}
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Action>
              <Button
                onClick={() => {
                  setShareErrorOpen(false);
                }}
              >
                OK
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}
