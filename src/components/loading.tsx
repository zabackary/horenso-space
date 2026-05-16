import { Flex, Heading, Skeleton, Spinner } from "@radix-ui/themes";

export function FullPageLoading() {
  return (
    <Flex justify="center" align="center" flexGrow="1" p="4">
      <Spinner size="3" />
    </Flex>
  );
}

export interface ListLoadingProps {
  withHeading?: boolean;
  cards?: boolean;
  num?: number;
}

export function ListLoading({
  p = "4",
  withHeading = true,
  cards = false,
  num = 3,
  ...props
}: ListLoadingProps & React.ComponentPropsWithoutRef<typeof Flex>) {
  return (
    <Flex
      justify="start"
      align="start"
      flexGrow="1"
      p={p}
      direction="column"
      gap="3"
      width="100%"
      {...props}
    >
      {withHeading && (
        <Skeleton>
          <Heading size="3">Heading name</Heading>
        </Skeleton>
      )}
      {new Array(num)
        .fill(0)
        .map((_, index) =>
          cards ? (
            <Skeleton key={index} width="100%" height="120px" />
          ) : (
            <Skeleton key={index} width="100%" height="60px" />
          ),
        )}
    </Flex>
  );
}
