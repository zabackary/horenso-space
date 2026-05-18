import { Button, Flex, Text } from "@radix-ui/themes";

type PaginationControlsProps = {
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  label?: string;
};

export default function PaginationControls({
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  label,
}: PaginationControlsProps) {
  return (
    <Flex align="center" justify="between" gap="2" width="100%">
      <Text size="2" color="gray">
        {label}
      </Text>
      <Flex gap="2">
        <Button variant="soft" onClick={onPrevious} disabled={!hasPrevious}>
          Previous
        </Button>
        <Button variant="soft" onClick={onNext} disabled={!hasNext}>
          Next
        </Button>
      </Flex>
    </Flex>
  );
}
