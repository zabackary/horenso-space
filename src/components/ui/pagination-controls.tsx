import { Trans } from "@lingui/react/macro";
import { Button, Flex, Text } from "@radix-ui/themes";
import type { ReactNode } from "react";

export type PaginationControlsProps = {
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  label?: ReactNode;
};

export default function PaginationControls({
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
  label,
}: PaginationControlsProps) {
  if (!hasPrevious && !hasNext) return null;

  return (
    <Flex align="center" justify="between" gap="3" width="100%">
      <Text size="2" color="gray">
        {label}
      </Text>
      <Flex gap="2">
        <Button variant="soft" onClick={onPrevious} disabled={!hasPrevious}>
          <Trans>Previous</Trans>
        </Button>
        <Button variant="soft" onClick={onNext} disabled={!hasNext}>
          <Trans>Next</Trans>
        </Button>
      </Flex>
    </Flex>
  );
}
