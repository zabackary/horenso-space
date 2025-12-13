import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./home-card.module.css";

export interface HomeCardProps {
  title: ReactNode;
  description: ReactNode;
  href: string;
  action?: {
    label: ReactNode;
    href: string;
  };
}

export default function HomeCard({
  title,
  description,
  href,
  action,
}: HomeCardProps) {
  return (
    <Card variant="surface" className={styles.card}>
      <Flex direction="column" gap="2" height="100%">
        <Flex direction="row" align="center" gap="2" flexGrow="1">
          <Flex direction="column" gap="2" flexGrow="1" asChild>
            <Link href={href} className={styles.link}>
              <Heading>{title}</Heading>
              <Text>{description}</Text>
            </Link>
          </Flex>
          <Button asChild variant="soft" size="4">
            <Link href={href}>
              <ArrowRightIcon />
            </Link>
          </Button>
        </Flex>
        {action && (
          <Button asChild variant="surface" size="3">
            <Link href={action.href}>{action.label}</Link>
          </Button>
        )}
      </Flex>
    </Card>
  );
}
