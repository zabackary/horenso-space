import { Box, Heading, Text } from "@radix-ui/themes";
import { MeTabNav } from "../layout";

export default function ProfileSettingsPage() {
  return (
    <>
      <MeTabNav active="profile" />
      <Box p="4">
        <Heading as="h2">Profile</Heading>
        <Text>Edit your display name, bio, and avatar in this section.</Text>
      </Box>
    </>
  );
}
