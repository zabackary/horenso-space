"use client";

import AbsenceFormRenderer from "@/components/absence-form-renderer";
import { FragmentType, getFragmentData, gql } from "@/gql";
import { useMutation } from "@apollo/client/react";
import { Trans, useLingui } from "@lingui/react/macro";
import {
  ArrowLeftIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  Avatar,
  Badge,
  Callout,
  Card,
  DataList,
  Flex,
  Heading,
  IconButton,
  Separator,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

const AbsenceReportDeleteMutation = gql(`
  mutation AbsenceReportDelete($reportId: UUID!) {
    deleteFromAbsenceReportsCollection(atMost: 1, filter:  {
       id: {
        eq: $reportId
       }
    }) {
      affectedCount
    }
  }
`);

export interface ReportDetailProps {
  report: FragmentType<typeof AbsenceReportDetailFragment>;
  backUrl?: string;
  canDelete?: boolean;
}

export default function ReportDetail({
  report: reportFragment,
  backUrl,
  canDelete,
}: ReportDetailProps) {
  const { t } = useLingui();

  const report = getFragmentData(AbsenceReportDetailFragment, reportFragment);
  const reviews = report?.reviews?.edges ?? [];

  const isApproved = report.status?.edges[0]?.node.isApproved ?? null;

  const router = useRouter();
  const handleBackNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    router.back();
  };

  const [deleteAbsenceReport] = useMutation(AbsenceReportDeleteMutation);

  const handleDeleteReport = () => {
    if (
      confirm(
        t`Are you sure you want to delete this report? This action cannot be undone.`,
      )
    ) {
      deleteAbsenceReport({
        variables: {
          reportId: report.id,
        },
      })
        .then(() => {
          router.back();
        })
        .catch((error) => {
          console.error("Failed to delete report:", error);
          alert(t`Failed to delete the report. Please try again.`);
        });
    }
  };

  return (
    <Flex direction="column" gap="4" p="4" width="100%">
      <Flex direction="row" align="center" gap="2">
        {backUrl ? (
          <IconButton variant="soft" asChild>
            <Link href={backUrl} onClick={handleBackNavigation}>
              <ArrowLeftIcon />
            </Link>
          </IconButton>
        ) : null}
        <Heading size="4" as="h2">
          <Trans>Report details</Trans>
        </Heading>
        <Flex flexGrow="1" />
        {canDelete && (
          <Tooltip content={t`Delete report`}>
            <IconButton
              variant="soft"
              color="red"
              size="3"
              onClick={handleDeleteReport}
            >
              <TrashIcon />
            </IconButton>
          </Tooltip>
        )}
      </Flex>
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
                fallback={
                  report.user?.fullName?.charAt(0)?.toUpperCase() || "?"
                }
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
    </Flex>
  );
}
