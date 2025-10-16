"use client";

import { Profile } from "@/lib/auth/getProfile";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
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

  const handleShareProfile = () => {
    const profileUrl = `${window.location.origin}/app/users/${profile.id}`;
    const shareData = {
      title: `${profile.full_name}'s profile on Horenso Space`,
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
            console.error("Error sharing profile:", error);
            setShareError(
              error instanceof Error ? error.message : String(error)
            );
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
    });
  };

  return (
    <>
      <Flex gap="2">
        <Button variant="outline" size="2" onClick={handleShareProfile}>
          Share profile
        </Button>
        <Button variant="outline" size="2" onClick={handleCopyUserId}>
          Copy user ID
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
