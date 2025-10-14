"use server";

import getProfile from "@/lib/auth/getProfile";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/dist/client/components/navigation";

export async function joinClub(clubId: string) {
  const supabase = await createClient();
  const profile = await getProfile(supabase);
  if (!profile) {
    redirect("/login");
  }

  try {
    await supabase
      .from("club_members")
      .update({ accepted: true })
      .eq("user_id", profile.id)
      .eq("club_id", clubId)
      .throwOnError();
  } catch (error) {
    console.error("Failed to join club:", error);
    redirect("?error");
  }

  redirect(`/app/${clubId}`);
}
