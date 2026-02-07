"use client";

import {
  ApolloClient,
  ApolloNextAppProvider,
} from "@apollo/client-integration-nextjs";
import { SetContextLink } from "@apollo/client/link/context";
import { createClient } from "../supabase/client";
import { cache, httpLink } from "./shared";

const authLink = new SetContextLink(async ({ headers }, _) => {
  const supabase = createClient();
  const token = (await supabase.auth.getSession()).data.session?.access_token;
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
      apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY ?? "",
    },
  };
});

function makeClient() {
  return new ApolloClient({
    cache,
    link: authLink.concat(httpLink),
  });
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
