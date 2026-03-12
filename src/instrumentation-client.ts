// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import { createClient } from "./lib/supabase/client";

Sentry.init({
  dsn: "https://87da66d67ac9ff09433369fbd8201e9f@o4510833382916096.ingest.us.sentry.io/4510833384488960",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
  // Enable logs to be sent to Sentry
  enableLogs: true,
  // Send console.error and console.warn messages to Sentry
  integrations: [
    Sentry.captureConsoleIntegration({
      levels: ["error", "warn"],
    }),
  ],

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  enabled: process.env.NODE_ENV === "production",
});

Sentry.lazyLoadIntegration("feedbackIntegration")
  .then((feedbackIntegration) => {
    Sentry.addIntegration(
      feedbackIntegration({
        autoInject: false,
        showBranding: false,
      }),
    );
  })
  .catch(() => {
    // this can happen if e.g. a network error occurs,
    // in this case User Feedback will not be enabled
  });

createClient()
  .auth.getSession()
  .then(({ data }) => {
    const user = data?.session?.user;
    if (user) {
      Sentry.setUser({
        id: user.id,
        email: user.email,
      });
    }
  });

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
