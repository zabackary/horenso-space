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
  "canDeleteOwnReport",
  "canDeleteAnyReport",
] as const;

export function PermissionText({
  permissionKey,
}: {
  permissionKey: (typeof PERMISSION_KEYS)[number];
}) {
  switch (permissionKey) {
    case "canManageClub": {
      return <Trans>Manage club</Trans>;
    }
    case "canReadCalendar": {
      return <Trans>View club calendar events</Trans>;
    }
    case "canWriteCalendar": {
      return <Trans>Create and edit calendar events</Trans>;
    }
    case "canReadAllReports": {
      return <Trans>View all absence reports</Trans>;
    }
    case "canWriteReportReview": {
      return <Trans>Review and respond to absence reports</Trans>;
    }
    case "canWriteOwnReport": {
      return <Trans>Submit absence reports</Trans>;
    }
    case "canReadFiles": {
      return <Trans>Access club files</Trans>;
    }
    case "canWriteFiles": {
      return <Trans>Upload and manage club files</Trans>;
    }
    case "canDeleteOwnReport": {
      return <Trans>Delete own absence reports</Trans>;
    }
    case "canDeleteAnyReport": {
      return <Trans>Delete any absence report</Trans>;
    }
    default: {
      console.error("Unknown permission key:", permissionKey);
      return permissionKey;
    }
  }
}
