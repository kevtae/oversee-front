// SETUP
import "../styles/globals.css";
import Head from "next/head";
import { MoralisProvider } from "react-moralis";

// UI
import NiceModal from "@ebay/nice-modal-react";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId="R9wDVOaQH3M3EH3KsbXULQQh17gC75Gj6CniOtRD"
      serverUrl="https://w30uvupwmhmt.usemoralis.com:2053/server"
    >
      <NiceModal.Provider>
        <Head>
          <title>Oversee Dashboard</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </NiceModal.Provider>
    </MoralisProvider>
  );
}

export default MyApp;