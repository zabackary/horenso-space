import { Trans } from "@lingui/react/macro";
import { Card, Heading, Text } from "@radix-ui/themes";

export default async function Page({
  params: paramsPromise,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ error: string }>;
}) {
  const { lang } = await paramsPromise;
  const params = await searchParams;

  return (
    <Card>
      <Heading as="h1">
        <Trans key="error.heading">Something went wrong</Trans>
      </Heading>
      {params?.error ? (
        <Text>
          <Trans key="error.code">Error code:</Trans> {params.error}
        </Text>
      ) : (
        <Text>
          <Trans key="error.unspecified">An unspecified error occurred</Trans>
        </Text>
      )}
    </Card>
  );
}
