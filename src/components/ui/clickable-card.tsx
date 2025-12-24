import { Card, CardProps } from "@radix-ui/themes";
import styles from "./clickable-card.module.css";

export default function ClickableCard({
  className,
  children,
  asChild = false,
  ...props
}: CardProps) {
  return (
    <Card {...props} className={`${styles.clickableCard} ${className}`} asChild>
      {asChild ? children : <button>{children}</button>}
    </Card>
  );
}
