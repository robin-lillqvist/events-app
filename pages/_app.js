import Head from "next/head";

import Layout from "@/components/layout/layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head name="viewport" content="initial-scale=1.0, width=device-width">
        <title>NextJS Events</title>
        <meta name="description" content="description" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
