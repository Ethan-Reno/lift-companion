import { Html, Head, Main, NextScript } from "next/document";
import { roboto } from "../utils/font";

export default function Document() {
  return (
    <Html lang="en-US" className={`${roboto.variable} font-sans`}>
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
