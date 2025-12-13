import { Heading, Link as RadixLink, Text } from "@radix-ui/themes";
import type { Metadata } from "next";
import Link from "next/link";
import { RedirectType, redirect } from "next/navigation";
import type { PropsWithChildren } from "react";
import { LoginForm } from "@/components/login-form";
import getProfile from "@/lib/auth/getProfile";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Login",
};

interface LoginPageSearchParams {
  next?: string;
}

export default async function LoginPage(
  props: PropsWithChildren<{ searchParams: Promise<LoginPageSearchParams> }>,
) {
  const supabase = await createClient();
  const profile = await getProfile(supabase);
  if (profile) {
    // redirect user to the app if they are already signed in
    redirect("/app", RedirectType.replace);
  }

  const searchParams = await props.searchParams;
  const next = searchParams.next;

  return (
    <>
      <Heading as="h1" size="7" align="center">
        Welcome back
      </Heading>
      <Text as="p" size="3" my="2" align="center">
        Let&apos;s get you logged in to your account.
      </Text>
      <LoginForm next={next} />
      <Text color="gray" align="center" as="p">
        Don&apos;t have an account yet?{" "}
        <RadixLink asChild>
          <Link
            href={
              next
                ? `/auth/sign-up?next=${encodeURIComponent(next)}`
                : "/auth/sign-up"
            }
          >
            Sign up
          </Link>
        </RadixLink>
      </Text>
      <Text color="gray" align="center" as="p">
        <RadixLink asChild>
          <Link href="/auth/forgot-password">Forgot password</Link>
        </RadixLink>
      </Text>
    </>
  );
}
