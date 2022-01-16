import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useApollo } from "../lib/apollo";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { isParams, setPageMode } from "../extensions/extensions";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const router = useRouter().query;
  setPageMode(isParams(router, "menu"));
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=3"/>
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;
