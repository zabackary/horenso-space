import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { Flex } from "@radix-ui/themes";

export default function Page() {
  return (
    <Flex justify="center" align="center" height="100vh">
      <ForgotPasswordForm />
    </Flex>
  );
}
