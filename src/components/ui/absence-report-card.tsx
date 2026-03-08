import { FragmentType, getFragmentData, gql } from "@/gql";
import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { Avatar, Badge, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import ClickableCard from "./clickable-card";

export const AbsenceReportCardFragment = gql(`
  fragment AbsenceReportCard on AbsenceReports {
    id
    date
    createdAt

    assignedToRole: roles {
      name
    }

    reviews: absenceReportReviewsCollection {
      edges {
        node {
          id
        }
      }
    }
    
    event {
      id
      title
      startTime
      endTime
    }
    user {
      fullName
      avatarUrl
    }

    status: absenceReportsStatusCollection {
      edges {
        node {
          isApproved
        }
      }
    }
  }
`);

export interface AbsenceReportCardProps {
  report: FragmentType<typeof AbsenceReportCardFragment>;
  href?: string;
}

export default function AbsenceReportCard({
  report: reportFragment,
  href,
}: AbsenceReportCardProps) {
  const report = getFragmentData(AbsenceReportCardFragment, reportFragment);
  const { t, i18n } = useLingui();

  const approved = report.status?.edges[0]?.node.isApproved ?? null;

  const inner = (
    <Flex direction="row" gap="2">
      <Avatar
        size="2"
        src={report.user?.avatarUrl ?? undefined}
        alt={report.user?.fullName}
        fallback={report.user?.fullName.charAt(0).toUpperCase() || "?"}
      />
      <Flex direction="column" gap="2">
        <Flex direction="column" gap="1">
          <Text weight="bold">
            {report.event?.title ??
              (report.date && i18n.date(report.date)) ??
              t`No event`}
            {/* Show event date if present */}
            {report.event?.startTime && report.event?.endTime ? (
              <>
                {" "}
                <Badge size="1" color="blue">
                  {i18n.date(report.event.startTime, {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}{" "}
                  -{" "}
                  {i18n.date(report.event.endTime, {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </Badge>
              </>
            ) : null}
          </Text>
          <Text size="2">
            <Trans>Submitted by</Trans>{" "}
            {report.user?.fullName ?? <Trans>Unknown</Trans>}
          </Text>
          {report.createdAt && (
            <Text size="1" color="gray">
              <Trans>
                Submitted at{" "}
                {i18n.date(report.createdAt, {
                  dateStyle: "long",
                  timeStyle: "long",
                })}
              </Trans>
            </Text>
          )}
        </Flex>
        <Flex justify="between" align="center">
          <Text size="2">
            <Trans>Assigned to</Trans>{" "}
            {report.assignedToRole?.name || <Trans>Unassigned</Trans>}
          </Text>
        </Flex>
      </Flex>
      <Flex flexGrow="1" />
      <Flex gap="2">
        {(report.reviews?.edges.length ?? 0) > 0 && (
          <Badge size="1" color="gray">
            <Plural
              value={report.reviews?.edges.length ?? 0}
              one="# review"
              other="# reviews"
            />
          </Badge>
        )}
        <Badge
          size="1"
          color={approved === null ? "gray" : approved ? "green" : "red"}
        >
          {approved === null
            ? t`Pending`
            : approved
              ? t`Approved`
              : t`Rejected`}
        </Badge>
      </Flex>
    </Flex>
  );

  if (href) {
    return (
      <ClickableCard asChild>
        <Link href={href}>{inner}</Link>
      </ClickableCard>
    );
  }

  return <Card>{inner}</Card>;
}
