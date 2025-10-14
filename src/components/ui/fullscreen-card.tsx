import { Box, Card, Flex } from "@radix-ui/themes";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./fullscreen-card.module.css";

export interface FullscreenCardProps extends ComponentPropsWithoutRef<"div"> {
  navigationButton?: ReactNode;
}

export function FullscreenCard({
  navigationButton,
  ...props
}: FullscreenCardProps) {
  return (
    <Flex
      direction="column"
      className={styles.container}
      align="center"
      {...props}
    >
      <Box className={styles["card-wrapper"]}>
        {navigationButton}
        <Card className={styles.card}>{props.children}</Card>
      </Box>
    </Flex>
  );
}
