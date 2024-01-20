import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="author"
          content="Ethan Reno"
        />
        <meta
          name="description"
          content="An app to track and provide insights on weightlifting data"
        />
        <link rel="icon" href="/barbell.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
