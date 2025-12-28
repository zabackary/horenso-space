"use client";

import { createClient } from "@/lib/supabase/client";
import { Trans, useLingui } from "@lingui/react/macro";
import {
  Box,
  Button,
  Callout,
  Card,
  DataList,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import type { Provider, UserIdentity } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { OauthProviderName, SUPPORTED_OAUTH_PROVIDERS } from "./providers";

export default function LoginAuthProvidersSettings({
  identitiesPromise,
}: {
  identitiesPromise: Promise<UserIdentity[]>;
}) {
  const { i18n, t } = useLingui();

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
      setLinkingError(t`Error linking identity: ${error.message}`);
    }
  };

  const [unlinking, setUnlinking] = useState<Provider | null>(null);
  const handleOauthUnlink = async (identity: UserIdentity) => {
    setUnlinking(identity.provider as Provider);
    const supabase = createClient();
    const { error } = await supabase.auth.unlinkIdentity(identity);
    setUnlinking(null);
    if (error) {
      setLinkingError(t`Error unlinking identity: ${error.message}`);
    } else {
      router.refresh();
    }
  };

  const [resetPasswordError, setResetPasswordError] = useState<string | null>(
    null
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
      setResetPasswordError(t`Passwords do not match.`);
      setResetPasswordSuccess(false);
      return;
    }
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) {
      console.error("Error updating password:", error.message);
      setResetPasswordError(t`Error updating password: ${error.message}`);
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
            t`An error occurred.`
        )
      );
      // Clean up the URL to remove error params
      router.replace(window.location.pathname);
    }
  }, []);

  const identities = use(identitiesPromise);

  return (
    <Flex direction="column" gap="4" align="start">
      <Heading as="h3" size="4">
        <Trans>Password and login</Trans>
      </Heading>
      <Card asChild>
        <Flex direction="column" gap="2" width="100%" align="start" asChild>
          <form
            onSubmit={handleResetPassword}
            style={{
              display: "flex",
            }}
          >
            <Heading as="h4" size="3">
              <Trans>Change password</Trans>
            </Heading>
            {resetPasswordError && (
              <Callout.Root color="red">
                <Callout.Text>{resetPasswordError}</Callout.Text>
              </Callout.Root>
            )}
            {resetPasswordSuccess && (
              <Callout.Root color="green">
                <Callout.Text>
                  <Trans>Password updated successfully.</Trans>
                </Callout.Text>
              </Callout.Root>
            )}
            <Text as="p">
              <Text as="label" htmlFor="newPassword" size="2">
                <Trans>New Password</Trans>
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
                <Trans>Confirm new password</Trans>
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
            <Button
              type="submit"
              loading={resetPasswordSuccess === null}
              variant="soft"
            >
              <Trans>Update password</Trans>
            </Button>
          </form>
        </Flex>
      </Card>
      <Heading as="h3" size="4">
        <Trans>Login methods</Trans>
      </Heading>
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
              <OauthProviderName provider={identity.provider as Provider} />
            </DataList.Label>
            <DataList.Value>
              <Box>
                <Button
                  onClick={() => handleOauthUnlink(identity)}
                  loading={unlinking === (identity.provider as Provider)}
                  variant="soft"
                >
                  <Trans>Unlink account</Trans>
                </Button>
                <Text as="div" size="2" mt="2">
                  {identity.last_sign_in_at ? (
                    <Trans>
                      Last used{" "}
                      {i18n.date(identity.last_sign_in_at, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </Trans>
                  ) : (
                    <Trans>Never used</Trans>
                  )}
                </Text>
              </Box>
            </DataList.Value>
          </DataList.Item>
        ))}
        {SUPPORTED_OAUTH_PROVIDERS.map((provider) => {
          if (!identities.find((id) => id.provider === provider)) {
            return (
              <DataList.Item key={provider}>
                <DataList.Label>
                  <OauthProviderName provider={provider} />
                </DataList.Label>
                <DataList.Value>
                  <Button
                    onClick={() => handleOauthLink(provider as Provider)}
                    loading={linking === provider}
                    variant="soft"
                  >
                    <Trans>
                      Link <OauthProviderName provider={provider} /> account
                    </Trans>
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
