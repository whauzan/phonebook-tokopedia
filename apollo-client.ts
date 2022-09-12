import {
  ApolloClient,
  createHttpLink,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";

import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: "ws://phonebook-tokopedia.hasura.app/v1/graphql",
          connectionParams: {
            headers: {
              "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_SECRET!,
            },
          },
        }),
      )
    : new HttpLink({
        uri: "https://phonebook-tokopedia.hasura.app/v1/graphql",
        credentials: "same-origin",
        headers: {
          "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_SECRET!,
        },
      });

const httpLink = new HttpLink({
  uri: "https://phonebook-tokopedia.hasura.app/v1/graphql",
  credentials: "same-origin",
  headers: {
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_SECRET!,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  ssrMode: typeof window === "undefined",
  cache: new InMemoryCache(),
});

export default client;
