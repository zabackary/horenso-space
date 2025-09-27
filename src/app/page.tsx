import Image from "next/image";
import styles from "./page.module.css";
import { Button, Flex, Text } from "@radix-ui/themes";
import { AppHeader } from "@/components/ui/app-header";
import Link from "next/link";

export default function Home() {
  return (
    <Flex direction="column">
      <AppHeader>
        <h1>報連相SPACE</h1>
        <Button asChild>
          <Link href="/auth/login">Login</Link>
        </Button>
      </AppHeader>
    </Flex>
  );
}
