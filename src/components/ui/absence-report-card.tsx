import { FragmentType, getFragmentData, gql } from "@/gql";
import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { Avatar, Badge, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import ClickableCard from "./clickable-card";

export const AbsenceReportCardFragment = gql(`
  fragment AbsenceReportCard on absence_reports {
    id
    date
    created_at

    assigned_to_role: roles {
      name
    }

    reviews: absence_report_reviewsCollection {
      edges {
        node {
          id
        }
      }
    }
    
    event: calendar_events {
      id
      title
      start_time
      end_time
    }
    user: profiles {
      full_name
      avatar_url
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

  const inner = (
    <Flex direction="row" gap="2">
      <Avatar
        size="2"
        src={report.user?.avatar_url ?? undefined}
        alt={report.user?.full_name}
        fallback={report.user?.full_name.charAt(0).toUpperCase() || "?"}
      />
      <Flex direction="column" gap="2">
        <Flex direction="column" gap="1">
          <Text weight="bold">
            {report.event?.title ??
              (report.date && i18n.date(report.date)) ??
              t`No event`}
            {/* Show event date if present */}
            {report.event?.start_time && report.event?.end_time ? (
              <>
                {" "}
                <Badge size="1" color="blue">
                  {i18n.date(report.event.start_time, {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}{" "}
                  -{" "}
                  {i18n.date(report.event.end_time, {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </Badge>
              </>
            ) : null}
          </Text>
          <Text size="2">
            <Trans>Submitted by</Trans>{" "}
            {report.user?.full_name ?? <Trans>Unknown</Trans>}
          </Text>
          {report.created_at && (
            <Text size="1" color="gray">
              <Trans>
                Submitted at{" "}
                {i18n.date(report.created_at, {
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
            {report.assigned_to_role?.name || <Trans>Unassigned</Trans>}
          </Text>
          {(report.reviews?.edges.length ?? 0) > 0 && (
            <Flex gap="2">
              <Badge size="1" color="gray">
                <Plural
                  value={report.reviews?.edges.length ?? 0}
                  one="# review"
                  other="# reviews"
                />
              </Badge>
              {/* <Badge size="1" color={report.approved ? "green" : "red"}>
                {report.approved ? (
                  <Trans>Approved</Trans>
                ) : (
                  <Trans>Rejected</Trans>
                )}
              </Badge> */}
            </Flex>
          )}
        </Flex>
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
