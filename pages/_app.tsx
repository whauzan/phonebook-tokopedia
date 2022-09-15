import { ApolloProvider } from "@apollo/client";
import { cache } from "@emotion/css";
import { CacheProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import client from "../apollo-client";
import { ContactContextProvider } from "../context/ContactContext";
import GlobalStyles from "../styles/GlobalStyles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <CacheProvider value={cache}>
        <ContactContextProvider>
          <GlobalStyles />
          <Component {...pageProps} />
        </ContactContextProvider>
      </CacheProvider>
    </ApolloProvider>
  );
}

export default MyApp;
