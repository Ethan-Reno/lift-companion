import { type ReactNode } from 'react';
import { NavMenu } from '.';
import Head from 'next/head';
import { roboto } from '../utils/font';
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
      <main className={`${roboto.variable} font-sans max-w-5xl mx-auto`}>
        <NavMenu />
        <div id="Content" className="p-6">
          {children}
        </div>
        {/* <Footer /> */}
      </main>
    </>
  )
}
