import { SignupForm } from "@/components/signup-form";
import getProfile from "@/lib/auth/getProfile";
import { createClient } from "@/lib/supabase/server";
import { Heading, Link as RadixLink, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign up",
};

interface SignUpPageSearchParams {
  next?: string;
}

export default async function SignUpPage(
  props: React.PropsWithChildren<{
    searchParams: Promise<SignUpPageSearchParams>;
  }>
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
        Welcome!
      </Heading>
      <Text as="p" size="3" my="2" align="center">
        Sign up to get started.
      </Text>
      <SignupForm next={next} />
      <Text color="gray" align="center" as="p">
        Already have an account?{" "}
        <RadixLink asChild>
          <Link
            href={
              next
                ? `/auth/login?next=${encodeURIComponent(next)}`
                : "/auth/login"
            }
          >
            Login
          </Link>
        </RadixLink>
      </Text>
    </>
  );
}
