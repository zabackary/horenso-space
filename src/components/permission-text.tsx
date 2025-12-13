import { Trans } from "@lingui/react/macro";

export const PERMISSION_KEYS = [
  "canWriteFiles",
  "canReadFiles",
  "canWriteOwnReport",
  "canReadAllReports",
  "canWriteReportReview",
  "canWriteCalendar",
  "canReadCalendar",
  "canManageClub",
] as const;

export function PermissionText({
  permissionKey,
}: {
  permissionKey: (typeof PERMISSION_KEYS)[number];
}) {
  switch (permissionKey) {
    case "canManageClub": {
      return <Trans id="permissions.manageClub">Manage club</Trans>;
    }
    case "canReadCalendar": {
      return (
        <Trans id="permissions.readCalendar">View club calendar events</Trans>
      );
    }
    case "canWriteCalendar": {
      return (
        <Trans id="permissions.writeCalendar">
          Create and edit calendar events
        </Trans>
      );
    }
    case "canReadAllReports": {
      return (
        <Trans id="permissions.readAllReports">View all absence reports</Trans>
      );
    }
    case "canWriteReportReview": {
      return (
        <Trans id="permissions.writeReportReview">
          Review and respond to absence reports
        </Trans>
      );
    }
    case "canWriteOwnReport": {
      return (
        <Trans id="permissions.writeOwnReport">Submit absence reports</Trans>
      );
    }
    case "canReadFiles": {
      return <Trans id="permissions.readFiles">Access club files</Trans>;
    }
    case "canWriteFiles": {
      return (
        <Trans id="permissions.writeFiles">Upload and manage club files</Trans>
      );
    }
  }
}
