"use client";

import { usePathname, useRouter } from "next/navigation";

export function buildCalendarPath(
  pathname: string,
  year: number,
  month?: number,
  day?: number,
) {
  const segments = pathname.split("/");
  const pathPrefix = segments
    .slice(0, segments.indexOf("calendar") + 1)
    .join("/");
  let path = `${pathPrefix}/${year}`;
  if (month) path += `/${month.toString().padStart(2, "0")}`;
  if (day) path += `/${day.toString().padStart(2, "0")}`;
  return path;
}

export default function useNavigateToDate() {
  const path = usePathname();
  const router = useRouter();
  return (year: number, month?: number, day?: number) => {
    const to = buildCalendarPath(path, year, month, day);
    router.push(to);
  };
}
