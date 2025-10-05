import { Box, Card, Flex } from "@radix-ui/themes";
import styles from "./auth-card.module.css";
import { AppHeader } from "./app-header";
import { ComponentPropsWithoutRef } from "react";

export function AuthCard({ ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <Flex
      direction="column"
      className={styles.container}
      align="center"
      {...props}
    >
      <AppHeader />
      <Box className={styles["card-wrapper"]}>
        <Card className={styles.card}>{props.children}</Card>
      </Box>
    </Flex>
  );
}
