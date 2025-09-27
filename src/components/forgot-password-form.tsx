"use client";

import { createClient } from "@/lib/supabase/client";
import { Box, Button, Card, Flex, Text, TextField } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";

export function ForgotPasswordForm({
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
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
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxWidth="240px" {...props}>
      {success ? (
        <Card>
          <Text>Check Your Email</Text>
          <Text>Password reset instructions sent</Text>
          <Text>
            If you registered using your email and password, you will receive a
            password reset email.
          </Text>
        </Card>
      ) : (
        <Card>
          <Text>Reset your password</Text>
          <Text>
            Type in your email and we&apos;ll send you a link to reset your
            password
          </Text>
          <form onSubmit={handleForgotPassword}>
            <Flex direction="column" gap="4">
              <div className="grid gap-2">
                <TextField.Root
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                ></TextField.Root>
              </div>
              {error && <Text color="red">{error}</Text>}
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send reset email"}
              </Button>
            </Flex>
            <Text>
              Already have an account?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Login
              </Link>
            </Text>
          </form>
        </Card>
      )}
    </Box>
  );
}
