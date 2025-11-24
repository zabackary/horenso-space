import { Box } from "@radix-ui/themes";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@vladyoslav/drawer";
import { clsx } from "clsx";
import styles from "./drawer.module.css";

function Overlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerOverlay>) {
  return (
    <DrawerOverlay {...props} className={clsx(styles.overlay, className)} />
  );
}

function Content({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerContent>) {
  return (
    <DrawerContent {...props} className={clsx(styles.content, className)}>
      <Box className={styles["content-inner"]}>{children}</Box>
    </DrawerContent>
  );
}

export const Drawer = {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Portal: DrawerPortal,
  Overlay,
  Content,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Close: DrawerClose,
};
