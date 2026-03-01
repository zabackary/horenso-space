"use client";

import AbsenceFormRenderer from "@/components/absence-form-renderer";
import { FragmentType, getFragmentData, gql } from "@/gql";
import useAbsenceReportStatus from "@/lib/absences/useAbsenceReportStatus";
import { Trans } from "@lingui/react/macro";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Badge,
  Callout,
  Card,
  DataList,
  Flex,
  Heading,
  Separator,
  Skeleton,
  Text,
} from "@radix-ui/themes";

export const AbsenceReportDetailFragment = gql(`
  fragment AbsenceReportDetail on absence_reports {
    id
    date
    created_at
    data

    assigned_to_role: roles {
      name
    }
    form: absence_report_forms {
      id
      name
      questions 
    }

    reviews: absence_report_reviewsCollection {
      edges {
        node {
          id
          created_at
          accepted
          comments
          reviewer: profiles {
            full_name
          }
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

export interface ReportDetailProps {
  report: FragmentType<typeof AbsenceReportDetailFragment>;
}

export default function ReportDetail({
  report: reportFragment,
}: ReportDetailProps) {
  const report = getFragmentData(AbsenceReportDetailFragment, reportFragment);
  const reviews = report?.reviews?.edges ?? [];

  const approvalStatus = useAbsenceReportStatus(report.id);

  return (
    <Flex direction="column" gap="4" flexGrow="1">
      {approvalStatus ? (
        <Callout.Root
          color={
            approvalStatus === "approved"
              ? "green"
              : approvalStatus === "rejected"
                ? "red"
                : "yellow"
          }
        >
          {approvalStatus === "approved" && (
            <>
              <Callout.Icon>
                <CheckCircledIcon />
              </Callout.Icon>
              <Callout.Text>
                <Trans>Absence is approved</Trans>
              </Callout.Text>
            </>
          )}
          {approvalStatus === "rejected" && (
            <>
              <Callout.Icon>
                <CrossCircledIcon />
              </Callout.Icon>
              <Callout.Text>
                <Trans>Absence is rejected</Trans>
              </Callout.Text>
            </>
          )}
          {approvalStatus === "pending" && (
            <Callout.Text>
              <Trans>The report is pending review</Trans>
            </Callout.Text>
          )}
        </Callout.Root>
      ) : (
        <Skeleton>
          <Callout.Root>
            <Callout.Text>
              <Trans>Loading report status...</Trans>
            </Callout.Text>
          </Callout.Root>
        </Skeleton>
      )}

      <Heading size="4" as="h3">
        <Trans>Report Details</Trans>
      </Heading>

      <DataList.Root>
        <DataList.Item>
          <DataList.Label>
            <Trans>Submitted by</Trans>
          </DataList.Label>
          <DataList.Value>
            <Avatar
              size="2"
              src={report.user?.avatar_url || undefined}
              alt={report.user?.full_name}
              fallback={report.user?.full_name?.charAt(0)?.toUpperCase() || "?"}
            />{" "}
            {report.user?.full_name}
          </DataList.Value>
        </DataList.Item>

        <DataList.Item>
          <DataList.Label>
            <Trans>Event</Trans>
          </DataList.Label>
          <DataList.Value>
            {report.event?.title || <Trans>No event</Trans>}
          </DataList.Value>
        </DataList.Item>

        {report.event?.start_time && (
          <DataList.Item>
            <DataList.Label>
              <Trans>Event date</Trans>
            </DataList.Label>
            <DataList.Value>
              {new Date(report.event.start_time).toLocaleString()}
            </DataList.Value>
          </DataList.Item>
        )}

        <DataList.Item>
          <DataList.Label>
            <Trans>Assigned to</Trans>
          </DataList.Label>
          <DataList.Value>
            {report.assigned_to_role?.name || <Trans>Unassigned</Trans>}
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>

      <Separator size="4" />

      <div>
        <Heading size="3" mb="2" as="h4">
          <Trans>Form Responses</Trans>
        </Heading>
        {report.form?.questions ? (
          report.data && Object.keys(report.data).length > 0 ? (
            <AbsenceFormRenderer
              form={JSON.parse(report.form.questions)}
              values={JSON.parse(report.data)}
            />
          ) : (
            <Text color="gray">
              <Trans>No additional data</Trans>
            </Text>
          )
        ) : (
          <Text color="gray">
            <Trans>No form associated with this report</Trans>
          </Text>
        )}
      </div>

      {reviews.length > 0 && (
        <>
          <Separator size="4" />
          <div>
            <Heading size="3" mb="2" as="h4">
              <Trans>Reviews</Trans>
            </Heading>
            <Flex direction="column" gap="2">
              {reviews.map((review) => (
                <Card key={review.node.id}>
                  <Flex direction="column" gap="2">
                    <Flex justify="between" align="center">
                      <Text weight="bold">
                        {review.node.reviewer?.full_name}
                      </Text>
                      <Badge
                        size="2"
                        color={review.node.accepted ? "green" : "red"}
                      >
                        {review.node.accepted ? (
                          <Trans>Accepted</Trans>
                        ) : (
                          <Trans>Rejected</Trans>
                        )}
                      </Badge>
                    </Flex>
                    {review.node.comments && (
                      <Text size="2">{review.node.comments}</Text>
                    )}
                    <Text size="1" color="gray">
                      {new Date(review.node.created_at).toLocaleString()}
                    </Text>
                  </Flex>
                </Card>
              ))}
            </Flex>
          </div>
        </>
      )}
    </Flex>
  );
}
