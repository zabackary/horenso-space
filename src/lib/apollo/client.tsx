"use client";

import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs";
import { makeClient } from "./shared";

export function ApolloWrapper({
  initialServerToken,
  children,
}: {
  initialServerToken?: string;
  children: React.ReactNode;
}) {
  return (
    <ApolloNextAppProvider makeClient={() => makeClient(initialServerToken)}>
      {children}
    </ApolloNextAppProvider>
  );
}
