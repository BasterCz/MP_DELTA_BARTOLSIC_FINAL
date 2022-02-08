import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useApollo } from "../lib/apollo";
import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import NavLayout from "../components/layouts/navLayout";

type SelectedType = "feed" | "search" | "library";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const router = useRouter();

  const [maximized, setMaximized] = useState(true);
  const [selected, setSelected] = useState<SelectedType>("feed");
  useEffect(()=>{
    setSelected(router.pathname.substring(router.pathname.lastIndexOf('/') + 1) as SelectedType);
  },[router.pathname])

  const handlerMenuClick = () => {
    setMaximized(!maximized);
  };
  const handlerChangeSelected = (input: SelectedType) => {
    setSelected(input);
  };


  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=3"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@500&family=Kanit:wght@800&family=Kanit:wght@600&family=Varela+Round&display=swap" rel="stylesheet"/>
      </Head>
      <NavLayout
        maximized={maximized}
        handlerMenuClick={handlerMenuClick}
        selected={selected}
        handlerChangeSelected={handlerChangeSelected}
        title={selected === "feed" ? "Home" : selected === "search" ? "Search" : "Library"}
      >
        <Component {...pageProps} />
      </NavLayout>
    </ApolloProvider>
  );
}
export default MyApp;
