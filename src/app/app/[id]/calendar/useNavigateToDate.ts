"use client";

import { usePathname, useRouter } from "next/navigation";

export default function useNavigateToDate() {
  const path = usePathname();
  // Extract the year/month/day from the path
  const segments = path.split("/");
  const pathPrefix = segments
    .slice(0, segments.indexOf("calendar") + 1)
    .join("/");
  const router = useRouter();
  return (year: number, month?: number, day?: number) => {
    let path = `${pathPrefix}/${year}`;
    if (month) path += `/${month.toString().padStart(2, "0")}`;
    if (day) path += `/${day.toString().padStart(2, "0")}`;
    router.push(path);
  };
}
