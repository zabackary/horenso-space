import { defaultDataIdFromObject, HttpLink } from "@apollo/client";
import { InMemoryCache } from "@apollo/client-integration-nextjs";

export const cache = new InMemoryCache({
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

export const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`,
});
