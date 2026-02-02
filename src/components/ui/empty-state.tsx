import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { ReactNode } from "react";
import styles from "./empty-state.module.css";

export interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  caption?: string;
  action?: {
    label: string;
    variant?: "soft" | "solid" | "outline";
    onClick: () => void;
  };
}

export default function EmptyState({
  icon,
  title,
  caption,
  action,
}: EmptyStateProps) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="3"
      className={styles.container}
    >
      <div className={styles.icon}>{icon}</div>
      <Flex direction="column" align="center" gap="1">
        <Heading size="4" align="center">
          {title}
        </Heading>
        {caption && (
          <Text size="2" color="gray" align="center">
            {caption}
          </Text>
        )}
      </Flex>
      {action && (
        <Button onClick={action.onClick} variant={action.variant ?? "soft"}>
          {action.label}
        </Button>
      )}
    </Flex>
  );
}
