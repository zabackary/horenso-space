"use client";

import { ListLoading } from "@/components/loading";
import AbsenceReportCard, {
  AbsenceReportCardFragment,
} from "@/components/ui/absence-report-card";
import EmptyState from "@/components/ui/empty-state";
import { FragmentType } from "@/gql";
import { useLingui } from "@lingui/react/macro";
import { FileTextIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import { Suspense } from "react";

type AbsenceReportListProps = {
  reports: {
    fragment: FragmentType<typeof AbsenceReportCardFragment>;
    id: string;
  }[];
  clubId: string;
  linkPathPrefix: string;
};

export default function AbsenceReportList({
  reports,
  clubId,
  linkPathPrefix,
}: AbsenceReportListProps) {
  const { t } = useLingui();
  return (
    <Suspense fallback={<ListLoading withHeading={false} cards={true} />}>
      <Flex direction="column" gap="3" width="100%">
        {reports.length <= 0 ? (
          <EmptyState icon={<FileTextIcon />} title={t`No absence reports`} />
        ) : (
          reports.map((report) => (
            <AbsenceReportCard
              report={report.fragment}
              href={`/app/${clubId}/${linkPathPrefix}/${report.id}`}
            />
          ))
        )}
      </Flex>
    </Suspense>
  );
}
