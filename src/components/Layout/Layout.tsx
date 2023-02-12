import { type ReactNode } from 'react';
import { NavMenu } from '..';
import Head from 'next/head';
import { roboto } from '../../utils/font';
// import Footer from './footer'

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Lift Companion</title>
      </Head>
      <main className={`${roboto.variable} font-sans`}>
        <NavMenu />
        {children}
        {/* <Footer /> */}
      </main>
    </>
  )
}

export default Layout;
