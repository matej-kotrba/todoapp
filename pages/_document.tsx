import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="Create your own Todo list, with customizable parts."
        ></meta>
        <meta
          name="keywords"
          content="Todo, Todo List, Matěj Kotrba, matej kotrba, Matej Kotrba, customizable"
        ></meta>
        <meta property="og:title" content="Domania" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://my.website.com" />
        <meta property="og:image:url" content="./images/logo.png" />
        <meta property="og:description" content="Create your own Todo list !" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
