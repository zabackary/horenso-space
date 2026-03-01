import { useEffect, useState } from "react";
import { createClient } from "../supabase/client";

export default function useAbsenceReportStatus(reportId: string) {
  const [status, setStatus] = useState<
    "approved" | "rejected" | "pending" | null
  >(null);

  const client = createClient();
  useEffect(() => {
    const controller = new AbortController();
    async function fetchStatus() {
      const { data, error } = await client
        .rpc("absence_reports_is_approved", {
          p_report_id: reportId,
        })
        .abortSignal(controller.signal);
      if (error) {
        if (error.message.includes("aborted")) {
          // Ignore abort errors
          return;
        }
        console.error("Error fetching report status:", error);
        return;
      }
      setStatus(
        data === true ? "approved" : data === false ? "rejected" : "pending",
      );
    }
    fetchStatus();
    return () => {
      controller.abort();
    };
  }, [reportId, client]);

  return status;
}
