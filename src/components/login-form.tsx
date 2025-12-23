"use client";

import { revalidateRoot } from "@/actions/auth";
import { createClient } from "@/lib/supabase/client";
import { Trans, useLingui } from "@lingui/react/macro";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Button, Callout, Flex, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface LoginFormProps {
  next?: string;
}

export function LoginForm(props: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<
    "google" | "github" | "email" | null
  >(null);
  const router = useRouter();
  const { t } = useLingui();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading("email");
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      await revalidateRoot();
      if (props.next) {
        router.push(props.next);
      } else {
        router.push("/app");
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(null);
    }
  };

  const handleOauthLogin = async (provider: "google" | "github") => {
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
      setError(error instanceof Error ? error.message : "An error occurred");
      setIsLoading(null);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Flex direction="column" gap="2" my="4">
        <Flex direction="row" gap="2" align="stretch" justify="center">
          <Button
            variant="outline"
            onClick={() => handleOauthLogin("google")}
            loading={isLoading === "google"}
            type="button"
          >
            <Trans>Sign in with Google</Trans>
          </Button>
          <Button
            variant="outline"
            onClick={() => handleOauthLogin("github")}
            loading={isLoading === "github"}
            type="button"
          >
            <Trans>Sign in with GitHub</Trans>
          </Button>
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
          placeholder={t({
            id: "common.email",
            message: "Email",
          })}
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
          placeholder={t({
            id: "common.password",
            message: "Password",
          })}
        />
        <Button type="submit" loading={isLoading === "email"}>
          <Trans>Login</Trans>
        </Button>
      </Flex>
    </form>
  );
}
