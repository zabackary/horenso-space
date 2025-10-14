import { Box, Card, Flex } from "@radix-ui/themes";
import { ComponentPropsWithoutRef } from "react";
import styles from "./fullscreen-card.module.css";

export function FullscreenCard({ ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <Flex
      direction="column"
      className={styles.container}
      align="center"
      {...props}
    >
      <Box className={styles["card-wrapper"]}>
        <Card className={styles.card}>{props.children}</Card>
      </Box>
    </Flex>
  );
}
