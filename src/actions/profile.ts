"use server";

import { createClient } from "@/lib/supabase/server";

export async function gravatarUpdateAction(): Promise<
  | {
      error: {
        message: string;
        code:
          | "USER_FETCH_ERROR"
          | "UNAUTHORIZED"
          | "NO_EMAIL"
          | "GRAVATAR_NOT_FOUND"
          | "PROFILE_UPDATE_ERROR"
          | "UNEXPECTED_ERROR";
      };
      data?: never;
    }
  | {
      data: { newAvatarUrl: string };
      error?: never;
    }
> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user:", userError);
      return {
        error: { message: userError.message, code: "USER_FETCH_ERROR" },
      };
    }

    if (!user) {
      return {
        error: { message: "Unauthorized", code: "UNAUTHORIZED" },
      };
    }

    const email = user.email;

    if (!email) {
      return {
        error: { message: "User does not have an email", code: "NO_EMAIL" },
      };
    }

    const emailBuffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(email),
    );
    const gravatarHash = Array.from(new Uint8Array(emailBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    const gravatarUrl = `https://www.gravatar.com/avatar/${gravatarHash}?s=200&d=404`;

    // Check if the Gravatar exists by making a HEAD request
    const response = await fetch(gravatarUrl, { method: "HEAD" });
    if (!response.ok) {
      return {
        error: {
          message: "No Gravatar found for this email.",
          code: "GRAVATAR_NOT_FOUND",
        },
      };
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: gravatarUrl })
      .eq("id", user.id);

    if (updateError) {
      console.error("Error updating profile with Gravatar URL:", updateError);
      return {
        error: { message: updateError.message, code: "PROFILE_UPDATE_ERROR" },
      };
    }

    return {
      data: {
        newAvatarUrl: `${gravatarUrl}&t=${Math.floor(Math.random() * 10000)}`,
      },
    };
  } catch (error) {
    console.error("Unexpected error during Gravatar update:", error);
    return {
      error: {
        message: error instanceof Error ? error.message : "Unknown error",
        code: "UNEXPECTED_ERROR",
      },
    };
  }
}
