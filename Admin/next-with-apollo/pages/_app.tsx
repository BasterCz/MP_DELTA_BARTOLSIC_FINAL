import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useApollo } from "../lib/apollo";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { isParams, setPageMode } from "../extensions/extensions";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const router = useRouter().query;
  setPageMode(isParams(router, "menu"));
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;
