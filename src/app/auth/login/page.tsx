import {
  Button,
  Flex,
  Heading,
  Link as RadixLink,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Metadata } from "next";
import Link from "next/link";
import { login } from "./actions";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <>
      <Heading as="h1" size="7" align="center">
        Welcome back
      </Heading>
      <Text as="p" size="3" my="2" align="center">
        Let&apos;s get you logged in to your account.
      </Text>
      <form>
        <Flex direction="column" gap="2" my="4">
          {/* {error && (
            <Callout.Root color="red">
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )} */}
          <TextField.Root
            placeholder="Email"
            required
            type="email"
            name="email"
          />
          <TextField.Root
            id="password"
            type="password"
            required
            name="password"
            placeholder="Password"
          />
          <Button type="submit" formAction={login}>
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
    </>
  );
}
