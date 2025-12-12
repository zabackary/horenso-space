"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  // revalidate the root path to update the auth state
  revalidatePath("/", "layout");
  // redirect the user to home
  redirect("/");
}

export async function revalidateRoot() {
  revalidatePath("/", "layout");
}
