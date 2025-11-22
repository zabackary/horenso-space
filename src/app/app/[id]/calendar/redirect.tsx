"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function CalendarRedirect({ id }: { id: string }) {
  useEffect(() => {
    const date = new Date();
    const pathname = `/app/${
      window.location.pathname.split("/")[2]
    }/calendar/${date.getFullYear()}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    redirect(pathname);
  }, []);
  return null;
}
