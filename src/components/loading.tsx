import { Flex, Heading, Skeleton, Spinner } from "@radix-ui/themes";

export function FullPageLoading() {
  return (
    <Flex justify="center" align="center" flexGrow="1" p="4">
      <Spinner size="3" />
    </Flex>
  );
}

export function ListLoading() {
  return (
    <Flex
      justify="start"
      align="start"
      flexGrow="1"
      p="4"
      direction="column"
      gap="3"
    >
      <Skeleton>
        <Heading size="3">Heading name</Heading>
      </Skeleton>
      {new Array(3).fill(0).map((_, index) => (
        <Skeleton key={index} width="100%" height="60px" />
      ))}
    </Flex>
  );
}
