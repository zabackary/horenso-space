import {
  ApolloClient,
  registerApolloClient,
} from "@apollo/client-integration-nextjs";
import { SetContextLink } from "@apollo/client/link/context";
import { createClient } from "../supabase/server";
import { cache, httpLink } from "./shared";

const authLink = new SetContextLink(async ({ headers }, _) => {
  const supabase = await createClient();
  const token = (await supabase.auth.getSession()).data.session?.access_token;
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
      apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY ?? "",
    },
  };
});

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache,
    link: authLink.concat(httpLink),
  });
});
