import { Card, Text } from "@radix-ui/themes";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <Card>
      <h1>Sorry, something went wrong.</h1>
      {params?.error ? (
        <Text>Code error: {params.error}</Text>
      ) : (
        <Text>An unspecified error occurred.</Text>
      )}
    </Card>
  );
}
