"use client";

import AbsenceFormRenderer from "@/components/absence-form-renderer";
import { FragmentType, getFragmentData, gql } from "@/gql";
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
  Text,
} from "@radix-ui/themes";

export const AbsenceReportDetailFragment = gql(`
  fragment AbsenceReportDetail on AbsenceReports {
    id
    date
    createdAt
    data

    assignedToRole: roles {
      name
    }
    form: form {
      id
      name
      questions 
    }

    reviews: absenceReportReviewsCollection  {
      edges {
        node {
          id
          createdAt
          accepted
          comments
          reviewer {
            fullName
          }
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

export interface ReportDetailProps {
  report: FragmentType<typeof AbsenceReportDetailFragment>;
}

export default function ReportDetail({
  report: reportFragment,
}: ReportDetailProps) {
  const report = getFragmentData(AbsenceReportDetailFragment, reportFragment);
  const reviews = report?.reviews?.edges ?? [];

  const isApproved = report.status?.edges[0]?.node.isApproved ?? null;

  return (
    <Flex direction="column" gap="4" flexGrow="1">
      <Callout.Root
        color={isApproved ? "green" : isApproved === false ? "red" : "yellow"}
      >
        {isApproved === true && (
          <>
            <Callout.Icon>
              <CheckCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              <Trans>Absence is approved</Trans>
            </Callout.Text>
          </>
        )}
        {isApproved === false && (
          <>
            <Callout.Icon>
              <CrossCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              <Trans>Absence is rejected</Trans>
            </Callout.Text>
          </>
        )}
        {isApproved === null && (
          <Callout.Text>
            <Trans>The report is pending review</Trans>
          </Callout.Text>
        )}
      </Callout.Root>

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
              src={report.user?.avatarUrl || undefined}
              alt={report.user?.fullName}
              fallback={report.user?.fullName?.charAt(0)?.toUpperCase() || "?"}
            />{" "}
            {report.user?.fullName}
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

        {report.event?.startTime && (
          <DataList.Item>
            <DataList.Label>
              <Trans>Event date</Trans>
            </DataList.Label>
            <DataList.Value>
              {new Date(report.event.startTime).toLocaleString()}
            </DataList.Value>
          </DataList.Item>
        )}

        <DataList.Item>
          <DataList.Label>
            <Trans>Assigned to</Trans>
          </DataList.Label>
          <DataList.Value>
            {report.assignedToRole?.name || <Trans>Unassigned</Trans>}
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
                        {review.node.reviewer?.fullName}
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
                      {new Date(review.node.createdAt).toLocaleString()}
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
