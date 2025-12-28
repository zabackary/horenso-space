"use client";
import { Trans } from "@lingui/react/macro";
import type { Provider } from "@supabase/supabase-js";

export const SUPPORTED_OAUTH_PROVIDERS: Provider[] = ["google", "github"];

export function OauthProviderName({
  provider,
}: {
  provider: Provider | "email";
}) {
  switch (provider) {
    case "google":
      return <Trans>Google</Trans>;
    case "github":
      return <Trans>GitHub</Trans>;
    case "email":
      return <Trans>Email</Trans>;
    default:
      return <>{provider}</>;
  }
}
