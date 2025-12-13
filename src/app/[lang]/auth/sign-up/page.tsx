import { SignupForm } from "@/components/signup-form";
import getProfile from "@/lib/auth/getProfile";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { Trans } from "@lingui/react/macro";
import { Heading, Link as RadixLink, Text } from "@radix-ui/themes";
import type { Metadata } from "next";
import Link from "next/link";
import { RedirectType, redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign up",
};

interface SignUpPageSearchParams {
  next?: string;
}

export default async function SignUpPage(
  props: React.PropsWithChildren<{
    params: Promise<{ lang: string }>;
    searchParams: Promise<SignUpPageSearchParams>;
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

  const loginLink = (
    <RadixLink asChild>
      <Link
        href={
          next ? `/auth/login?next=${encodeURIComponent(next)}` : "/auth/login"
        }
      >
        <Trans>Log in</Trans>
      </Link>
    </RadixLink>
  );

  return (
    <>
      <Heading as="h1" size="7" align="center">
        <Trans key="signup.welcome">Welcome!</Trans>
      </Heading>
      <Text as="p" size="3" my="2" align="center">
        <Trans key="signup.subtitle">Sign up to get started</Trans>
      </Text>
      <SignupForm next={next} />
      <Text color="gray" align="center" as="p">
        <Trans key="signup.haveAccount">
          Already have an account? {loginLink}
        </Trans>
      </Text>
    </>
  );
}
