"use client";

import { createClient } from "@/lib/supabase/client";
import {
  Button,
  Callout,
  Flex,
  Heading,
  Text,
  TextField,
  Link as RadixLink,
} from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthCard } from "./ui/auth-card";

export function LoginForm({ ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard {...props}>
      <Heading as="h1" size="7" align="center">
        Welcome back
      </Heading>
      <Text as="p" size="3" my="2" align="center">
        Let&apos;s get you logged in to your account.
      </Text>
      <form onSubmit={handleLogin}>
        <Flex direction="column" gap="2" my="4">
          {error && (
            <Callout.Root color="red">
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}
          <TextField.Root
            placeholder="Email"
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
            placeholder="Password"
          />
          <Button type="submit" loading={isLoading}>
            Login
          </Button>
        </Flex>
        <Text color="gray" align="center" as="p">
          Don&apos;t have an account yet?{" "}
          <RadixLink asChild>
            <Link href="/auth/sign-up">Sign up</Link>
          </RadixLink>
        </Text>
        <Text color="gray" align="center" as="p">
          <RadixLink asChild>
            <Link href="/auth/forgot-password">Forgot password</Link>
          </RadixLink>
        </Text>
      </form>
    </AuthCard>
  );
}
