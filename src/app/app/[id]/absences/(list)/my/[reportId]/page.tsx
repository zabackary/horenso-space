import getProfile from "@/lib/auth/getProfile";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { Trans } from "@lingui/react/macro";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Flex, Heading, IconButton } from "@radix-ui/themes";
import Link from "next/link";
import getReports from "../../getReports";
import ReportDetail from "../../report-detail";

export default async function Page({
  params,
}: PageProps<"/app/[id]/absences/my/[reportId]">) {
  const { id, reportId } = await params;
  await initLingui();

  const supabase = await createClient();
  const profile = await getProfile(supabase);

  // Fetch the report with all related data
  const [report] = await getReports(supabase, {
    clubId: id,
    userId: profile!.id,
    reportId: reportId,
  });

  return (
    <Flex direction="column" gap="4" p="4" width="100%">
      <Flex direction="row" align="center" gap="2">
        <IconButton variant="soft" asChild>
          <Link href={`/app/${id}/absences/my`}>
            <ArrowLeftIcon />
          </Link>
        </IconButton>
        <Heading size="4" as="h2">
          <Trans>Report details</Trans>
        </Heading>
      </Flex>
      <ReportDetail report={report} clubId={id} />
    </Flex>
  );
}
