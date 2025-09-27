import { Box, Flex } from "@radix-ui/themes";

export function AppHeader({ children }: React.PropsWithChildren) {
  return (
    <header style={{ display: "contents" }}>
      <Flex as="div" p="4" align="center" justify="between">
        {children}
      </Flex>
    </header>
  );
}
