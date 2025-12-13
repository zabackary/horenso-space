import { LoginForm } from "@/components/login-form";
import getProfile from "@/lib/auth/getProfile";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { Trans } from "@lingui/react/macro";
import { Heading, Link as RadixLink, Text } from "@radix-ui/themes";
import type { Metadata } from "next";
import Link from "next/link";
import { RedirectType, redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Login",
};

interface LoginPageSearchParams {
  next?: string;
}

export default async function LoginPage(
  props: PropsWithChildren<{
    params: Promise<{ lang: string }>;
    searchParams: Promise<LoginPageSearchParams>;
  }>
) {
  const { lang } = await props.params;
  initLingui(lang);
  const supabase = await createClient();
  const profile = await getProfile(supabase);
  if (profile) {
    // redirect user to the app if they are already signed in
    redirect("/app", RedirectType.replace);
  }

  const searchParams = await props.searchParams;
  const next = searchParams.next;

  const createAccountLink = (
    <RadixLink asChild>
      <Link
        href={
          next
            ? `/auth/sign-up?next=${encodeURIComponent(next)}`
            : "/auth/sign-up"
        }
      >
        <Trans>Sign up</Trans>
      </Link>
    </RadixLink>
  );

  return (
    <>
      <Heading as="h1" size="7" align="center">
        <Trans id="login.welcome">Welcome back</Trans>
      </Heading>
      <Text as="p" size="3" my="2" align="center">
        <Trans id="login.subtitle">
          Let's get you logged in to your account
        </Trans>
      </Text>
      <LoginForm next={next} />
      <Text color="gray" align="center" as="p">
        <Trans id="login.noAccount">
          Don't have an account yet? {createAccountLink}
        </Trans>
      </Text>
      <Text color="gray" align="center" as="p">
        <RadixLink asChild>
          <Link href="/auth/forgot-password">
            <Trans id="login.forgotPassword">Forgot password</Trans>
          </Link>
        </RadixLink>
      </Text>
    </>
  );
}
