"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/dist/client/components/navigation";

export async function joinClub(invitationId: string) {
  const supabase = await createClient();
  if ((await supabase.auth.getClaims()).data?.claims.role !== "authenticated") {
    redirect("/login");
  }

  try {
    await supabase
      .rpc("invitations_accept", { invitation_id: invitationId })
      .throwOnError();
  } catch (error) {
    console.error("Failed to join club:", error);
    redirect("?error");
  }

  redirect(`/app/`);
}
