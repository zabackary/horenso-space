"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
