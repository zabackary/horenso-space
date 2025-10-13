import { Flex, Spinner } from "@radix-ui/themes";

export default function Loading() {
  return (
    <Flex align="center" justify="center">
      <Spinner size="3" />
    </Flex>
  );
}
