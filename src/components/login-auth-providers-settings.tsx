"use client";

import {
  Box,
  Button,
  Callout,
  DataList,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import type { Provider, UserIdentity } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const OAUTH_NAME_PROVIDERS: Partial<Record<Provider, string>> = {
  google: "Google",
  github: "GitHub",
};

export default function LoginAuthProvidersSettings({
  identitiesPromise,
}: {
  identitiesPromise: Promise<UserIdentity[]>;
}) {
  const router = useRouter();
  const [linkingError, setLinkingError] = useState<string | null>(null);

  const [linking, setLinking] = useState<Provider | null>(null);
  const handleOauthLink = async (provider: Provider) => {
    setLinking(provider);
    const supabase = createClient();
    const { error } = await supabase.auth.linkIdentity({
      provider,
      options: {
        redirectTo: window.location.href,
      },
    });
    setLinking(null);
    if (error) {
      console.error("Error linking identity:", error.message);
      setLinkingError(error.message);
    }
  };

  const [unlinking, setUnlinking] = useState<Provider | null>(null);
  const handleOauthUnlink = async (identity: UserIdentity) => {
    setUnlinking(identity.provider as Provider);
    const supabase = createClient();
    const { error } = await supabase.auth.unlinkIdentity(identity);
    setUnlinking(null);
    if (error) {
      setLinkingError(error.message);
    } else {
      router.refresh();
    }
  };

  const [resetPasswordError, setResetPasswordError] = useState<string | null>(
    null,
  );
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState<
    boolean | null
  >(false);
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetPasswordSuccess(null);
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const newPassword = formData.get("newPassword") as string;
    const confirmNewPassword = formData.get("confirmNewPassword") as string;
    if (newPassword !== confirmNewPassword) {
      setResetPasswordError("Passwords do not match.");
      setResetPasswordSuccess(false);
      return;
    }
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) {
      console.error("Error updating password:", error.message);
      setResetPasswordError(error.message);
      setResetPasswordSuccess(false);
    } else {
      setResetPasswordError(null);
      setResetPasswordSuccess(true);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const error = searchParams.get("error");
    if (error) {
      setLinkingError(
        decodeURIComponent(
          searchParams.get("error_description") ||
            searchParams.get("error_code") ||
            "An error occurred.",
        ),
      );
      // Clean up the URL to remove error params
      router.replace(window.location.pathname);
    }
  }, []);

  const identities = use(identitiesPromise);

  return (
    <Flex direction="column" gap="4" align="start">
      <Heading as="h3">Password and login</Heading>
      <form onSubmit={handleResetPassword} style={{ display: "contents" }}>
        <Heading as="h4" size="3">
          Change password
        </Heading>
        {resetPasswordError && (
          <Callout.Root color="red">
            <Callout.Text>{resetPasswordError}</Callout.Text>
          </Callout.Root>
        )}
        {resetPasswordSuccess && (
          <Callout.Root color="green">
            <Callout.Text>Password updated successfully.</Callout.Text>
          </Callout.Root>
        )}
        <Text as="p">
          <Text as="label" htmlFor="newPassword" size="2">
            New Password
          </Text>
        </Text>
        <TextField.Root
          id="newPassword"
          name="newPassword"
          type="password"
          required
          placeholder="New password"
          style={{ width: "100%" }}
        />
        <Text as="p">
          <Text as="label" htmlFor="confirmNewPassword" size="2">
            Confirm new password
          </Text>
        </Text>
        <TextField.Root
          id="confirmNewPassword"
          name="confirmNewPassword"
          type="password"
          required
          placeholder="New password"
          style={{ width: "100%" }}
        />
        <Button type="submit" loading={resetPasswordSuccess === null}>
          Update password
        </Button>
      </form>
      <Heading as="h3">Login methods</Heading>
      {linkingError && (
        <Callout.Root color="red">
          <Callout.Text>{linkingError}</Callout.Text>
        </Callout.Root>
      )}
      <DataList.Root>
        {identities.length === 0 && <Box>No linked OAuth providers.</Box>}
        {identities.map((identity) => (
          <DataList.Item key={identity.id}>
            <DataList.Label title={identity.id}>
              {OAUTH_NAME_PROVIDERS[identity.provider as Provider] ||
              identity.provider === "email"
                ? "Email"
                : identity.provider}
            </DataList.Label>
            <DataList.Value>
              <Box>
                <Button
                  onClick={() => handleOauthUnlink(identity)}
                  loading={unlinking === (identity.provider as Provider)}
                >
                  Unlink
                </Button>
                <Text as="div" size="2" mt="2">
                  Last used:{" "}
                  {identity.last_sign_in_at
                    ? new Date(identity.last_sign_in_at).toLocaleString()
                    : "Never"}
                </Text>
              </Box>
            </DataList.Value>
          </DataList.Item>
        ))}
        {Object.keys(OAUTH_NAME_PROVIDERS).map((provider) => {
          if (!identities.find((id) => id.provider === provider)) {
            return (
              <DataList.Item key={provider}>
                <DataList.Label>
                  {OAUTH_NAME_PROVIDERS[provider as Provider] || provider}
                </DataList.Label>
                <DataList.Value>
                  <Button
                    onClick={() => handleOauthLink(provider as Provider)}
                    loading={linking === provider}
                  >
                    {linking === provider
                      ? "Linking..."
                      : `Link ${
                          OAUTH_NAME_PROVIDERS[provider as Provider] || provider
                        } account`}
                  </Button>
                </DataList.Value>
              </DataList.Item>
            );
          }
          return null;
        })}
      </DataList.Root>
    </Flex>
  );
}
