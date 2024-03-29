import { type ReactNode } from 'react';
import { NavMenu } from '.';
import Head from 'next/head';
// import Footer from './footer'

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Lift Companion</title>
      </Head>
      <main className={`flex flex-col font-sans min-h-screen relative`}>
        <header className='sticky top-0 w-full border-b bg-background z-40'>
          <NavMenu />
        </header>
        <div id="Content" className="self-center px-4 py-8 w-full max-w-5xl">
          {children}
        </div>
        {/* <Footer /> */}
      </main>
    </>
  )
}
