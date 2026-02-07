"use client";

import { revalidateRoot } from "@/actions/auth";
import { createClient } from "@/lib/supabase/client";
import { Trans, useLingui } from "@lingui/react/macro";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Button, Callout, Flex, Text, TextField } from "@radix-ui/themes";
import { Provider } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { OauthProviderName, SUPPORTED_OAUTH_PROVIDERS } from "./providers";

export interface SignupFormProps {
  next?: string;
}

export function SignupForm(props: SignupFormProps) {
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<Provider | "email" | null>(null);
  const router = useRouter();
  const { t } = useLingui();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading("email");
    setError(null);

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      // At this point there should be a profile created by the DB trigger
      if (user) {
        const { error } = await supabase
          .from("profiles")
          .update({
            full_name: fullName,
          })
          .eq("id", user.id);
        if (error) {
          console.warn("Failed to update full name:", error);
        }
      }
      revalidateRoot();
      if (props.next) {
        router.push(props.next);
      } else {
        router.push("/app");
      }
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? t`An error occurred while signing up: ${error.message}`
          : t`An error occurred.`,
      );
    } finally {
      setIsLoading(null);
    }
  };

  const handleOauthLogin = async (provider: Provider) => {
    const supabase = createClient();
    setIsLoading(provider);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,

        options: {
          redirectTo: props.next
            ? `${
                window.location.origin
              }/auth/callback?next=${encodeURIComponent(props.next)}`
            : `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? t`An error occurred while signing up: ${error.message}`
          : t`An error occurred.`,
      );
      setIsLoading(null);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Flex direction="column" gap="2" my="4">
        <Flex direction="row" gap="2" align="stretch" justify="center">
          {SUPPORTED_OAUTH_PROVIDERS.map((provider) => (
            <Button
              variant="outline"
              onClick={() => handleOauthLogin(provider)}
              loading={isLoading === provider}
              type="button"
              key={provider}
            >
              <Trans>
                Sign up with <OauthProviderName provider={provider} />
              </Trans>
            </Button>
          ))}
        </Flex>
        {error && (
          <Callout.Root color="red">
            <Callout.Icon>
              <CrossCircledIcon />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <TextField.Root
          placeholder={t`Email`}
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField.Root
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t`Password`}
        />
        <TextField.Root
          id="confirm-password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder={t`Confirm Password`}
        />
        <TextField.Root
          placeholder={t`Full Name`}
          required
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Text size="1" color="gray" as="p">
          <Trans>
            Your full name will not be shared with people outside of your clubs
            unless you choose to at a later time.
          </Trans>
        </Text>
        <Button type="submit" loading={isLoading === "email"}>
          <Trans>Sign up</Trans>
        </Button>
      </Flex>
    </form>
  );
}
