import { Box, Heading, Text } from "@radix-ui/themes";
import { MeTabNav } from "../layout";

export default function LoginSettingsPage() {
  return (
    <>
      <MeTabNav active="login" />
      <Box p="4">
        <Heading as="h2">Login & Authentication</Heading>
        <Text>
          You can manage OAuth providers and reset your password here.
        </Text>
      </Box>
    </>
  );
}
