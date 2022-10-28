import "../styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "../components/Footer";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Domania</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0"
        ></meta>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/favicon.icov?v=2" />
        <link
          rel="icon"
          type="image/png"
          href="images/logo.png"
          sizes="50x50"
        />
        <link
          rel="apple-touch-icon"
          href="images/logo.png"
          sizes="50x50"
        ></link>
      </Head>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
