import AbsenceFormDetail from "@/components/club-config/absence-form-detail";
import { createClient } from "@/lib/supabase/server";
import { Button, Card, Flex, Heading, Spinner, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export default async function ClubAbsenceFormsPage({
  params,
}: PageProps<"/[lang]/app/[id]/club/config/absence-forms">) {
  const { id } = await params;
  const supabase = await createClient();

  const forms =
    (
      await supabase
        .from("absence_report_forms")
        .select("id, name, questions, updated_at")
        .eq("club_id", id)
        .order("created_at", { ascending: true })
    ).data ?? [];

  if (forms.length === 0) {
    // Create a placeholder UI prompting to create a template; keep creation in dedicated action for clarity.
    return (
      <Card>
        <Flex direction="column" gap="3">
          <Heading size="4">No templates yet</Heading>
          <Text>Create your first absence report template.</Text>
          <Button asChild>
            <Link href={`/app/${id}/club/config/absence-forms/new`}>
              Create template
            </Link>
          </Button>
        </Flex>
      </Card>
    );
  }

  // Redirect UX: show first form detail by default.
  const first = forms[0];
  return (
    <React.Suspense fallback={<Spinner />}>
      {/* Render first form inline when visiting base route */}
      {/* Server component to client detail keeps behavior consistent */}
      {/* Note: Sidebar links are in the layout */}
      <AbsenceFormDetail initial={first as any} clubId={id} />
    </React.Suspense>
  );
}
