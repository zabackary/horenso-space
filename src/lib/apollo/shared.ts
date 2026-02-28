import { defaultDataIdFromObject, HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs";
import { SetContextLink } from "@apollo/client/link/context";
import { createClient } from "../supabase/client";

/**
 * Gets the access token for the current user. In a server environment, the
 * token must be passed from the server component as an argument, since there is
 * no access to the server-supplied cookies in this shared file and in SSR.
 *
 * @param initialServerToken The initial token, but supplied from the server cookies
 * @returns The access token, if avaliable
 */
export async function getAccessToken(initialServerToken?: string) {
  if (typeof window === "undefined" && initialServerToken) {
    // server env, return the token passed from the server component
    return initialServerToken;
  }
  // browser env
  const browserClient = createClient();
  const token = (await browserClient.auth.getSession()).data.session
    ?.access_token;
  return token;
}

const authLink = (initialServerToken?: string) =>
  new SetContextLink(async ({ headers }, _) => {
    const token = await getAccessToken(initialServerToken);
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
        apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY ?? "",
      },
    };
  });

export function makeClient(initialServerToken?: string) {
  return new ApolloClient({
    cache: makeCache(),
    link: authLink(initialServerToken).concat(makeHttpLink()),
  });
}

export function makeCache() {
  return new InMemoryCache({
    dataIdFromObject(responseObject) {
      if ("nodeId" in responseObject) {
        return `${responseObject.nodeId}`;
      }
      return defaultDataIdFromObject(responseObject);
    },
    // possibleTypes: { Node: ['Todos'] }, // optional, but useful to specify supertype-subtype relationships
    typePolicies: {
      Query: {
        fields: {
          // todosCollection: relayStylePagination(), // example of paginating a collection
          node: {
            read(_, { args, toReference }) {
              const ref = toReference({
                nodeId: args?.nodeId,
              });
              return ref;
            },
          },
        },
      },
    },
  });
}

export function makeHttpLink() {
  return new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`,
  });
}
