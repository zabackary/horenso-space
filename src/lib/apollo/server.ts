import { registerApolloClient } from "@apollo/client-integration-nextjs";
import { createClient } from "../supabase/server";
import { makeClient } from "./shared";

export const { getClient, query, PreloadQuery } = registerApolloClient(
  async () => {
    const client = await createClient();
    const token = (await client.auth.getSession()).data.session?.access_token;
    return makeClient(token);
  },
);
