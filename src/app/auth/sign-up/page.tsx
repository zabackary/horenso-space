import { SignupForm } from "@/components/auth/signup-form";
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
  }>,
) {
  const { lang } = await props.params;
  await initLingui();
  const supabase = await createClient();
  if ((await supabase.auth.getClaims()).data?.claims.role === "authenticated") {
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
        <Trans>Welcome!</Trans>
      </Heading>
      <Text as="p" size="3" my="2" align="center">
        <Trans>Sign up to get started</Trans>
      </Text>
      <SignupForm next={next} />
      <Text color="gray" align="center" as="p">
        <Trans>Already have an account? {loginLink}</Trans>
      </Text>
    </>
  );
}
