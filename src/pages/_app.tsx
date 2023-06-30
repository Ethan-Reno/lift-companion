import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { ThemeProvider } from 'next-themes';
import { api } from "../utils/api";
import { Layout } from "../components";
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from "../components/Toaster/Toaster";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import "../styles/globals.css";
import 'good-nice-ui/dist/index.css';

const ProtectedApp: React.FC<{ Component: any, pageProps: any }> = ({ Component, pageProps }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If the session status is 'unauthenticated', redirect to the homepage
    if (status === 'unauthenticated' && router.pathname !== '/') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') return (
    <div className="flex items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin" />
    </div>
  );

  return (
    <Component {...pageProps} />
  );
};

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <SessionProvider session={session}>
    <ThemeProvider attribute="class">
      <Layout>
        <Toaster />
        <ProtectedApp Component={Component} pageProps={pageProps} />
        <Analytics />
      </Layout>
    </ThemeProvider>
  </SessionProvider>
);

export default api.withTRPC(App);
