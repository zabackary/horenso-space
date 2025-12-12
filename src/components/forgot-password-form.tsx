"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import { createClient } from "@/lib/supabase/client";
import {
  Button,
  Callout,
  Flex,
  Heading,
  Link as RadixLink,
  Text,
  TextField,
} from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";

export function ForgotPasswordForm({
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { t } = useTranslation("auth");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : t("common:error"));
    } finally {
      setIsLoading(false);
    }
  };

  return success ? (
    <>
      <Heading as="h1" size="7" align="center">
        {t("checkEmail")}
      </Heading>
      <Text as="p" size="3" my="2" align="center">
        {t("resetEmailSent")}
      </Text>
      <Text as="p" align="center">
        {t("resetEmailInfo")}
      </Text>
    </>
  ) : (
    <>
      <Heading as="h1" size="7" align="center">
        {t("resetPassword")}
      </Heading>
      <Text as="p" size="3" my="2" align="center">
        {t("resetPasswordDescription")}
      </Text>
      <form onSubmit={handleForgotPassword}>
        <Flex direction="column" gap="2" my="4">
          {error && (
            <Callout.Root color="red">
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}
          <TextField.Root
            placeholder={t("email")}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          ></TextField.Root>
          <Button type="submit" loading={isLoading}>
            {t("sendResetEmail")}
          </Button>
        </Flex>
        <Text align="center" color="gray" as="p">
          {t("alreadyHaveAccount")}{" "}
          <RadixLink asChild>
            <Link href="/auth/login" className="underline underline-offset-4">
              {t("login")}
            </Link>
          </RadixLink>
        </Text>
      </form>
    </>
  );
}
