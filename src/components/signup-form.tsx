"use client";

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
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      const { error } = await supabase.auth.signUp({
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
    <>
      <Heading as="h1" size="7" align="center">
        Welcome!
      </Heading>
      <Text as="p" size="3" my="2" align="center">
        Sign up to get started.
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
          <TextField.Root
            id="confirm-password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
          />
          <Button type="submit" loading={isLoading}>
            Sign up
          </Button>
        </Flex>
        <Text color="gray" align="center" as="p">
          Already have an account?{" "}
          <RadixLink asChild>
            <Link href="/auth/login">Login</Link>
          </RadixLink>
        </Text>
      </form>
    </>
  );
}
