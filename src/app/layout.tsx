import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { NavMenu } from "~/components";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Lift Companion",
  description: "An app to track and provide insights on weightlifting data",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <main className={`flex flex-col font-sans min-h-screen relative`}>
            <header className='sticky top-0 w-full border-b bg-background z-40'>
              {/* <NavMenu /> */}
              Test
            </header>
            <div id="Content" className="self-center px-4 py-8 w-full max-w-5xl">
              {children}
            </div>
            {/* <Footer /> */}
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
