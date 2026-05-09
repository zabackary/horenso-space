import { Box, Theme } from "@radix-ui/themes";
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

function transformTemplate<T>(y: T) {
  if (typeof y === "number") {
    if (y < -window.innerHeight) {
      // Stretch animation
      return `scaleY(${1 + (Math.abs(y + window.innerHeight) / window.innerHeight) * 0.5}) translate3d(0, 0%, 0)`;
    }
    return `translate3d(0, calc(100% + ${y}px), 0)`;
  } else {
    return `translate3d(0, calc(100% + ${y}), 0)`;
  }
}

function Content({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerContent>) {
  return (
    <Theme asChild>
      <DrawerContent
        {...props}
        className={clsx(styles.content, className)}
        transformTemplate={transformTemplate}
      >
        <Box className={styles["content-inner"]}>{children}</Box>
      </DrawerContent>
    </Theme>
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
