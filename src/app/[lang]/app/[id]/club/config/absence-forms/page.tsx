import AbsenceFormDetail from "@/components/club-config/absence-form-detail";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { Trans } from "@lingui/react/macro";
import { Button, Card, Flex, Heading, Spinner, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export default async function ClubAbsenceFormsPage({
  params,
}: PageProps<"/[lang]/app/[id]/club/config/absence-forms">) {
  const { id, lang } = await params;
  initLingui(lang);
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
          <Heading size="4">
            <Trans key="forms.empty">No templates yet</Trans>
          </Heading>
          <Text>
            <Trans key="forms.createFirst">
              Create your first absence report template
            </Trans>
          </Text>
          <Button asChild>
            <Link href={`/app/${id}/club/config/absence-forms/new`}>
              <Trans key="forms.createTemplate">Create template</Trans>
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
